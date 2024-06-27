"use client"

import {Plus, Save, Trash2, X } from "lucide-react";
import ScrollableList from "../components/scrollableList";
import { DatePicker } from "../components/datePicker";
import AddLabel from "../components/addLabel";
import Cookies from "js-cookie"
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { handleCreateWorkout, handleGetAllUserLabels, handleGetIndexesOfLabels } from "@/app/_lib/handlers";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/_components/ui/tooltip";

const Log = () => {
    const [date, setDate] = useState<Date>()
    const [userTags, setUserTags] = useState<string[][]>([])
    const [workoutTags, setWorkoutTags] = useState<string[][]>([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        const getAllUserLabels = async () => {
            let labels = await handleGetAllUserLabels()
            setUserTags(labels || [])
        }
        getAllUserLabels()
    }, [])

    const submitWorkout = async () => {
        const userCookie = Cookies.get('user')
        if (userCookie) {
            const user = JSON.parse(userCookie)
            const registrationDate = date!
            const createdBy = user.id
            const labels = workoutTags.map(tag => parseInt(tag[2]))

            await handleCreateWorkout(registrationDate, title, description, createdBy, labels)
        } else {
            Cookies.remove('user')
            Cookies.remove('token')
            const router = useRouter()
            router.push('/')
        }
    }
    return (
        <div className="flex-1 overflow-y-auto relative">
            <div className="absolute left-28 bg-darkgray/60 backdrop-blur-sm w-[40%] h-[90%] flex flex-col p-6 justify-between gap-4 rounded-xl inset-0 my-auto">
                <div className="flex flex-row gap-8">
                    <div className="flex flex-row -gap-[4px]">
                        <TooltipProvider delayDuration={100}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div onClick={submitWorkout} className="size-[42px] rounded-full bg-gray cursor-pointer group -mr-1 border-[2px] border-darkgray grid place-items-center hover:bg-lightgray transition-colors duration-300">
                                        <Plus className="size-4 stroke-lightgray group-hover:stroke-darkgray"/>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="bottom" className="mt-2 bg-light text-darkgray p-2 border-none">
                                    <p className="label">New</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider delayDuration={100}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="size-[42px] rounded-full bg-gray cursor-pointer group -mr-1 border-[2px] border-darkgray grid place-items-center hover:bg-lightgray transition-colors duration-300">
                                        <Save className="size-4 stroke-lightgray group-hover:stroke-darkgray"/>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="bottom" className="mt-2 bg-light text-darkgray p-2 border-none">
                                            <p className="label">Save</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider delayDuration={100}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="size-[42px] rounded-full bg-gray cursor-pointer group -mr-1 border-[2px] border-darkgray grid place-items-center hover:bg-lightgray transition-colors duration-300">
                                        <Trash2 className="size-4 stroke-lightgray group-hover:stroke-darkgray"/>
                                    </div>
                                    </TooltipTrigger>
                                <TooltipContent side="bottom" className="mt-2 bg-light text-darkgray p-2 border-none">
                                            <p className="label">Delete</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <DatePicker date={date} setDate={setDate} className="w-full justify-start text-left font-semibold text-p bg-transparent"></DatePicker>
                </div>
                <input value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder="Workout Title" className="bg-transparent outline-none w-full text-h4 font-bold placeholder-lightgray px-4 uppercase"></input>
                <AddLabel userTags={userTags} setUserTags={setUserTags} workoutTags={workoutTags} setWorkoutTags={setWorkoutTags} />
                <textarea value={description} onChange={e => setDescription(e.target.value)} id="workoutDescription" placeholder="Workout Description" className="bg-transparent outline-none w-full h-full text-p font-bold placeholder-lightgray border border-gray rounded-lg p-4 resize-none"></textarea>
            </div>
            <ScrollableList />
        </div>
    );
}

export default Log;
