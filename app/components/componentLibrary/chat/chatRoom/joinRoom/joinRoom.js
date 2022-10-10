import FormInput from "../../../formInput/formInput"
import { useContext, useEffect } from "react";
import { SocketContext } from "../../../../../lib/socketContext";

export default function JoinRoom(props){
    
    const socket = useContext(SocketContext);

    async function testSubmit(e){
        
        e.preventDefault();

        let name = e.target.room.value;
        socket.emit('joinRoom', name);
        
    }

    return <form onSubmit={testSubmit}>
            <div className="flex mx-auto w-[90%] my-4">
                <FormInput 
                    inputClasses=""
                    name="room" 
                    type="text" value='' error='' 
                    placeholder="Join room..."
                />
                <button onClick={null} className="button1">Join</button>
            </div>
        </form>
}