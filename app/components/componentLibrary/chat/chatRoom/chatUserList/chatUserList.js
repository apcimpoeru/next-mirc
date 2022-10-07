import { useEffect, useState, useRef } from "react"

export default function ChatUserList(props){

    const [userList, setUserList] = useState(props.userList);
    const [userListHTML, setUserListHTML] = useState([]);

    const userListRef = useRef({});

    useEffect(() => {

        console.log('--- User list changed');

        if (Object.keys(props.roomData).length > 0 && props.roomData.userList !== null) {

            console.log('------------ refresh list ------------');
            console.log(userListRef.current);

            let room = props.roomData.room;
            let userList = props.roomData.userList;

            if (props.roomData.joined == true) {
                userListRef.current[room] = userList;
            }

            const html = userListRef.current[room].map((user, index) => {
                return <p className="w-full p-2 bg-[lightgrey] mb-1 cursor-pointer" key={index}>{user}</p>
            });
            
            setUserListHTML(html);

        }
        
        
    }, [props.roomData]);

    useEffect(() => 
    {}, [userListHTML]);

    return <div className="w-full">
        {userListHTML}
    </div>
}