import { useEffect, useState, useContext } from "react"
import ChatItem from '../chatItem/chatItem.js';
import JoinRoom from "../joinRoom/joinRoom.js";
import { SocketContext } from "../../../../../lib/socketContext";

export default function ChatRoomList(props){

    let socket = useContext(SocketContext);
    const [rooms, setRooms] = useState([]);
    const [roomsHTML, setRoomsHTML] = useState(<></>);
    
    // When you join a room, the server sends you a list of all the rooms
    useEffect(async () => {

        if (typeof socket.on === 'function') {

            socket.on('refreshRooms', (data) => {
                console.log(data);
                setRooms(data);
            });
            
        }
        
    }, [socket]);

    // When the rooms list changes (or user clicks on a room, changing the selected index), update the HTML
    useEffect(async () => {

        const listHTML = rooms.map((room, index) => {

            let selectedClass = '';
            if (props.selectedIndex == index) {
                selectedClass = 'bg-gray-200';
            }
            return <ChatItem className={selectedClass} onClick={props.selectRoom} name={room} index={index}/>

        });

        setRoomsHTML(listHTML);

    }, [rooms, props.selectedIndex]);

    // return HTML
    return <div className="text-center">

        <JoinRoom/>

        <p className="mb-2">Joined rooms</p>
        <ul className="text-left px-2">
            {roomsHTML}
        </ul>
    </div>
}