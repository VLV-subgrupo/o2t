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
    const [graphycType, setGraphycType] = useState(0)
    const types = ["Weight", "Hydration", "Sleep", "Calories Burned"]
    const [selectDate, setSelectDate] = useState(new Date())

    return (
        <div className="flex-1 flex flex-col gap-4">
            <div className="flex-grow w-full flex flex-row px-4 gap-4">
                <div className=" flex flex-col w-full p-4 select-none outline-3 outline outline-transparent hover:outline-gray rounded-lg transition-all duration-300 relative">
                    <div className="w-full flex flex-row items-center justify-center gap-4 text-light">
                        <h2 className="">{types[graphycType]}</h2>
                        <p className="label bg-gray h-fit py-1 px-3 rounded-md mt-1">
                            {new Date(selectDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                    </div>
                    <div className="w-full h-full relative">
                        <div className="absolute inset-0 mx-auto top-2 flex flex-row w-fit h-fit gap-4 justify-center items-center">
                            <h6 className="text-lightgray flex items-center gap-4">Goal <span className="text-h4 font-bold text-light">120 <span className="text-p font-semibold">min</span></span></h6>
                            <div className="h-7 w-[2px] bg-gray"></div>
                            <h6 className="text-lightgray flex items-center gap-4">Average <span className="text-h4 font-bold text-light">120 <span className="text-p font-semibold">min</span></span></h6>
                        </div>
                        <Graph t={graphycType} d={selectDate}/>
                    </div>
                </div>
                <div className="flex flex-col justify-between items-center gap-4">
                    <RadioButton title="Weight" selected={graphycType == 0} onSelect={() => setGraphycType(0)}></RadioButton>
                    <RadioButton title="Sleep" selected={graphycType == 2} onSelect={() => setGraphycType(2)}></RadioButton>
                    <RadioButton title='Hydration' selected={graphycType == 1} onSelect={() => setGraphycType(1)}></RadioButton>
                    <RadioButton title="Calories Burned" selected={graphycType == 3} onSelect={() => setGraphycType(3)}></RadioButton>
                </div>
            </div>

            <Historic selectDate={setSelectDate} />
        </div>
    );
}

export default Dashboard;
