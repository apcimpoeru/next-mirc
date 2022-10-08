import ChatRoom from "../components/componentLibrary/chat/chatRoom/chatRoom"
import Content from "../components/componentLibrary/content/content"; 
import Mirc from "../components/componentLibrary/chat/mirc/mirc";
import { SocketContext } from "../lib/socketContext";
import { useState, useEffect, useContext } from "react";
import ChatUsername from "../components/componentLibrary/chatUsername/chatUsername";

export default function Chat(){

    const socket = useContext(SocketContext);
    const [username, setUsername] = useState('');
    const [rooms, setRooms] = useState([]);

    const [content, setContent] = useState(<ChatUsername onSubmit={sendUsername} />);
    const [centered, setCentered] = useState(true);

    useEffect(() => {
            
            if (username) {
    
                setContent(<Mirc
                                height="92vh"
                                topHeight="4vh"
                                bottomHeight="84vh"
                            />);

                setCentered(false);

                console.log('username set');
                
                socket.emit('setUsername', username);
    
            }
    
    }, [username]);

    function sendUsername(e){
        e.preventDefault();
        let name = e.target.lastmori.value;
        setUsername(name);
    }

    
    return <div>

        <Content 
            headerHeight="min-h-[8vh]"
            contentHeight="min-h-[92vh]"
            title="Chat"
            centered={centered}
        >

            {content}

        </Content>
        
    </div>

}