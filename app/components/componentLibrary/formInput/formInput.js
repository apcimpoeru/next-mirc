export default function formInput(props) {
    
    return <>

        <label className={`form-label ${props?.labelClasses ?? ""}`} htmlFor={props?.name}>{props?.label}</label>
        <input 
            className={`input w-full ${props?.inputClasses ?? ""}`} 
            name={props?.name} 
            type={props?.type} 
            id={props?.name}
            defaultValue={props.defaultValue ?? ""}
            //value={props.value ?? ""}
            onChange={props.onChange}
            placeholder={props?.placeholder}
        />
        <p className="text-error">{props.error ?? ""}</p>
    </>
}