'use client'

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, TooltipProps} from "recharts";

const CustomTooltip = ({ active, payload, label } : TooltipProps<number,string>) => {
    if (active && payload && payload.length) {
        let show = false
        let ratio = 0
        if (payload[0]?.value && payload[1]?.value){
            ratio = +((payload[1].value - payload[0].value) / 100).toFixed(2)
            show = true
        }

        return (
            <div className="flex flex-row border border-gray bg-darkgray/50 backdrop-blur-sm p-2 rounded-lg w-48 justify-between items-center">
                <p className="label text-lightgray">weight</p>
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

const Graph = () => {
    const data = [
        {date: "06.06", value: 78, goal: 75},
        {date: "07.06", value: 81, goal: 75},
        {date: "08.06", value: null, goal: 75},
        {date: "09.06", value: 80, goal: 75},
        {date: "10.06", value: 63, goal: 75},
        {date: "11.06", value: 75, goal: 75},
        {date: "12.06", value: 78, goal: 75},
    ]

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} className=" select-none" margin={{top: 60}}>
                <XAxis dataKey="date" className="p font-semibold last:text-light" padding={{ left: 48, right: 48 }} strokeOpacity={0} tick={{stroke: 'red', strokeWidth: 2}}/>
                <YAxis padding={{bottom: 10 }} className="p font-semibold text-light" domain={[0, (dataMax : number) => Math.round(dataMax * 2 / 10) * 10 ]} strokeOpacity={0}>
                </YAxis>
                <Tooltip cursor={{ stroke: "#151515", strokeWidth: 100 }} animationEasing="ease-out" content={CustomTooltip} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="goal" stroke="#2A2A2A" dot={false} activeDot={false}  strokeWidth={2} strokeDasharray="8 6"/>
                <Line type="monotone" dataKey="value" dot={false} activeDot={{stroke: 'transparent', r: 6}} strokeWidth={3} stroke="#EDEDED"/>
            </LineChart>
        </ResponsiveContainer>
     );
}

export default Graph;