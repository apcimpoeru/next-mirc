import ChatRoom from "../components/componentLibrary/chat/chatRoom/chatRoom"
import Content from "../components/componentLibrary/content/content"; 
import Mirc from "../components/componentLibrary/chat/mirc/mirc";
import { SocketContext } from "../lib/socketContext";
import { useState, useEffect, useContext } from "react";

export default function Chat(){

    const socket = useContext(SocketContext);
    const [username, setUsername] = useState('');
    const [rooms, setRooms] = useState([]);

    const [usernameField, setUsernameField] = useState(<></>);
    
    useEffect(() => {

        if (username === '') {
            setUsernameField(<p>empty</p>);
        }
        
    }, [username]);

    
    return <div>

        <Content 
            headerHeight="min-h-[8vh]"
            contentHeight="min-h-[92vh]"
            title="Chat"
            centered={false}
        >

            <Mirc
                height="92vh"
                topHeight="4vh"
                bottomHeight="84vh"
            />

        </Content>
        
    </div>

}