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
    changeSign?: () => void
}

function SignForm({ className, signIn, changeSign}: Prop) {
    const router = useRouter()
    const submitForm = async (username: string, email: string, password: string, confirmPassword: string, sport: string) => {
        if (signIn) {
            try {
                await handleLogin(email, password)
                router.push('/dashboard')
            } catch (error) {
                setErrorMsg('Something went wrong. Try again.')
            }
        } else {
            try {
                await handleRegister(username, email, password, sport)
                router.push('/dashboard')
            } catch (error) {
                setErrorMsg('Something went wrong. Try again.')
            }
        }
    }
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [sport, setSport] = useState("");
    const [errorMsg, setErrorMsg] = useState("")

    const handleUsernameChange = (value: string) => setUsername(value);
    const handleEmailChange = (value: string) => setEmail(value);
    const handlePasswordChange = (value: string) => setPassword(value);
    const handleConfirmPasswordChange = (value: string) => setConfirmPassword(value);
    const handleSportChange = (value: string) => setSport(value);

    const SendForm = async () =>{
        if (!signIn && !username) {
            setErrorMsg("Username is required")
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!signIn && !emailRegex.test(email)) {
            setErrorMsg("Invalid email format")
            return
        }

        if (!signIn && password.length < 8) {
            setErrorMsg("Password must be at least 8 characters")
            return
        } else if (!signIn && !/(?=.*[!@#$%^&*])/.test(password)) {
            setErrorMsg("Password must contain at least one special character")
            return
        }

        if (!signIn && password !== confirmPassword) {
            setErrorMsg("Passwords do not match")
            return
        }

        if (!signIn && !sport) {
            setErrorMsg("Sport is required")
            return
        }

        await submitForm(username, email, password, confirmPassword, sport)

        setErrorMsg("")
        if (!signIn) changeSign?.()
        //requisiçã, caso erro, mostrar que o email já estpa cadastrado "Email is already registered."
    }


    return (
        <form id="form" className={cn("flex flex-col items-center gap-4 duration-[1000] transition-all ease-out", className)}>
            <div className="grid gap-4 mb-4">
                {!signIn && <Input id="username"  name="username" onValueChange={handleUsernameChange}/>}
                <Input id="email" type="email"  name="email" onValueChange={handleEmailChange}/>
                <Input id="password"  name="password" type="password" onValueChange={handlePasswordChange}/>
                {!signIn && <Input id="confirmPassword"  name="confirmPassword" type="password" onValueChange={handleConfirmPasswordChange}/>}
                {!signIn && <Input id="sport"  name="sport" onValueChange={handleSportChange}/>}
            </div>
           <CustomButton  onClick={SendForm} text={signIn ? "Login" : "Register"}></CustomButton>
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
            <SignForm className="px-4" signIn={sign} changeSign={changeSign}/>
        </>

    );
}

export default ProfileForms;
