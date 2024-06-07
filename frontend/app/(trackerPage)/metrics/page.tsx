"use client"

import CustomButton from "@/app/_components/customButton";
import Card from "../components/card";
import InputNum from "../components/inputNum";
import Timer from "../components/timer";
import { useState } from "react";

const HealthMetrics = () => {
    const [isPaused, setIsPaused] = useState(false)

    const togglePause = () => {
        setIsPaused(prevState => !prevState);
      };

    return (
        <div className="flex-1 flex flex-row gap-4 p-8 pr-0 pb-4 pt-0 overflow-y-auto ">
            <div className="flex-[1] flex flex-col gap-4 justify-between pb-16">
                <div>
                    <h4 className="font-semibold">Metrics</h4>
                    <p className="text-lightgray">12.04.2024</p>
                </div>
                <Card className="" title='Weight'>
                    <div className="flex flex-row gap-2 items-center justify-center">
                        <InputNum length={4} childrenI={2}>
                            <div className="size-2 bg-lightgray mt-8 mx-1"></div>
                        </InputNum>
                        <h6 className="text-lightgray select-none mt-8">kg</h6>
                    </div>
                </Card>
                <Card className="" title='Sleep'>
                    <div className="flex flex-row items-center justify-center">
                        <InputNum length={4} childrenI={1}>
                            <h6 className="text-lightgray select-none mt-8 mx-1">h</h6>
                        </InputNum>
                        <h6 className="text-lightgray select-none mt-8">min</h6>
                    </div>
                </Card>
                <Card className="" title='Hydration'>
                    <div className="flex flex-row gap-2 items-center justify-center">
                        <InputNum length={3} childrenI={1}>
                            <div className="size-2 bg-lightgray mt-8 mx-1"></div>
                        </InputNum>
                        <h6 className="text-lightgray select-none mt-8">L</h6>
                    </div>
                </Card>
                <Card className="" title='Calories Burned'>
                    <div className="flex flex-row gap-2 items-center justify-center">
                        <InputNum length={4}/>
                        <h6 className="text-lightgray select-none mt-8">kcal</h6>
                    </div>
                </Card>
            </div>
            <Card className="flex-[3] flex-col justify-start" title='Weight'>
                <CustomButton
                        onClick={togglePause}
                        text={isPaused ? 'Retomar' : 'Pausar'}/>
            </Card>
            <Timer isPaused={isPaused}></Timer>
        </div>
    );
}

export default HealthMetrics;
