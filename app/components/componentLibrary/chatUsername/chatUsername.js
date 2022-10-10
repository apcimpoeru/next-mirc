import FormInput from "../formInput/formInput";

export default function ChatUsername(props){

    return <form onSubmit={props.onSubmit}>
            <p>Please select a username to chat.</p>
            <div className="mx-auto w-[90%] my-4">
                <FormInput 
                    inputClasses=""
                    name="lastmori" 
                    type="text" value='' error='' 
                    placeholder="Set Username..."
                />
                <button onClick={null} className="button1 w-full">Join</button>
            </div>
        </form>
}