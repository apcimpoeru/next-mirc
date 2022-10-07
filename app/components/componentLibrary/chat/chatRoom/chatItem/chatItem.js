import { useEffect, useState } from "react"

export default function ChatItem(props){

    return <div className={`cursor-pointer flex p-2 ${props.className}`} name={props.name} index={props.index} key={props.index}>
        
        <p attr-name={props.name} onClick={props.onClick} className="w-[90%]" key={props.index}>{props.name}</p>

        <button attr-name={props.name} onClick={props.leaveRoom}>×</button>

    </div>

}