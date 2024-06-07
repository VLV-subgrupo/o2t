"use client"

import { useEffect, useState } from "react";

type Prop = {
    isPaused: boolean
}

const Timer = ({isPaused} : Prop) => {
    const [times, setTimes] = useState([-2, -1, 0, 1, 2, 3]);
    const [animationActive, setAnimationActive] = useState(false);
    const [colorChange, setColorChange] = useState(false);

    const colorTransition = (i: number) => {
        if (animationActive) {
            if (!colorChange){
                if ( i == 3 ) return 'animate-timer text-light'
                else return 'animate-timer text-gray'
            }
            return 'animate-timer text-gray'
        }
        if ( i == 2 ) return 'text-light'
        return 'text-gray'
    }

    useEffect(() => {
        if (!isPaused) {
            const anim = setInterval(() => {
                setAnimationActive((prevAnimationActive) => !prevAnimationActive);
                setColorChange(false)
            }, 30000);

            return () => {
                clearInterval(anim);
            }
        }
      }, [isPaused]);

      useEffect(() => {
        if(animationActive){
            setTimeout(() => {
                setColorChange(true)
            }, 29765);

            setTimeout(() => {
                setTimes(prevTimes => prevTimes.map(time => time + 1))
            }, 29980);
        }
      }, [animationActive]);

    return (
        <div className="flex flex-col gap-0 w-48 py-3">
            <h4 className="text-light ">Timer</h4>
            <div className="w-full h-full relative overflow-hidden">
                <div className="w-full h-full flex flex-col justify-evenly items-end z-40">
                    <div className="w-24 h-[2px] bg-gray"></div>
                    <div className="w-24 h-[2px] bg-gray"></div>
                    <div className="w-24 h-[2px] bg-red-400"></div>
                    <div className="w-24 h-[2px] bg-gray"></div>
                </div>
                <div className="h-full absolute z-10 top-0 right-12 flex flex-col items-end">
                    {times.map((time, index) => (
                        <div key={index} className={`flex-none h-1/5 flex flex-col justify-center transition-colors duration-300
                        ${colorTransition(index)}`}>
                            <h1  className={`font-mono`}>
                                {time >= 0 ? time : ""} <span className="ml-2 text-p">{time >= 0 ? "min" : ""}</span>
                            </h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>
     );
}

export default Timer;