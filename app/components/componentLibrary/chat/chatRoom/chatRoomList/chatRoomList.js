import { useEffect, useState, useContext, useRef } from "react"
import ChatItem from '../chatItem/chatItem.js';
import JoinRoom from "../joinRoom/joinRoom.js";
import { SocketContext } from "../../../../../lib/socketContext";

export default function ChatRoomList(props){

    const [roomList, setRoomList] = useState([]);
    const roomListRef = useRef({});

    function test(){
        alert('test2');
    }

    function generateHTML(){

        console.log('Generating room list html');
        let html;

        if (Object.keys(roomListRef.current).length > 0) {

            html = Object.keys(roomListRef.current).map((room, index) => {

                let notification = roomListRef.current[room].notification;
                let selected = roomListRef.current[room].selected;

                let className;

                if (notification > 0) {
                    className = 'bg-red-500';
                } else {
                    className = '';
                }

                if (selected > 0) {
                    className = 'bg-green-500';
                }
                

                return <ChatItem leaveRoom={props.leaveRoom} className={className} name={room} key={index} onClick={props.selectRoom}/>

            });

        }

        setRoomList(html);
        return html;
        
    }

    useEffect(() => {


        if (typeof props.roomData.room !== 'undefined') {

            let room = props.roomData.room;
            let joined = props.roomData.joined;

            console.log('Joined room componenet', props.roomData);

            if (joined == true) {

                if (room !== undefined && room != '') {
                    roomListRef.current[room] = {notification:0, selected:1};
                }

                if (Object.keys(roomListRef.current).length > 0) {
                    for (let key in roomListRef.current) {
                        if (key !== room) {
                            roomListRef.current[key].selected = 0;
                        } else {
                            roomListRef.current[key].selected = 1;
                        }
                    }
                }

            } else if (joined == false) {

                if (room !== undefined && room != '') {

                    let m = {...roomListRef.current};
                    delete m[room];
                    roomListRef.current = m;

                }

            }

            generateHTML();

        }
    }, [props.roomData]);

    useEffect(() => {

        if (props.notificationRoom !== undefined && props.notificationRoom != '') {
            if (typeof(roomListRef.current[props.notificationRoom]) !== 'undefined') {
                roomListRef.current[props.notificationRoom] = {notification:1};
            }
        }
        generateHTML();

    }, [props.notificationRoom]);

    // return HTML
    return <div className="text-center">

        <JoinRoom/>

        <p className="mb-2">Joined rooms</p>
        <ul className="text-left px-2">
            {roomList}
        </ul>

    </div>
}