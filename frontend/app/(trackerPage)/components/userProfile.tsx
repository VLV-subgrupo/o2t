import Input from "@/app/(Home)/conponents/input";
import CustomButton from "@/app/_components/customButton";
import { cn } from "@/app/_lib/utils";
import InputNum from "./inputNum";
import Card from "./card";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const UserProfile = () => {
    const router = useRouter()
    const userRaw = Cookies.get("user")
    const user = userRaw === undefined ? null : JSON.parse(userRaw)

    return (
        <form className="flex flex-col items-center justify-between duration-[1000] transition-all ease-out p-16 h-full">
            <div className="flex flex-col justify-between items-start gap-4 w-full">
                <h4 className="text-light">Personal Information</h4>
                <div className="flex flex-row justify-between px-8 w-full">
                    <Input name="username" id="Username" initaialValue={user ? user.name : router.push('/')} isRequired={false} isDisabled={true} className=" bg-transparent cursor-not-allowed w-full"/>
                    <Input name="email" id="E-mail" initaialValue={user ? user.email : router.push('/')} isRequired={false} isDisabled={true} className="bg-transparent cursor-not-allowed w-full"/>
                    <Input name="password" id="New Password" initaialValue="12345678" type="password" isRequired={false} className="bg-transparent w-full"/>
                </div>
            </div>
            <div className="flex flex-col justify-between items-start gap-4 w-full">
                <h4 className="text-light">Personal Goals</h4>
                <div className="flex flex-wrap gap-4 justify-around items-center">
                    <Card className="w-[40%]" title='Weight'>
                        <div className="flex flex-row gap-2 items-center justify-center">
                            <InputNum length={4} childrenI={2}>
                                <div className="size-2 bg-lightgray mt-8 mx-1"></div>
                            </InputNum>
                            <h6 className="text-lightgray select-none mt-8">kg</h6>
                        </div>
                    </Card>
                    <Card className="w-[40%]" title='Sleep'>
                        <div className="flex flex-row items-center justify-center">
                            <InputNum length={4} childrenI={1}>
                                <h6 className="text-lightgray select-none mt-8 mx-1">h</h6>
                            </InputNum>
                            <h6 className="text-lightgray select-none mt-8">min</h6>
                        </div>
                    </Card>
                    <Card className="w-[40%]" title='Hydration'>
                        <div className="flex flex-row gap-2 items-center justify-center">
                            <InputNum length={3} childrenI={1}>
                                <div className="size-2 bg-lightgray mt-8 mx-1"></div>
                            </InputNum>
                            <h6 className="text-lightgray select-none mt-8">L</h6>
                        </div>
                    </Card>
                    <Card className="w-[40%]" title='Calories Burned'>
                        <div className="flex flex-row gap-2 items-center justify-center">
                            <InputNum length={4}/>
                            <h6 className="text-lightgray select-none mt-8">kcal</h6>
                        </div>
                    </Card>
                </div>

            </div>
           <CustomButton text={"Save"}></CustomButton>
        </form>
    )
}

export default UserProfile;