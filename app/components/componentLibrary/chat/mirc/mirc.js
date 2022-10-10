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

    const [currentRoom, setCurrentRoom] = useState('No rooms joined. Join a room to start chatting.');
    const [roomData, setRoomData] = useState({});
    const [notificationRoom, setNotificationRoom] = useState('');

    const [leftRoom, setLeftRoom] = useState('');
    const [joinedRoom, setJoinedRoom] = useState({});

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
        setCurrentRoom('You have left room: ' + name);
        setRoomData(roomData);

    }

    useEffect(async () => {

        if (typeof socket.on === 'function') {

            // when the user first joins a room
            socket.on('joinedRoom', (data) => {

                const roomData = {
                    room: data.room,
                    userList: data.userList,
                    joined: true,
                }

                currentRoomRef.current = data.room;

                setRoomData(roomData);
                setCurrentRoom(data.room);
 
            });

            // when a user receives a message, be it system or user
            socket.on('getMessage', (data) => {

                // system message - user left
                if (data.system == true && data.message == 'left'){
                    setLeftRoom({room: data.room, user: data.user});
                }

                // system message - user joined
                if (data.system == true && data.message == 'join'){
                    setJoinedRoom({room: data.room, user: data.user});
                }

                // if the message is not from the current room, add a notification
                if (data.room != currentRoomRef.current) {  
                    setNotificationRoom(data.room);
                }

            });


        }
        
    }, [socket]);    

    return <div className={`chatWrapper w-[100%] h-[92vh]`}>

        <div className={`chatInner flex w-[100%] h-[92vh]`}>

            <div className="border-2 border-black chatRoomList flex w-[10%] overflow-y-auto">

                <ChatRoomList 
                    leaveRoom={leaveRoom} 
                    leftRoom={leftRoom} 
                    joinedRoom={joinedRoom}
                    selectRoom={selectRoom} 
                    notificationRoom={notificationRoom} 
                    roomData={roomData
                }/>
                
            </div>

            <div className="p-4 chatInnerWrapper flex w-[80%] flex-col items-center justify-end">
                <ChatHistory leftRoom={leftRoom} room={currentRoom}/>
                <ChatForm room={currentRoom}/>
            </div>

            <div className="border-2 border-black chatUserList flex w-[10%]">
                <ChatUserList leftRoom={leftRoom} joinedRoom={joinedRoom} roomData={roomData}/>
            </div>

        </div>

    </div>
}