import { useContext, useEffect } from "react";
import { SocketContext } from "../../../../lib/socketContext";

export default function ChatRoom(props) {
    

    const socket = useContext(SocketContext);

    useEffect(async () => {

        if (typeof socket.emit === 'function') {

            let data = {
                room: props.name,
                user: 'gigel2'
            }
            socket.emit('join_room', data);
        }
        
    }, [socket]);

    let room = props.room;

    return <>{room}</>
}