import { useEffect, useState } from "react"

export default function ChatItem(props){

    return <div className={`cursor-pointer ${props.className}`} name={props.name} onClick={props.onClick} index={props.index} key={props.index}>
        <p key={props.index}>{props.name}</p>
    </div>

}