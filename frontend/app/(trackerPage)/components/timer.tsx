"use client"

import { set } from "date-fns";
import { useEffect, useState } from "react";

type Prop = {
    isPaused: boolean
    initialTime?: number
    seconds?: number
}

const Timer = ({isPaused, initialTime = 0, seconds = 0} : Prop) => {
    const [times, setTimes] = useState([initialTime - 2, initialTime - 1, initialTime, initialTime + 1, initialTime + 2, initialTime + 3]);
    const [secondsCounter, setSecondsCounter] = useState(seconds);
    const [animationActive, setAnimationActive] = useState(false);
    const [colorChange, setColorChange] = useState("text-light")

    useEffect(() => {
        if (!isPaused) {
            const tick = setInterval(() => {
                setSecondsCounter(prevSec => prevSec + 1);
            }, 1000);

            return () => clearInterval(tick);
        }
      }, [isPaused]);

    useEffect(() => {
        if(animationActive){
            setColorChange("text-gray")
            setTimeout(() => {
                setTimes(prevTimes => prevTimes.map(time => time + 1))
                setColorChange("text-light")
            }, 746)
        }
    }, [animationActive]);

    useEffect(() => {
        if (!(secondsCounter % 30)){
            setAnimationActive((prevAnimationActive) => !prevAnimationActive);
        }
        if (secondsCounter >= 60) {
            setSecondsCounter(1);
        }
    }, [secondsCounter]);

    return (
        <div className="flex flex-col gap-0 w-48 py-3">
            <h5 className="text-light text-end mr-8">Timer</h5>
            <div className="w-full h-full relative overflow-hidden">
                <div className="w-full h-full flex flex-col justify-evenly items-end z-40">
                    <div className="w-24 h-[2px] bg-gray"></div>
                    <div className="w-24 h-[2px] bg-gray"></div>
                    <div className="w-24 h-[2px] bg-red-400"></div>
                    <div className="w-24 h-[2px] bg-gray"></div>
                </div>
                <div className={`h-full absolute z-10 top-0 right-12 flex flex-col items-end ${animationActive ? "animate-timer" : ""}`}>
                    {times.map((time, index) => (
                        <div key={index} className={`flex-none h-1/5 flex flex-col justify-center`}>
                            <h1  className={`font-mono transition-colors duration-700 ease-smooth ${index == 2 ? colorChange : "text-gray"}`}>
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