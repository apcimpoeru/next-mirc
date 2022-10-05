import FormTextArea from '../../../formInput/formTextarea'
import { useContext, useRef } from 'react';
import { SocketContext } from '../../../../../lib/socketContext';

export default function ChatForm(props){


    const socket = useContext(SocketContext);
    const formRef = useRef();

    function onKeyPress(e){

        if (e.code === "Enter" && !e.shiftKey) {

            e.preventDefault();
            let m = formRef.current.value;
            sendMessage(false);

        }
    }

    async function sendMessage(e){

        let message = formRef.current.value;
        let room = props.room;

        if (e){
            e.preventDefault();
        }

        let messageData = {room: room, message: message};

        if (message !== '') {
            socket.emit('sendMessage', messageData);
        }

        formRef.current.value = '';

    }

    return <form onSubmit={sendMessage} className={`ChatForm w-full flex`}>
        <FormTextArea 
            refProp={formRef}
            name="message" 
            onKeyPress={onKeyPress}
            onChange={props.onChange} 
            value={props.value} />
        <input type='hidden' name="room" value={props.room} />
        <button id="messageSendInput" onClick={null} className="button1">Send</button>
    </form>
}