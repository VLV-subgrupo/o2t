"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import ListItem from "./listItem";

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

const ScrollableList = () => {
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

    const items = Array.from({ length: 20 }, (_, index) => `Item ${index + 1}`);

    return (
        <div className="py-[20%] pb-[5%] h-full overflow-hidden" ref={containerRef}>
            {items.map((item, index) => (
                <div
                    key={index}
                    ref={(input) => {
                        itemsRef.current[index] = input;
                    }}
                    onClick={() => selectItem(index)}
                >
                    <ListItem key={index} selected={selectedIndex === index} title="teste" date="13/03" tags={["teste", "test2"]}/>
                </div>
            ))}
        </div>
    );
};

export default ScrollableList;