import CustomButton from "@/app/_components/customButton";
import { DrawerHeader} from "@/app/_components/ui/drawer";

import { cn } from "@/app/_lib/utils";
import Input from "./input";
import { useState } from "react";


type Prop = {
    className?: string,
    signIn?: boolean
}

function SignForm({ className, signIn }: Prop) {
    return (
        <form className={cn("flex flex-col items-center gap-4 duration-[1000] transition-all ease-out", className)}>
            <div className="grid gap-4 mb-4">
                <Input id="Username"/>
                <Input id="E-mail" type="email" hidden={signIn}/>
                <Input id="Password" type="password" />
                <Input id="Confirm password" type="password" hidden={signIn}/>
                <Input id="Sport" hidden={signIn}/>
            </div>
           <CustomButton text={signIn ? "Login" : "Register"}></CustomButton>
        </form>
    )
}

const ProfileForms = ({signIn = false} : Prop) => {
    const [sign, setSign] = useState(signIn)

    const changeSign = () => {
        setSign(!sign)
    };

    return (
        <>
            <DrawerHeader className="my-6">
            <h2 className="text-light text-center">{sign ? "WELCOME BACK" : "LET’S GET STARTED"}</h2>
                <p className="font-semibold text-lightgray text-center uppercase">{sign ? "don’t have account yet?" : "Already have an account?"} <span className=" underline cursor-pointer hover:text-label hover:text-green-300 duration-300" onClick={() => setTimeout(() => changeSign(), 100)}>{sign ? " Register Here" : " Sign In"}</span></p>
            </DrawerHeader>
            <SignForm className="px-4" signIn={sign}/>
        </>

    );
}

export default ProfileForms;
