"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/app/_components/ui/popover";
import Tags from "./tags";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const AddLabel = () => {
    const [searchValue, setSearchValue] = useState('')
    const [userTags, setUserTags] = useState([
        ['abc', '#FFB3BA'],
        ['def', '#FFDFBA'],
        ['jhima', '#BAFFC9'],
        ['ghima', '#BAE1FF'],
        ['jakl', '#D4A5A5'],
        ['mano', '#A5D4D4'],
        ['pqr', '#D4A5BA'],
        ['stu', '#A5D4BA'],
        ['vwamx', '#D4D4A5']]
    );
    const [filteredTags, setFilteredTags] = useState(userTags);
    const [workoutTags, setWorkoutTags] = useState<string[][]>([]);

    const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const filterTags = () => {
        if (searchValue === '') {
            setFilteredTags(userTags.filter(tag => !workoutTags.includes(tag)))
        } else {
          const lowerCaseInput = searchValue.toLowerCase();
          const filtered = userTags.filter(tag => tag[0].toLowerCase().includes(lowerCaseInput));
          setFilteredTags(filtered);
        }
    };

    useEffect(() => {
        filterTags();
        if (searchValue === '') setColor(generatePastelColor());
    }, [searchValue]);

    const generatePastelColor = (): string => {
        const r = Math.floor((Math.random() * 127) + 127);
        const g = Math.floor((Math.random() * 127) + 127);
        const b = Math.floor((Math.random() * 127) + 127);

        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
    const [color, setColor] = useState(generatePastelColor());

    const addTag = () => {
        setUserTags([...userTags, [searchValue, color]]);
        addWorkoutTag([searchValue, color])
        setSearchValue('');
    };

    const removeTag = (tagToRemove: string) => {
        setUserTags(userTags.filter(tag => tag[0] !== tagToRemove));
        setFilteredTags(filteredTags.filter(tag => tag[0] !== tagToRemove));
    };

    const addWorkoutTag = (tagToAdd: string[]) => {
        const tagExists = workoutTags.some(([tag]) => tag === tagToAdd[0]);

        if (!tagExists){
            setWorkoutTags([...workoutTags, tagToAdd])
            setFilteredTags(filteredTags.filter(tag => tag[0] !== tagToAdd[0]))
        };
    }

    const removeWorkoutTag = (tagToRemove: string[]) => {
        setWorkoutTags(workoutTags.filter(tag => tag[0] !== tagToRemove[0]));
        setFilteredTags([...filteredTags, tagToRemove])
    };

    return (
        <Popover>
            <div className="flex flex-row gap-4 px-4 w-full flex-wrap">
                <PopoverTrigger asChild>
                    <button className="bg-gray px-4 rounded-full w-fit h-[24px] hover:bg-lightgray transition-colors duration-300 group">
                        <p className="label text-lightgray group-hover:text-darkgray">+ add label</p>
                    </button>
                </PopoverTrigger>
                {workoutTags.map((tag, index) => (
                    <Tags className="cursor-pointer" onClick={() => removeWorkoutTag(tag)} key={index} name={tag[0]} color={tag[1]}/>
                ))}
            </div>
            <PopoverContent className="bg-back/70 p-2 py-4 flex flex-col gap-1 border-none ml-32 mt-2 backdrop-blur-sm">
                <input type="text" placeholder="Search tag ..." className="w-full outline-none bg-transparent font-medium label placeholder-light px-2 border-b border-gray pb-3" autoFocus value={searchValue} onChange={inputChange}></input>
                <p className="label pl-3 text-lightgray select-none">select a tag or create a new one</p>
                <div className="max-h-44 overflow-y-scroll pb-4">
                    {filteredTags.length ?
                    ( filteredTags.map((tag, index) => (
                        <div key={index} className="flex flex-row justify-between items-center hover:bg-darkgray p-3 py-[6px] rounded-sm group transition-all duration-250 easy-smooth cursor-pointer" onClick={() => addWorkoutTag(tag)}>
                            <Tags name={tag[0]} color={tag[1]}/>
                            <Trash2 onClick={() => removeTag(tag[0])} className="size-4 opacity-0 group-hover:opacity-100 stroke-gray transition-color duration-300 hover:stroke-red-500"/>
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