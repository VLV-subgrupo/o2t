'use client'

import { useEffect, useState } from "react";
import Graph from "../components/graph";
import Historic from "../components/historic";
import Cookies from "js-cookie"
import { useRouter } from "next/navigation";
import { handleGetMetrics } from "@/app/_lib/handlers";

type Prop = {
    title : string,
    selected? : boolean
    onSelect? : () => void
    value : string
    t: number
}

const RadioButton = ({title, selected = false , onSelect, value, t} : Prop) =>{
    const unidades = ['kg', 'L', 'min', 'kcal']
    const goal = [75,4,450,2000]

    const diffPercent = ((parseInt(value) - goal[t]) / goal[t]) * 100;
    const formattedResult = diffPercent >= 0
        ? `+${diffPercent.toFixed(1)}%`
        : `${diffPercent.toFixed(1)}%`;

    return(
        <div onClick={onSelect} className={`p-4 flex-1 w-full flex flex-col border-[2px] rounded-lg select-none cursor-pointer transition-all duration-300 ${selected ? " border-lightgray text-light" : "border-darkgray text-lightgray"}`}>
            <div className="flex w-full flex-row justify-between items-center">
                <p className="font-semibold">
                    {title}
                </p>
                <p className={` transition-all duration-500 label px-2 rounded-sm  ${selected ? diffPercent >= 0 ? "bg-green-600 text-green-200" : "bg-red-600 text-red-200" : "text-lightgray bg-gray"}`}>
                    {formattedResult}
                </p>
            </div>
            <div className="flex-grow flex items-center justify-center px-12 gap-4">
                <h1 className=" flex flex-row items-end gap-2"> {value} <span className="text-p font-semibold mb-3">{unidades[t]}</span></h1>
            </div>
        </div>
    )
}

const Dashboard = () => {
    const [graphycType, setGraphycType] = useState(0)
    const types = ["Weight", "Hydration", "Sleep", "Calories Burned"]
    const [selectDate, setSelectDate] = useState(new Date())
    const [daymetrics, setDayMetrics] = useState<string[][]>([])
    const [iniVel, setIniVel] = useState<{ [key: string]: string; }>({ calories: '0000', hydration: '000', sleep: '0000', weight: '0000' })

    useEffect(()=>{
        const getTodayMetrics = async () =>{
            const today = new Date()
            const todayMN = new Date()
            todayMN.setHours(0, 0, 0, 0);
            const metrics = await handleGetMetrics(todayMN, today)
            setDayMetrics(metrics || [])
        }
        getTodayMetrics()
    }, [])

    useEffect(() => {
        const result = daymetrics.reduce((acc, entry) => {
            const key = entry[1].toLowerCase();
            acc[key] = entry[2]
            return acc;
          }, {} as { [key: string]: string });
        setIniVel(result);
    },[daymetrics])

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
                        <Graph t={graphycType} d={selectDate}/>
                    </div>
                </div>
                <div className="flex flex-col justify-between items-center gap-4 w-[23%] w-48">
                    <RadioButton title="Weight" selected={graphycType == 0} onSelect={() => setGraphycType(0)} value={iniVel.weight} t={0}></RadioButton>
                    <RadioButton title="Sleep" selected={graphycType == 2} onSelect={() => setGraphycType(2)} value={iniVel.sleep} t={2}></RadioButton>
                    <RadioButton title='Hydration' selected={graphycType == 1} onSelect={() => setGraphycType(1)} value={iniVel.hydration} t={1}></RadioButton>
                    <RadioButton title="Calories Burned" selected={graphycType == 3} onSelect={() => setGraphycType(3)} value={iniVel.calories} t={3}></RadioButton>
                </div>
            </div>

            <Historic selectDate={setSelectDate} />
        </div>
    );
}

export default Dashboard;
