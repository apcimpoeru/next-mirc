import { useState, useEffect } from "react";

import ChatUsername from "../chatRoom/chatUsername/chatUsername";
import ChatForm from "../chatRoom/chatForm/chatForm";
import ChatHistory from "../chatRoom/chatHistory/chatHistory";
import ChatRoomList from "../chatRoom/chatRoomList/chatRoomList";
import ChatUserList from "../chatRoom/chatUserList/chatUserList";

export default function Mirc(props){

    const [selectedIndex, setSelectedIndex] = useState('');
    const [selectedItem, setSelectedItem] = useState('');

    function selectRoom(e){
        let index = e.currentTarget.getAttribute('index');
        let name = e.currentTarget.getAttribute('name');
        setSelectedIndex(index);
        setSelectedItem(name);
    }

    return <div className={`chatWrapper w-[100%] h-[92vh]`}>

        <div className={`chatInner flex w-[100%] h-[92vh]`}>

            <div className="border-2 border-black chatRoomList flex w-[10%] overflow-y-auto">
                <ChatRoomList selectedIndex={selectedIndex} selectRoom={selectRoom}/>
            </div>

            <div className="p-4 chatInnerWrapper flex w-[80%] flex-col items-center justify-end">
                <ChatHistory room={selectedItem}/>
                <ChatForm room={selectedItem}/>
            </div>

            <div className="border-2 border-black chatUserList flex w-[10%]">
                <ChatUserList room={selectedItem}/>
            </div>

        </div>33333333333333333333a p

    </div>
}