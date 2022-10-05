export default function Username(props){
    return <div>
        <input type="text" placeholder="Username" onChange={props.onChange} value={props.value}/>
    </div>
}