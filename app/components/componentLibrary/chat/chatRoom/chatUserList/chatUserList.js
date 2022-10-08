import { useEffect, useState, useRef } from "react"

export default function ChatUserList(props){

    const [userList, setUserList] = useState(props.userList);
    const [userListHTML, setUserListHTML] = useState([]);

    const userListRef = useRef({});

    function generateHTML(room){
        
        const html = userListRef.current[props.roomData.room].map((user, index) => {
            return <p className="w-full p-2 bg-[lightgrey] mb-1 cursor-pointer" key={index}>{user}</p>
        });

        setUserListHTML(html);
        
    }

    useEffect(() => {


        if (Object.keys(props.roomData).length > 0 && props.roomData.userList !== null) {


            let room = props.roomData.room;
            let userList = props.roomData.userList;

            if (props.roomData.joined == true) {
                userListRef.current[room] = userList;
            }

            generateHTML(room);

        } else if (Object.keys(props.roomData).length > 0 && props.roomData.userList == null) {
            
            generateHTML(props.roomData.room);

        }
        
        
    }, [props.roomData]);

    useEffect(() => {

        // when user joins, we add him to list
        if (typeof props.joinedRoom.user !== 'undefined') {
            userListRef.current[props.joinedRoom.room].push(props.joinedRoom.user);
            generateHTML(props.joinedRoom.room);
        }

    }, [props.joinedRoom]);

    useEffect(() => {

        // when user leaves, we remove them from the list
        if (typeof props.leftRoom.user !== 'undefined') {
            const index = userListRef.current[props.leftRoom.room].indexOf(props.leftRoom.user);
            if (index > -1) { 
                userListRef.current[props.leftRoom.room].splice(index, 1); 
              }
            generateHTML(props.joinedRoom.room);
        }
        
    }, [props.leftRoom]);

    // useEffect(() => {

    //     if (typeof props.leftRoom.user !== 'undefined') {
    //         console.log('------ left room', props.leftRoom);
    //         console.log('------ room', props.leftRoom.room);
    //     }

    // }, [props.leftRoom, props.roomData]);

    return <div className="w-full">
        {userListHTML}
    </div>
}