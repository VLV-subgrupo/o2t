"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/app/_components/ui/popover";
import Tags from "./tags";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { handleAddLabel, handleDeleteLabel, handleGetAllUserLabels } from "@/app/_lib/handlers";

type Prop = {
    userTags: string[][],
    setUserTags: any,
    workoutTags: string[][],
    setWorkoutTags: any,
}

const AddLabel = ({userTags, setUserTags, workoutTags, setWorkoutTags}: Prop) => {
    const [searchValue, setSearchValue] = useState(' ')
    const [filteredTags, setFilteredTags] = useState(userTags);

    const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const filterTags = () => {
        if (searchValue === '') {
            setFilteredTags(userTags)
        } else {
          const lowerCaseInput = searchValue.toLowerCase();
          const filtered = userTags?.filter(tag => tag[0].toLowerCase().includes(lowerCaseInput));
          setFilteredTags(filtered.filter(tag => !workoutTags.includes(tag)));
        }
    };

    useEffect(() => {
        filterTags();
        if (searchValue === '') setColor(generatePastelColor());
    }, [searchValue]);

    useEffect(() => {
        const getAllUserLabels = async () => {
            let labels = await handleGetAllUserLabels()
            setUserTags(labels || [])
        }
        getAllUserLabels()
    })

    const generatePastelColor = (): string => {
        const r = Math.floor((Math.random() * 127) + 127);
        const g = Math.floor((Math.random() * 127) + 127);
        const b = Math.floor((Math.random() * 127) + 127);

        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
    const [color, setColor] = useState(generatePastelColor());

    const addTag = async () => {
        try {
            let id = await handleAddLabel(searchValue, color)
            addWorkoutTag([searchValue, color, id])
            setUserTags([...userTags, [searchValue, color, id]])
            setSearchValue('');
        } catch (error) {
            console.log("Error: ", error)
        }
    };

    const removeTag = async (tagToRemove: string) => {
        try {
            await handleDeleteLabel(tagToRemove)
            setUserTags(userTags.filter(tag => tag[2] !== tagToRemove))
            setWorkoutTags(workoutTags.filter(tag => tag[2] !== tagToRemove))
            setFilteredTags(filteredTags.filter(tag => tag[2] !== tagToRemove))
        } catch (error) {
            console.log("Not deletable")
        }
    };

    const addWorkoutTag = async (tagToAdd: string[]) => {
        const tagExists = workoutTags.some(([tag]) => tag === tagToAdd[0]);

        if (!tagExists){
            setWorkoutTags([...workoutTags, tagToAdd])
            setFilteredTags(filteredTags?.filter(tag => tag[0] !== tagToAdd[0]))
        };
    }

    const removeWorkoutTag = (tagToRemove: string) => {
        setWorkoutTags(workoutTags.filter(tag => tag[0] !== tagToRemove))
        filterTags()
    };

    return (
        <Popover>
            <div className="flex flex-row gap-4 px-4 w-full flex-wrap">
                <PopoverTrigger asChild>
                    <button onClick={() => setSearchValue('')} className="bg-gray px-4 rounded-full w-fit h-[24px] hover:bg-lightgray transition-colors duration-300 group">
                        <p className="label text-lightgray group-hover:text-darkgray">+ add label</p>
                    </button>
                </PopoverTrigger>
                {workoutTags.map((tag, index) => (
                    <Tags className="cursor-pointer" onClick={() => removeWorkoutTag(tag[0])} key={index} name={tag[0]} color={tag[1]}/>
                ))}
            </div>
            <PopoverContent className="bg-back/70 p-2 py-4 flex flex-col gap-1 border-none ml-32 mt-2 backdrop-blur-sm">
                <input type="text" placeholder="Search tag ..." className=" select-none w-full outline-none bg-transparent font-medium label placeholder-light px-2 border-b border-gray pb-3" autoFocus value={searchValue} onChange={inputChange}></input>
                <p className="label pl-3 text-lightgray select-none">select a tag or create a new one</p>
                <div className="max-h-44 overflow-y-scroll pb-4">
                    {filteredTags.length ?
                    ( filteredTags.map((tag, index) => (
                        <div key={index} className="flex flex-row justify-between items-center hover:bg-darkgray p-3 py-[6px] rounded-sm group transition-all duration-250 easy-smooth">
                            <Tags onClick={() => addWorkoutTag(tag)} name={tag[0]} color={tag[1]} className=" cursor-pointer"/>
                            <Trash2 onClick={() => removeTag(tag[2])}  className="size-4 opacity-0 group-hover:opacity-100 stroke-gray transition-color duration-300 hover:stroke-red-500 cursor-pointer"/>
                        </div>)
                    )) :
                    (<div className="flex flex-row gap-4 bg-darkgray hover:bg-gray/30 items-center p-3 py-[6px] rounded-sm cursor-pointer" onClick={() => addTag()}>
                        <p className="label text-lightgray">Create</p>
                        <Tags name={searchValue} color={color}/>
                    </div>)
                    }
                </div>
            </PopoverContent>
        </Popover>
     );
}

export default AddLabel;