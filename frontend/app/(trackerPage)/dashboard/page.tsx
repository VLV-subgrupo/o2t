'use client'

import { useState } from "react";
import Graph from "../components/graph";
import Historic from "../components/historic";
import Cookies from "js-cookie"
import { useRouter } from "next/navigation";

type Prop = {
    title : string,
    selected? : boolean
    onSelect? : () => void
}

const RadioButton = ({title, selected = false , onSelect} : Prop) =>{
    return(
        <div onClick={onSelect} className={`p-4 flex-1 h-32 flex flex-col border-[2px] rounded-lg select-none cursor-pointer transition-all duration-300 ${selected ? " border-lightgray text-light" : "border-darkgray text-lightgray"}`}>
            <div className="flex w-full flex-row justify-between items-center">
                <p className="font-semibold">
                    {title}
                </p>
                <p className={` transition-all duration-500 label px-2 rounded-sm  ${selected ? "bg-green-600 text-green-200" : "text-lightgray bg-gray"}`}>
                    + 0.03%
                </p>
            </div>
            <div className="flex-grow flex items-center justify-center px-12 gap-4">
                <h1 className=" flex flex-row items-end gap-2"> 120 <span className="text-p font-semibold mb-3">min</span></h1>
            </div>
        </div>
    )
}

const Dashboard = () => {
    const [graphycType, setGraphycType] = useState('Weight')
    const [timeGap, setTimeGap] = useState('M')

    return (
        <div className="flex-1 flex flex-col gap-4">
            <div className="flex-grow w-full flex flex-row px-4 gap-4">
                <div className=" flex flex-col w-full p-4 select-none outline-3 outline outline-transparent hover:outline-gray rounded-lg transition-all duration-300 relative">
                    <div className="w-full flex flex-row items-center justify-between px-4">
                        <div className="flex flex-row items-center gap-4 text-light">
                            <h3 className="">Weight</h3>
                            <p className="label bg-gray h-fit py-1 px-3 rounded-md">
                                23 apr, 2024
                            </p>
                        </div>
                        <div className="flex flex-row items-center gap-4 px-3 text-lightgray">
                            <p onClick={() => setTimeGap('W')} className={`size-9 transition-all duration-300 hover:text-light grid place-items-center rounded-sm font-semibold cursor-pointer ${timeGap == 'W' ? "bg-gray text-light" : ""}`}>1 W</p>
                            <p onClick={() => setTimeGap('M')} className={`size-9 transition-all duration-300 hover:text-light grid place-items-center rounded-sm font-semibold cursor-pointer ${timeGap == 'M' ? "bg-gray text-light" : ""}`}>1 M</p>
                            <p onClick={() => setTimeGap('Y')} className={`size-9 transition-all duration-300 hover:text-light grid place-items-center rounded-sm font-semibold cursor-pointer ${timeGap == 'Y' ? "bg-gray text-light" : ""}`}>1 Y</p>
                        </div>
                    </div>
                    <div className="w-full h-full relative">
                        <div className="absolute inset-0 mx-auto flex flex-row w-fit h-fit gap-4 justify-center items-center">
                            <h6 className="text-lightgray flex items-center gap-4">Goal <span className="text-h3 font-bold text-light">120 <span className="text-p font-semibold">min</span></span></h6>
                            <div className="h-7 w-[2px] bg-gray"></div>
                            <h6 className="text-lightgray flex items-center gap-4">Average <span className="text-h3 font-bold text-light">120 <span className="text-p font-semibold">min</span></span></h6>
                        </div>
                        <Graph />
                    </div>
                </div>
                <div className="flex flex-col justify-between items-center gap-4">
                    <RadioButton title="Weight" selected={graphycType == 'Weight'} onSelect={() => setGraphycType('Weight')}></RadioButton>
                    <RadioButton title="Sleep" selected={graphycType == 'Sleep'} onSelect={() => setGraphycType('Sleep')}></RadioButton>
                    <RadioButton title='Hydration' selected={graphycType == 'Hydration'} onSelect={() => setGraphycType('Hydration')}></RadioButton>
                    <RadioButton title="Calories Burned" selected={graphycType == "Calories Burned"} onSelect={() => setGraphycType("Calories Burned")}></RadioButton>
                </div>
            </div>

            <Historic />
        </div>
    );
}

export default Dashboard;
