import { cn } from "@/app/_lib/utils";
import { useState } from "react";

type Prop = {
    id             :string,
    name           :string,
    type          ?:string,
    className     ?:string,
    isRequired    ?:boolean,
    isDisabled    ?:boolean,
    initaialValue ?:string,
    hidden        ?:boolean,
    onValueChange ?:(value : string) => void
}

const Input = ({id, name, type = 'text', className, isRequired = true, isDisabled = false, initaialValue = '',hidden = false, onValueChange} : Prop) => {
    const [value, setValue] = useState(initaialValue);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        if (onValueChange) onValueChange(event.target.value)
    };

    return (
        <div className={`relative duration-200 ${hidden ? "hidden" : "" }`}>
            <input name={name} type={type} id={id} onChange={handleChange} value={value} className={cn("peer w-96 bg-darkgray outline-none px-4 pt-5 rounded-[8px] h-[60px] text-p font-medium focus:outline-lightgray focus:outline placeholder-light", className)} required={isRequired} disabled={isDisabled} />
            <label htmlFor={id} className={`top-0 left-0 pointer-events-none duration-300 absolute text-lightgray ml-4 transform translate-y-4 font-semibold peer-focus:translate-y-1 peer-focus:text-label peer-focus:text-lightgray ${value ? "translate-y-[4px] text-label text-lightgray" : 'text-p'}`}> {id} </label>
        </div>
    );
}

export default Input;
