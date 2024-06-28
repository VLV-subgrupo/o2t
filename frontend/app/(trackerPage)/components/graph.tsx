'use client'

import { handleGetMetrics } from "@/app/_lib/handlers";
import { useEffect, useState } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, TooltipProps} from "recharts";

interface CustomTooltipProps extends TooltipProps<number, string> {
    type: number;
}

const CustomTooltip = ({ active, payload, label, type} : CustomTooltipProps) => {
    if (active && payload && payload.length) {
        let show = false
        let ratio = 0
        if (payload[0]?.value && payload[1]?.value){
            ratio = +((payload[1].value - payload[0].value) / 100).toFixed(2)
            show = true
        }

        const types = ["Weight", "Hydration", "Sleep", "Calories Burned"]
        return (
            <div className="flex flex-row border border-gray bg-darkgray/50 backdrop-blur-sm p-2 rounded-lg w-fit gap-4 justify-between items-center">
                <p className="label text-lightgray">{types[type]}</p>
                <div className="flex flex-row items-center gap-1">
                    {!show ? (
                        <p className="text-light ml-2 label px-2 rounded-sm bg-gray">
                            not registered
                        </p>
                    ) : (
                        <>
                            <p className="text-light">
                                {` ${payload[1].value}`}
                            </p>
                            <p className={`ml-2 label px-2 rounded-sm ${ratio >= 0 ? "bg-green-600 text-green-200" : "bg-red-600 text-red-200"}`}>
                                {` ${ratio >= 0 ? `+${ratio} %` : `${ratio} %`}`}
                            </p>
                        </>
                    )}
                </div>
            </div>
        );
    }

    return null;
}

type Props = {
    t:number
    d:Date
}

const Graph = ({t, d} : Props) => {
    const data = [
        {date: "06.06", value: 78, goal: 75},
        {date: "07.06", value: 81, goal: 75},
        {date: "08.06", value: null, goal: 75},
        {date: "09.06", value: 80, goal: 75},
        {date: "10.06", value: 63, goal: 75},
        {date: "11.06", value: 75, goal: 75},
        {date: "12.06", value: 78, goal: 75},
    ]
    const [points, setPoints] = useState<{ date: string; value: number | null; goal: number }[]>([])

    const getDatesOfWeek = (d:Date): Date[] => {
        d.setHours(23, 59, 59);
        const dates = [];
        for (let i = 0; i <= 7; i++) {
            const date = new Date(d);
            date.setDate(d.getDate() - i);
            dates.push(date);
        }
        return dates.reverse()
    };

    const getPoints = async (t : number, d:Date) => {
        const goals = [75,4,450,2000]
        const week = getDatesOfWeek(d)
        const importData: { date: string; value: number | null; goal: number}[] = []
        const data = await handleGetMetrics(week[0], week[week.length-1], t)
        week.forEach(async (e,i) => {
            if (i){
                const dia = ('0' + new Date(e).getDate()).slice(-2);
                const mes = ('0' + (new Date(e).getMonth() + 1)).slice(-2);
                if(data?.length && new Date(data[0][0]) < e){
                    importData.push({date:dia + '.' + mes, value: parseInt(data[0][2]), goal: goals[t]})
                    data.shift()
                } else {
                    importData.push({date:dia + '.' + mes, value: null, goal: goals[t]})
                }
            }
        })
        setPoints(importData)
    }

    useEffect(()=>{
        getPoints(t, d)
    },[t, d])

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={points} className=" select-none" margin={{top: 60}}>
                <XAxis dataKey="date" className="p font-semibold last:text-light" padding={{ left: 48, right: 48 }} strokeOpacity={0}/>
                <YAxis padding={{bottom: 10 }} className="p font-semibold text-light" domain={[0, 'auto']} strokeOpacity={0}>
                </YAxis>
                <Tooltip cursor={{ stroke: "#151515", strokeWidth: 100 }} animationEasing="ease-out" content={<CustomTooltip type={t}/>} />
                <Tooltip content={<CustomTooltip type={t}/>} />
                <Line type="monotone" dataKey="goal" stroke="#2A2A2A" dot={false} activeDot={false}  strokeWidth={2} strokeDasharray="8 6"/>
                <Line type="monotone" dataKey="value" dot={true} activeDot={{strokeWidth:4, fill:"#717171", r: 6}} r={4} strokeWidth={3} fill="#EDEDED" stroke='#EDEDED'/>
            </LineChart>
        </ResponsiveContainer>
     );
}

export default Graph;