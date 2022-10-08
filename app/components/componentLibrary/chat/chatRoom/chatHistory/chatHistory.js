import { useEffect, useState, useContext, useRef } from "react"
import { SocketContext } from "../../../../../lib/socketContext";

export default function ChatHistory(props){

    const socket = useContext(SocketContext);
    const messageList = useRef({});
    const [room, setRoom] = useState('');
    const [messages, setMessages] = useState();
    const [messageHTML, setMessageHTML] = useState(<></>);

    const roomRef = useRef(room);

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

        console.log(' !!!!!!!!!! MESSAGES');

        console.log('props.leftRoom', props.leftRoom);
        console.log('props.room', props.room)
        if (props.leftRoom.room == props.room){
            setRoom("YOU LEFT");
        }
        if (messages) {

            if (typeof(messages[props.room]) !== 'undefined') {

                // create the message html from message list
                const html = messages[props.room].map((data, index) => {
                    return <p key={index}>{data.user} : {data.message}</p>
                });
                setRoom(props.room);
                setMessageHTML(html);
            } else {
                setRoom(props.room);
                setMessageHTML(<></>);
            }
        } else {
            setRoom(props.room);
            setMessageHTML(<></>);
        }
    
    }, [messages, props.room, props.leftRoom]);
    

    return <div className={`chatHistory w-full`}>
        <p className="mb-8 text-center">{room}</p>
        <div className="text-left w-full">
            {messageHTML}
        </div>
    </div>
}