"use client"

import { buttonVariants } from "@/app/_components/ui/button"
import { Calendar } from "@/app/_components/ui/calendar"
import { cn } from "@/app/_lib/utils"
import { useState } from "react"

const Historic = () => {
    const [date, setDate] = useState<Date | undefined>(new Date())

    return (
    <div className="w-full flex flex-col mb-2">
        <div className="bg-darkgray w-full flex justify-between items-center flex-col p-1">
            <h6 className="text-light select-none">Workout History</h6>
        </div>
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="w-full"
            classNames={{
                caption_label: "text-p medium",
                month: "space-y-4 w-full",
                head_cell: "hidden",
                cell: "w-full",
                row: "mt-0 flex-1 flex justify-between",
                nav_button_previous: "",
                nav_button_next: "",
                day: cn(
                    buttonVariants({ variant: "ghost" }),
                    "h-9 w-9 rounded-full p-0 font-medium aria-selected:opacity-100"
                  ),
                nav: "space-x-1 flex items-center gap-48 absolute self-center",
                table: "w-full border-collapse space-y-1 m-0 rowCalender"
            }}
        />
    </div>
    );
}

export default Historic;
