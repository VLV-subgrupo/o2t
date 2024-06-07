"use client"

import DashBoardIcon from "../../_components/icons/dashboardIcon";
import { useEffect, useState } from "react";
import DumbbellIcon from "../../_components/icons/dumbbellIcon";
import HeartIcon from "../../_components/icons/heartIcon";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Profile from "./profile";

type Prop = {
    handleClick: () => void;
    navButton: number
    navState: boolean
}

const NavButtons = ({ handleClick, navButton, navState}: Prop) => {
    const [hovered, setHovered] = useState(false);
    return(
        <div onClick={handleClick} className=" w-32 flex justify-center items-center">
            <div  className={`size-12 bg-darkgray flex flex-col rounded-full items-center justify-center group overflow-hidden select-none relative cursor-pointer ease-linear duration-300 active:scale-75 ${navState ? 'bg-light w-[140px]' : ''}`}onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>
                <p className={`absolute -top-5 text-darkgray text-[2px] opacity-0 z-20 ${navState ? 'hoverText' : ''} self-center font-bold`}>
                    {navButton == 0 ? 'Dashboard' : navButton == 1 ? 'Workout Log' : 'Health Metrics'}
                </p>
                <DashBoardIcon className = {navButton == 0 ? navState ? 'block size-10 translate-y-[75%] transition-all duration-300 ease-smooth' : 'block ' : 'hidden'} hover={hovered || navState}></DashBoardIcon>
                <DumbbellIcon className = {navButton == 1 ?  navState ? 'block size-20 translate-y-[45%] rotate-45 transition-all duration-300  ease-smooth' : 'block size-6' :'hidden'} hover = {hovered || navState}></DumbbellIcon>
                <HeartIcon className={navButton == 2 ?  navState ? 'block size-20 translate-y-[70%] transition-all duration-300' : 'block size-6 ease-smooth' : 'hidden'} hover = {hovered || navState}></HeartIcon>
            </div>
        </div>
    )
}

const NavBar = () => {
    const pathname = usePathname();
    const [navState, setNavState] = useState(3);

    const changeState = (estado : number) => {
        setNavState(estado);
    };

    useEffect(() => {
        // Define o estado com base no caminho atual
        if (pathname == '/dashboard') {
          setNavState(0);
        } else if (pathname == '/log') {
          setNavState(1);
        } else if (pathname == '/metrics') {
          setNavState(2);
        }
    }, []);

    return (
        <div className="w-full grid items-center grid-cols-3 px-[60px] py-4 sticky">
            <h6 className="text-light">
                O2T
            </h6>
            <div className="grid grid-cols-3 gap-4 justify-self-center">
                <Link href="/dashboard">
                    <NavButtons handleClick={() => changeState(0)} navButton={0} navState={navState == 0}></NavButtons>
                </Link>
                <Link href="/log">
                    <NavButtons handleClick={() => changeState(1)} navButton={1} navState={navState == 1}></NavButtons>
                </Link>
                <Link href="/metrics">
                    <NavButtons handleClick={() => changeState(2)} navButton={2} navState={navState == 2}></NavButtons>
                </Link>
            </div>
            <Profile />
        </div>
     );
}

export default NavBar;
