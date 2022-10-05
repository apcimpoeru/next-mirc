import { useEffect, useState, useContext } from "react"
import ChatItem from '../chatItem/chatItem.js';
import JoinRoom from "../joinRoom/joinRoom.js";
import { SocketContext } from "../../../../../lib/socketContext";

export default function ChatRoomList(props){

    // return HTML
    return <div className="text-center">

        <JoinRoom/>

        <p className="mb-2">Joined rooms</p>
        <ul className="text-left px-2">
            {props.roomList}
        </ul>
        
    </div>
}