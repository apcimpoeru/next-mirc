import { useState, useEffect, useContext, useRef } from "react";
import { SocketContext } from "../../../../lib/socketContext";
import ChatUsername from "../chatRoom/chatUsername/chatUsername";
import ChatForm from "../chatRoom/chatForm/chatForm";
import ChatHistory from "../chatRoom/chatHistory/chatHistory";
import ChatRoomList from "../chatRoom/chatRoomList/chatRoomList";
import ChatUserList from "../chatRoom/chatUserList/chatUserList";
import ChatItem from "../chatRoom/chatItem/chatItem";

export default function Mirc(props){

    const [selectedIndex, setSelectedIndex] = useState('');
    const [selectedItem, setSelectedItem] = useState('');
    const [chatList, setChatList] = useState([]);
    const [roomList, setRoomList] = useState([]);

    const roomRef = useRef({});
    const selectedRef = useRef();

    const socket = useContext(SocketContext);

    function selectRoom(e){

        let name = e.currentTarget.getAttribute('name');
        setSelectedItem(name);
        selectedRef.current = name;
        sendRoomList(false, name, false);

    }

    function sendRoomList(rooms = false, selected = false, notification = false){

        let regenertateRooms = false;
        
        // if we have a list of rooms, update the room list ref
        // else, grab what we have in the room list ref.
        // We regenerate rooms.
        if (rooms) {
            regenertateRooms = true;
            roomRef.current = rooms;
        } else {
            rooms = roomRef.current;
        }

        // if we have a selected room, update the selected room ref,
        // we mark it as selected, and deselect the other ones.
        // Regenerate room list if we have a selected room.
        if (selected) {

            for (const room of Object.keys(rooms)) {

                let roomName = rooms[room][0].name;

                let roomNameFormatted = roomName.replace(/\s+/g, "");
                let selectedFormatted = selected.replace(/\s+/g, "");

                if (roomNameFormatted == selectedFormatted) {

                    rooms[room][0].selected = true;
                    rooms[room][0].notification = false;

                } else {
                    rooms[room][0].selected = false;

                }

            }

            regenertateRooms = true;

        } else {
            selected = selectedRef.current;
        }

        // check if we have a new notification. If yes, we regenerate the room list, adding the notification.
        if (selected !== notification) {
            if (rooms[notification]) {
                if ( rooms[notification][0].notification == false ) {

                    rooms[notification][0].notification = true;
                    regenertateRooms = true;

                }

            }
        }

        // we check if we have to regenerate the room list.
        // if yes, we create the HTML and update the room list state variable.
        if (regenertateRooms) {

            roomRef.current = rooms;

            const listHTML = Object.keys(rooms).map((room, index) => {

                let selected = rooms[room][0].selected;
                let notification = rooms[room][0].notification;
                let className = '';

                if (selected) {
                    className = 'bg-gray-300';
                } else if (notification) {
                    className = 'font-bold bg-gray-100';
                }

                return <ChatItem className={className} onClick={selectRoom} name={room} index={index}/>

            });

            setRoomList(listHTML);
        }

    }

    function sendChatList(data){

        // in case the chat list contains notifications
        sendRoomList(false, false, data.room);

    }

    useEffect(async () => {

        if (typeof socket.on === 'function') {

            // on refresh rooms, we create the room list ref (or update it if it already exists)
            socket.on('refreshRooms', (data) => {

                let roomObj = {};
                for (const room of data){
                    
                    let notification = false;
                    let selected = false;

                    if (roomRef.current[room]) {
                        notification = roomRef.current[room][0].notification;
                        selected = roomRef.current[room][0].selected;
                    }

                    let n = {name:room, notification:notification, selected: selected}
                    if (roomObj[room]){
                        roomObj[room].push(n);
                    } else {
                        roomObj[room] = [n];
                    }

                }

                sendRoomList(roomObj, false, false);

            });

            socket.on('getMessage', (data) => {
                sendChatList(data);
            });
            
        }
        
    }, [socket]);    

    return <div className={`chatWrapper w-[100%] h-[92vh]`}>

        <div className={`chatInner flex w-[100%] h-[92vh]`}>

            <div className="border-2 border-black chatRoomList flex w-[10%] overflow-y-auto">
                <ChatRoomList roomList={roomList}/>
            </div>

            <div className="p-4 chatInnerWrapper flex w-[80%] flex-col items-center justify-end">
                <ChatHistory room={selectedItem}/>
                <ChatForm room={selectedItem}/>
            </div>

            <div className="border-2 border-black chatUserList flex w-[10%]">
                <ChatUserList room={selectedItem}/>
            </div>

        </div>

    </div>
}