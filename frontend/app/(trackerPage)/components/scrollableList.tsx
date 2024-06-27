"use client";

import React, { useEffect, useRef, useState } from "react";
import ListItem from "./listItem";

type Prop = {
    workoutTags: string[][],
    setWorkoutTags: any,
    workouts: any[],
    setWorkouts: any,
    title: string,
    setTitle: any,
    description: string,
    setDescription: any,
    date: Date | undefined,
    setDate: any,
    setWorkoutId: any,
}

function throttle(func: (...args: any[]) => void, limit: number) {
    let inThrottle: boolean;
    return function (this: any, ...args: any[]) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

const ScrollableList = ({workoutTags, setWorkoutTags, workouts, setWorkouts, title, setTitle, description, setDescription, date, setDate, setWorkoutId}:Prop) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const moveItem = (index: number) => {
        itemsRef.current[index]?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    };

    const selectItem = (index: number) => {
        setSelectedIndex(index);
        fillWorkoutFieldsWithCurrent(workouts[index])
    };

    const selectyByArrow = (event: KeyboardEvent) => {
        if (event.key === 'ArrowUp' || event.key === 'ArrowLeft')
            setSelectedIndex(prevIndex => Math.max(prevIndex - 1, 0))
        else if (event.key === 'ArrowDown' || event.key === 'ArrowRight')
            setSelectedIndex(prevIndex => Math.min(prevIndex + 1, 19)) //FIXME - this is not mudar o maximo
    }

    const selectyByWheel = (event: WheelEvent) => {
        if (event.deltaY < 0)
            setSelectedIndex(prevIndex => Math.max(prevIndex - 1, 0))
        else
            setSelectedIndex(prevIndex => Math.min(prevIndex + 1, 19)) //FIXME - this is not mudar o maximo
    }

    const getWorkoutLabels = (workout: any) => {
        let result: any[] = []
        for (let i = 0; i < workout.labels.length; i++) {
            result.push(workout.labels[i].name)
        }
        return result
    }

    const fillWorkoutFieldsWithCurrent = (current: any) => {
        setWorkoutId(current.id)
        setTitle(current.title)
        setDescription(current.description)
        setDate(current.registrationDate)
        let result: any[] = []
        for (let i = 0; i < current.labels.length; i++) {
            result.push([current.labels[i].name, current.labels[i].color, current.labels[i].id])
        }
        setWorkoutTags(result)
    }

    const formatDate = (date: string) => {
        let obj = new Date(date)
        return obj.toLocaleDateString("pt-BR")
    }

    useEffect(() => {
        moveItem(selectedIndex)
    }, [selectedIndex]);

    useEffect(() => {
        const throttledSelectyByWheel = throttle(selectyByWheel, 250);
        const list = containerRef.current;

        window.addEventListener('keydown', selectyByArrow);
        list?.addEventListener("wheel", throttledSelectyByWheel);

        return () => {
            window.removeEventListener('keydown', selectyByArrow);
            list?.removeEventListener('wheel', throttledSelectyByWheel);
        };
    }, []);

    return (
        <div className="py-[20%] pb-[5%] h-full overflow-hidden" ref={containerRef}>
            {workouts.map((workout, index) => (
                <div
                    key={workout.id}
                    ref={(input) => {
                        itemsRef.current[index] = input;
                    }}
                    onClick={() => selectItem(index)}
                >
                    <ListItem key={index} selected={selectedIndex === index} title={workout.title} date={formatDate(workout.registrationDate)} tags={getWorkoutLabels(workout)}/>
                </div>
            ))}
        </div>
    );
};

export default ScrollableList;