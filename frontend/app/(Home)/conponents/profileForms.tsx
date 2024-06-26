import CustomButton from "@/app/_components/customButton";
import { DrawerHeader} from "@/app/_components/ui/drawer";
import { cn } from "@/app/_lib/utils";
import Input from "./input";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { handleLogin, handleRegister } from "@/app/_lib/handlers";

type Prop = {
    className?: string,
    signIn?: boolean
}

function SignForm({ className, signIn }: Prop) {
    const router = useRouter()
    const submitForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        if (signIn) {
            try {
                await handleLogin(formData)
                router.push('/dashboard')
            } catch (error) {
                console.log("Login error: ", error)
            }
        } else {
            try {
                await handleRegister(formData)
                router.push('/dashboard')
            } catch (error) {
                console.log("Register error: ", error)
            }
        }
    }

    return (
        <form id="form" onSubmit={submitForm} className={cn("flex flex-col items-center gap-4 duration-[1000] transition-all ease-out", className)}>
            <div className="grid gap-4 mb-4">
                {!signIn && <Input id="username" name="username" />}
                <Input id="email" name="email" type="email" />
                <Input id="password" name="password" type="password" />
                {!signIn && <Input id="confirmPassword" name="confirmPassword" type="password" />}
                {!signIn && <Input id="sport" name="sport" />}
            </div>
           <CustomButton onClick={ () => document.getElementById('submit')?.click() } text={signIn ? "Login" : "Register"}></CustomButton>
            <button id='submit' type="submit" hidden={true}></button>
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
                <p className="font-semibold text-lightgray text-center uppercase">{sign ? "don’t have account yet?" : "Already have an account?"} <span className=" underline cursor-pointer hover:text-light duration-300" onClick={() => setTimeout(() => changeSign(), 100)}>{sign ? " Register Here" : " Sign In"}</span></p>
            </DrawerHeader>
            <SignForm className="px-4" signIn={sign}/>
        </>

    );
}

export default ProfileForms;
