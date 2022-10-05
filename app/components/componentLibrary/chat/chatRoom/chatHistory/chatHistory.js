import { useEffect, useState, useContext, useRef } from "react"
import { SocketContext } from "../../../../../lib/socketContext";

export default function ChatHistory(props){

    const socket = useContext(SocketContext);
    const messageList = useRef({});
    const [room, setRoom] = useState('');
    const [messages, setMessages] = useState();
    const [messageHTML, setMessageHTML] = useState(<></>);

    // listens for new messages and updates the message list
    // the message list is a reference to the messages state variable
    useEffect(() => {

        if (typeof socket.on === 'function') {
            
            socket.on('getMessage', (data) => {
                
                let m = {...messageList.current};

                let newMessage = {
                    message: data.message,
                    user: data.user,
                    room: data.room,
                };

                if (m[data.room]) {
                    m[data.room].push(newMessage);
                } else {
                    m[data.room] = [newMessage];
                }

                messageList.current = m;

                setMessages(m);

            });

        }
    }, [socket]);

    // when the room changes or we receive new messages, update the message list
    useEffect(() => {

        if (messages) {

            if (typeof(messages[props.room]) !== 'undefined') {

                // create the message html from message list
                const html = messages[props.room].map((data, index) => {
                    return <p key={index}>{data.user} : {data.message}</p>
                });

                setMessageHTML(html);
            } else {
                setMessageHTML(<></>);
            }
        } else {
            setMessageHTML(<></>);
        }
        

    }, [messages, props.room]);
    
    
    // when the room changes, update the room state
    useEffect(() => {

        if (props.room) {
            setRoom(props.room);
        }

    }, [props.room]);

    return <div className={`chatHistory w-full`}>
        <p className="mb-8 text-center">{room}</p>
        <div className="text-left w-full">
            {messageHTML}
        </div>
    </div>
}