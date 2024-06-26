"use client"

import * as React from "react"
import { format } from "date-fns"


import { cn } from "@/app/_lib/utils"
import { Button } from "@/app/_components/ui/button"
import { Calendar } from "@/app/_components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover"
import { CalendarDays } from "lucide-react"

type Prop = {
    className?: string,
    date: any,
    setDate: any,
}

export function DatePicker({className, date, setDate} : Prop) {
  const today = new Date()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            !date && "text-muted-foreground", className
          )}
        >
          <CalendarDays className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          disabled={{ before: today }}
          fromMonth={new Date(today.getFullYear(), today.getMonth() + 1, 0)}
          selected={date}
          onSelect={setDate}
          initialFocus
          className=" bg-back outline-back outline-2 outline rounded-lg select-none"
        />
      </PopoverContent>
    </Popover>
  )
}
