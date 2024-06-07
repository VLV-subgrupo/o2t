"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import ListItem from "./listItem";

const ScrollableList = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);

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
        if (event.key === 'ArrowUp')
            setSelectedIndex(prevIndex => Math.max(prevIndex - 1, 0))
        else if (event.key === 'ArrowDown')
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
        window.addEventListener('keydown', selectyByArrow);
        window.addEventListener("wheel", selectyByWheel);

        return () => {
            window.removeEventListener('keydown', selectyByArrow);
            window.removeEventListener("wheel", selectyByWheel);
        };
    }, []);

    const items = Array.from({ length: 20 }, (_, index) => `Item ${index + 1}`);

    return (
        <div className="py-[20%] h-full overflow-hidden transition-all ease-out" ref={containerRef}>
            {items.map((item, index) => (
                <div
                    key={index}
                    ref={(input) => {
                        itemsRef.current[index] = input;
                    }}
                    onClick={() => selectItem(index)}
                >
                    <ListItem key={index} selected={selectedIndex === index} />
                </div>
            ))}
        </div>
    );
};

export default ScrollableList;