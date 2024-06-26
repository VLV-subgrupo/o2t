"use client"

import CustomButton from "@/app/_components/customButton";
import Card from "../components/card";
import InputNum from "../components/inputNum";
import Timer from "../components/timer";
import { useEffect, useRef, useState } from "react";
import Tags from "../components/tags";
import { Button } from "@/app/_components/ui/button";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/_components/ui/tooltip";
import { handleGetAllUserLabels, handleGetAllUserWorkouts } from "@/app/_lib/handlers";

type Prop = {
    title: string,
    description: string,
    labels: any[],
}
import { handleCreateMetric, handleGetMetrics, handleUpdateMetric } from "@/app/_lib/handlers";

const Content = ({title, description, labels}: Prop) => {
    return(
        <>
            <h2>{title}</h2>
            <div className="flex flex-row gap-2 mt-2 mb-8">
                {labels.map((label: any) => {
                    return <Tags name={label.name} color={label.color}/>
                })}
            </div>
            <p>{description}</p>
        </>
    )
}

const HealthMetrics = () => {
    const [isPaused, setIsPaused] = useState(true)
    const [page, setPage] = useState(1)
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [retValues, setRetValues] = useState(['0000', '0000', '000', '0000'])
    const [iniVel, setIniVel] = useState<{ [key: string]: string; }>({ calories: '0000', hydration: '000', sleep: '0000', weight: '0000' })
    const [todayMetrics, setTodayMetrics] = useState<string[][]>([])
    const today = new Date()
    const [workouts, setWorkouts] = useState<any[]>([{
        title: 'No workout',
        description: 'All done for today!',
        labels: [],
    }])

    const getWorkouts = async () => {
        let workouts: any[] = await handleGetAllUserWorkouts()
        let todayWorkouts: any[] = []
        workouts.forEach((element: any) => {
            let regDate = new Date(element.registrationDate)
            if (regDate.toLocaleDateString('pt-BR') === today.toLocaleDateString('pt-BR')) {
                todayWorkouts.push(element)
            }
        })
        if (todayWorkouts.length !== 0) {
            setWorkouts(todayWorkouts)
        }
    }

    const getTodayMetrics = async () =>{
        const today = new Date()
        const todayMN = new Date()
        todayMN.setHours(0, 0, 0, 0);
        const metrics = await handleGetMetrics(todayMN, today)
        setTodayMetrics(metrics || [])
    }
    useEffect(()=>{
        getTodayMetrics()
        getWorkouts()
    }, [])

    useEffect(() => {
        const result = todayMetrics.reduce((acc, entry) => {
            const key = entry[1].toLowerCase();
            if (key == 'sleep'){
                const hours = Math.floor(parseInt(entry[2]) / 60);
                const mins = parseInt(entry[2]) % 60;

                const formattedHours = String(hours).padStart(2, '0');
                const formattedMinutes = String(mins).padStart(2, '0');
                acc[key] = `${formattedHours}${formattedMinutes}`
            } else {
                acc[key] = entry[2].toString().replace('.', '')
            }
            return acc;
          }, {} as { [key: string]: string });
        setIniVel(result);
    },[todayMetrics])

    const scrollToBottom = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
              top: scrollContainerRef.current.scrollHeight,
              behavior: 'smooth'
            });
        }
    };

    const togglePause = () => {
        setIsPaused(prevState => !prevState);
    };

    const prevPage = () => {
        if (page > 0) {
          setPage(prevPage => prevPage - 1);
        }
    };

    const nextPage = () => {
        if (page < workouts.length) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const returnValues = (ret : string, i: number) => {
        const newRetValues = [...retValues];
        newRetValues[i] = ret;
        setRetValues(newRetValues);
    }

    const submitMetrics = async () =>{
        // Calcula kg
        const kg = (parseInt(retValues[0], 10)/10).toFixed(1);

        // Calcula o total de minutos
        const hours = parseInt(retValues[1].substring(0, 2), 10);
        const minutes = parseInt(retValues[1].substring(2), 10);
        const totalMinutes = (hours * 60 + minutes).toString();

        // Calcula Hidratação
        const l = (parseInt(retValues[2], 10)/10).toFixed(1);

        // Calcula Calorias
        const kcal = parseInt(retValues[3], 10).toString();

        const today = new Date()
        const types = ['WEIGHT', 'HYDRATION', 'SLEEP', 'CALORIES']
        const newMetrics = [kg, l, totalMinutes, kcal]
        console.log(newMetrics)
        if (todayMetrics.length < 4){
            const presentTypes = new Set(todayMetrics.map(metric => metric[1]));
            const missingTypesWithIndices = types.reduce((missing: number[], type, index) => {
                if (!presentTypes.has(type)) {
                    missing.push(index);
                }
                return missing;
            }, []);

            missingTypesWithIndices.forEach((e,i) =>{
                handleCreateMetric(i, newMetrics[i])
            })
            const updateMetrics = await handleGetMetrics(new Date(today.getTime() - (24 * 60 * 60 * 1000)), today)
            setTodayMetrics(updateMetrics || [])
        } else{
            types.forEach((e, i:number) =>{
                const index = todayMetrics.findIndex(item => item[1] === e)
                handleUpdateMetric(e, newMetrics[i], todayMetrics[index][3])
            })
            const updateMetrics = await handleGetMetrics(new Date(today.getTime() - (24 * 60 * 60 * 1000)), today)
            setTodayMetrics(updateMetrics || [])
        }
    }

    return (
        <div className="flex-1 flex flex-row gap-4 p-8 pr-0 pt-0 overflow-y-auto ">
            <div className="flex-[1] flex flex-col justify-between">
                <h5 className="font-semibold">Metrics</h5>
                <Card className="" title='Weight'>
                    <div className="flex flex-row gap-2 items-center justify-center">
                        <InputNum metricType={0} ret={returnValues} length={4} childrenI={2} initialVal={iniVel.weight}>
                            <div className="size-2 bg-lightgray mt-8 mx-1"></div>
                        </InputNum>
                        <h6 className="text-lightgray select-none mt-8">kg</h6>
                    </div>
                </Card>
                <Card className="" title='Sleep'>
                    <div className="flex flex-row items-center justify-center">
                        <InputNum metricType={1} ret={returnValues} length={4} childrenI={1} initialVal={iniVel.sleep}>
                            <h6 className="text-lightgray select-none mt-8 mx-1">h</h6>
                        </InputNum>
                        <h6 className="text-lightgray select-none mt-8">min</h6>
                    </div>
                </Card>
                <Card className="" title='Hydration'>
                    <div className="flex flex-row gap-2 items-center justify-center">
                        <InputNum metricType={2} ret={returnValues} length={3} childrenI={1} initialVal={iniVel.hydration}>
                            <div className="size-2 bg-lightgray mt-8 mx-1"></div>
                        </InputNum>
                        <h6 className="text-lightgray select-none mt-8">L</h6>
                    </div>
                </Card>
                <Card className="" title='Calories Burned'>
                    <div className="flex flex-row gap-2 items-center justify-center">
                        <InputNum metricType={3} ret={returnValues} length={4} initialVal={iniVel.calories}/>
                        <h6 className="text-lightgray select-none mt-8">kcal</h6>
                    </div>
                </Card>
                <CustomButton onClick={submitMetrics} text='Save' className=""/>
            </div>
            <div className="flex-[3] flex flex-col items-center gap-2">
                <div className="flex flex-row gap-4 items-center justify-center">
                    <h3 className="font-semibold text-center">Today's Workout</h3>
                    <p className="label bg-gray w-fit h-fit py-1 px-3 mt-2 rounded-md">{today.toLocaleDateString('pt-BR')}</p>
                </div>
                <div className="w-full h-full outline-3 outline outline-transparent hover:outline-gray rounded-lg transition-all duration-300 relative flex flex-col items-center p-4 gap-4 overflow-y-auto">
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className={`absolute top-4 right-4 flex flex-row justify-between items-center z-40 select-none`}>
                                    <Button variant="ghost" disabled={!isPaused || page == 1} onClick={() => {prevPage()}} className={`h-7 w-7 bg-transparent p-0 opacity-100`}>
                                        <ChevronLeft/>
                                    </Button>
                                    <p className="min-w-10 text-center">{page}</p>
                                    <Button variant="ghost" disabled={!isPaused || page == workouts.length} onClick={() => {nextPage()}} className={`h-7 w-7 bg-transparent p-0 opacity-100`}>
                                        <ChevronRight/>
                                    </Button>
                                </div>
                            </TooltipTrigger>
                            {!isPaused &&
                            <TooltipContent side="bottom" className="mt-2 bg-light text-darkgray p-2 border-none">
                                <p className="label">Conclude Workout to Navigate</p>
                            </TooltipContent>}
                        </Tooltip>
                    </TooltipProvider>
                    <CustomButton onClick={togglePause} text={isPaused ? 'Start' : 'Finish'} className="absolute bottom-4 backdrop-blur-sm z-40"/>
                    <div className="size-6 absolute cursor-pointer bottom-6 right-10 z-40 animate-bounce" onClick={scrollToBottom}>
                        <ChevronDown className=" stroke-lightgray stroke-[3px] hover:stroke-light transition-colors duration-200 ease-smooth"/>
                    </div>
                    <div ref={scrollContainerRef} className="w-full h-full overflow-y-scroll relative mask-gradient pb-20">
                        <Content title={workouts[page - 1].title} description={workouts[page - 1].description} labels={workouts[page - 1].labels}/>
                    </div>
                </div>
            </div>
            <Timer isPaused={isPaused}></Timer>
        </div>
    );
}

export default HealthMetrics;
