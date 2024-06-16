"use client"

import CustomButton from "../_components/customButton";
import { useEffect, useState } from "react";

import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
  } from "../_components/ui/drawer"
import ProfileForms from "./conponents/profileForms";
import Logo from "../_components/o2t_logo";
import Image from "next/image";

export default function Home() {
    const [open, setOpen] = useState(false)
    const [sign, setSign] = useState(false)

    const changeSign = (bool : boolean) => {
        setSign(bool)
    };

  return (
    <div className={`h-screen overflow-hidden`}>
        <div className="w-full h-full absolute bg-back z-30 top-0 pre-load"></div>
        <div className="w-full h-full overflow-hidden bg-back ease-smooth load-frame">
            <Drawer open={open} onOpenChange={setOpen}>
                <div className="w-full h-full flex flex-col overflow-hidden rounded-xl relative">
                    <div className="w-full h-full z-0 absolute">
                        <Image alt="UsainBoltPhoto" src="/UsainBolt.jpg" layout='fill' objectFit='cover'></Image>
                        <div className="absolute inset-0 bg-gradient-to-r from-darkgray/50 to-transparent"></div>
                    </div>
                    <div className="w-full px-[60px] py-8 sticky flex flex-row items-center justify-between mix-blend-difference">
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
                        <DrawerContent className="outline-none w-[60%] bg-[#0F0F0F]/70 backdrop-blur-md border-none place-self-center h-[90%]">
                            <ProfileForms signIn={sign} />
                        </DrawerContent>
                    </div>
                    <div className="flex-1 flex flex-col justify-center gap-8 px-20">
                        <h1 className="text-light text-[72px] leading-[80px] self-center text-center w-fit px-4 z-50">
                        OLYMPIC TRAINING <br/>
                        TRACKER
                        </h1>
                        <DrawerTrigger asChild>
                            <CustomButton className="z-10" text="GET START"  onClick= {() => changeSign(false)}></CustomButton>
                        </DrawerTrigger>
                    </div>
                </div>
            </Drawer>
        </div>
    </div>

  );
}
