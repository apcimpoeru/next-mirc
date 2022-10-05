import { useState } from "react"

export default function formTextarea(props){

    const [rounded, setRounded] = useState(true);

    return(
        <>
            <label className={`form-label block mb-2 ${props?.labelClasses ?? ""}`} htmlFor={props?.name}>{props?.label}</label>
            <textarea
                id={props?.id}
                ref={props?.refProp}
                onKeyPress={props?.onKeyPress}
                className={`rounded-none input w-full ${props?.inputClasses ?? ""}`}
                name={props?.name}
            />
            <p className="text-error">{props.error ?? ""}</p>
        </>
    )
}