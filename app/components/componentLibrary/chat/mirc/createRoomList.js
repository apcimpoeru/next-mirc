export default function createRoomList(roomRef, selectedRef, rooms = false, selected = false, notification = false){

    let regenertateRooms = false;
    
    // if we have a list of rooms, update the room list ref
    // else, grab what we have in the room list ref.
    // We regenerate rooms.
    if (rooms) {
        regenertateRooms = true;
        roomRef.current = rooms;
    } else {
        rooms = roomRef.current;
    }

    // if we have a selected room, update the selected room ref,
    // we mark it as selected, and deselect the other ones.
    // Regenerate room list if we have a selected room.
    if (selected) {

        for (const room of Object.keys(rooms)) {

            let roomName = rooms[room][0].name;

            let roomNameFormatted = roomName.replace(/\s+/g, "");
            let selectedFormatted = selected.replace(/\s+/g, "");

            if (roomNameFormatted == selectedFormatted) {

                rooms[room][0].selected = true;
                rooms[room][0].notification = false;

            } else {
                rooms[room][0].selected = false;

            }

        }

        regenertateRooms = true;

    } else {
        selected = selectedRef.current;
    }

    // check if we have a new notification. If yes, we regenerate the room list, adding the notification.
    if (selected !== notification) {
        if (rooms[notification]) {
            if ( rooms[notification][0].notification == false ) {

                rooms[notification][0].notification = true;
                regenertateRooms = true;

            }

        }
    }

    // we check if we have to regenerate the room list.
    // if yes, we create the HTML and update the room list state variable.
    if (regenertateRooms) {

        roomRef.current = rooms;

        const listHTML = Object.keys(rooms).map((room, index) => {

            let selected = rooms[room][0].selected;
            let notification = rooms[room][0].notification;
            let className = '';

            if (selected) {
                className = 'bg-gray-300';
            } else if (notification) {
                className = 'font-bold bg-gray-100';
            }

            return <ChatItem className={className} onClick={selectRoom} name={room} index={index}/>

        });

        // setRoomList(listHTML);
        return listHTML;
    }

}