import { useState, useEffect, useContext, useRef } from "react";
import { SocketContext } from "../../../../lib/socketContext";
import ChatUsername from "../chatRoom/chatUsername/chatUsername";
import ChatForm from "../chatRoom/chatForm/chatForm";
import ChatHistory from "../chatRoom/chatHistory/chatHistory";
import ChatRoomList from "../chatRoom/chatRoomList/chatRoomList";
import ChatUserList from "../chatRoom/chatUserList/chatUserList";
import ChatItem from "../chatRoom/chatItem/chatItem";

export default function Mirc(props){

    const socket = useContext(SocketContext);

    const [currentRoom, setCurrentRoom] = useState('main');
    const [roomData, setRoomData] = useState({});
    const [notificationRoom, setNotificationRoom] = useState('');

    const [userList, setUserList] = useState({});
    const [messageData, setMessageData] = useState({});

    const [leftRoom, setLeftRoom] = useState('');

    const currentRoomRef = useRef(currentRoom);

    function selectRoom(e){
        let name = e.currentTarget.getAttribute('attr-name');
        setCurrentRoom(name);
        currentRoomRef.current = name;
        setRoomData({room: name, userList: null, joined: true});
    }

    function leaveRoom(e){

        let name = e.currentTarget.getAttribute('attr-name');
        
        const roomData = {
            room: name,
            userList: null,
            joined: false,
        }

        socket.emit('leftRoom', roomData);
        setCurrentRoom('left');
        setRoomData(roomData);
        console.log(' ---------- emitting left room', roomData);
    }

    useEffect(async () => {

        if (typeof socket.on === 'function') {


            socket.on('joinedRoom', (data) => {

                console.log('received');

                const roomData = {
                    room: data.room,
                    userList: data.userList,
                    joined: true,
                }

                currentRoomRef.current = data.room;

                setRoomData(roomData);
                setCurrentRoom(data.room);
 
            });

            socket.on('getMessage', (data) => {

                const messageData = {
                    message: data.message,
                    messageRoom: data.room,
                    messageUser: data.user,
                }

                console.log('received message', data);

                if (data.system == true && data.message == 'user left room'){
                    console.log('a user left the room ' + data.room);
                    setLeftRoom(data.user);
                }

                setMessageData(data);

                if (data.room != currentRoomRef.current) {  
                    setNotificationRoom(data.room);
                }

            });

        }
        
    }, [socket]);    

    return <div className={`chatWrapper w-[100%] h-[92vh]`}>

        <div className={`chatInner flex w-[100%] h-[92vh]`}>

            <div className="border-2 border-black chatRoomList flex w-[10%] overflow-y-auto">
                <ChatRoomList leaveRoom={leaveRoom} leftRoom={leftRoom} selectRoom={selectRoom} notificationRoom={notificationRoom} roomData={roomData}/>
            </div>

            <div className="p-4 chatInnerWrapper flex w-[80%] flex-col items-center justify-end">
                <ChatHistory room={currentRoom}/>
                <ChatForm room={currentRoom}/>
            </div>

            <div className="border-2 border-black chatUserList flex w-[10%]">
                <ChatUserList roomData={roomData}/>
            </div>

        </div>

    </div>
}