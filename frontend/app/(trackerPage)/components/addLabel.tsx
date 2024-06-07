"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/app/_components/ui/popover";
import Tags from "./tags";
import { Trash2 } from "lucide-react";
import { useState } from "react";

const AddLabel = () => {
    const [inputValue, setInputValue] = useState('')

    const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className="bg-gray px-4 rounded-full w-fit ml-4 h-[24px]">
                    <p className="label text-lightgray hover:text-light">+ add label</p>
                </button>
            </PopoverTrigger>
            <PopoverContent className="bg-back/95 p-2 py-4 flex flex-col gap-1 border-none ml-32 mt-2">
                <input type="text" placeholder="Search tag..." className="w-full outline-none bg-transparent font-medium label placeholder-light px-2 border-b border-gray pb-3" autoFocus onChange={inputChange}></input>
                <p className="label text-center text-lightgray select-none">select a tag or create a new one</p>
                <div className="flex flex-row justify-between items-center hover:bg-darkgray p-3 py-[6px] rounded-sm group transition-all duration-250 easy-smooth cursor-pointer">
                    <Tags className="bg-blue-500"/>
                    <Trash2 className="size-4 opacity-0 group-hover:opacity-100 stroke-gray hover:stroke-red-400"/>
                </div>
                <div className="flex flex-row gap-4 bg-darkgray items-center p-3 py-[6px] rounded-sm cursor-pointer">
                    <p className="label text-lightgray">Create</p>
                    <Tags tag={inputValue} />
                </div>
            </PopoverContent>
        </Popover>
     );
}

export default AddLabel;