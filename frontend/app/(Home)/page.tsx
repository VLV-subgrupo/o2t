"use client"

import CustomButton from "../_components/customButton";
import { useState } from "react";

import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
  } from "../_components/ui/drawer"
import ProfileForms from "./conponents/profileForms";
import Logo from "../_components/o2t_logo";

type Prop = {
  className : string
  children?: React.ReactElement,
}

const OlympicRing = ({className, children} : Prop) => {
    return(
      <div className={`size-96 bg-transparent rounded-full border-solid border-[12px] absolute felx justify-center items-center ${className}`}>
        {children}
      </div>

    )
}

export default function Home() {
    const [open, setOpen] = useState(false)
    const [sign, setSign] = useState(false)

    const changeSign = (bool : boolean) => {
        setSign(bool)
    };

  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-[#121212]">
        <Drawer open={open} onOpenChange={setOpen}>
            <div className="w-full px-[60px] py-4 sticky flex flex-row items-center justify-between">
                <Logo className=""/>
                <DrawerTrigger asChild>
                    <div className="flex flex-row items-center justify-between gap-6 select-none">
                        <div className="h-8 p-4 cursor-pointer flex items-center justify-between active:scale-[90%] duration-300" onClick= {() => changeSign(true)}>
                            <p className="label">LOGIN</p>
                        </div>
                        <div className="h-8 p-4 outline outline-1 rounded-full outline-light border-solid cursor-pointer flex items-center justify-between bg-transparent hover:bg-light hover:text-darkgray hover:outline-none duration-300 ease-out active:scale-[90%]" onClick= {() => changeSign(false)}>
                            <p className="label">SIGN UP</p>
                        </div>
                    </div>
                </DrawerTrigger>
                <DrawerContent className="outline-none w-[60%] bg-[#0F0F0F]/90 backdrop-blur-sm border-none place-self-center h-[90%]">
                    <ProfileForms signIn={sign} />
                </DrawerContent>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-8 px-20">
                <h1 className="text-light text-[72px] leading-[80px] text-center">
                OLYMPIC TRAINING <br/>
                TRACKER
                </h1>
                <DrawerTrigger asChild>
                    <CustomButton text="GET START"  onClick= {() => changeSign(false)}></CustomButton>
                </DrawerTrigger>
            </div>
        </Drawer>
    </div>

  );
}
