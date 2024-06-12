import Graph from "../components/graph";
import Historic from "../components/historic";

type Prop = {
    title : string,
    selected? : boolean
}

const RadioButton = ({title, selected = false} : Prop) =>{
    return(
        <div className={`p-4 flex-1 h-32 flex flex-col border-[2px] rounded-lg select-none ${selected ? " border-lightgray bg-gray text-light" : "border-gray text-lightgray"}`}>
            <div className="flex w-full flex-row justify-between items-center">
                <p className="font-semibold">
                    {title}
                </p>
                <p className={`label px-2 rounded-sm bg-green-600 text-green-200`}>
                    + 0.03%
                </p>
            </div>
            <div className="flex-grow flex items-center justify-center px-12 gap-4">
                <h1 className=" flex flex-row items-end gap-2"> 120 <span className="text-p font-semibold mb-3">min</span></h1>
            </div>
        </div>
    )
}

const Dashboard = () => {
    return (
        <div className="flex-1 flex flex-col gap-4">
            <div className="flex-grow w-full flex flex-row px-4 gap-4">
                <div className=" flex flex-col w-full p-4 select-none outline-3 outline outline-transparent hover:outline-gray rounded-lg transition-all duration-300">
                    <div className="absolute flex flex-row gap-8 self-center mt-[4%] items-center">
                        <h6 className="text-lightgray flex items-center gap-4">Goal <span className="text-h3 font-bold text-light">120 <span className="text-p font-semibold">min</span></span></h6>
                        <div className="h-7 w-[2px] bg-gray"></div>
                        <h6 className="text-lightgray flex items-center gap-4">Average <span className="text-h3 font-bold text-light">120 <span className="text-p font-semibold">min</span></span></h6>
                    </div>
                    <div className="w-full flex flex-row items-center justify-between px-4">
                        <div className="flex flex-row items-center gap-4 text-light">
                            <h3 className="">Weight</h3>
                            <p className="label bg-gray h-fit py-1 px-3 rounded-md">
                                23 apr, 2024
                            </p>
                        </div>
                        <div className="flex flex-row items-center gap-4 px-3 text-lightgray">
                            <p className="size-9 bg-gray text-light grid place-items-center rounded-sm font-semibold cursor-pointer">1 W</p>
                            <p className="size-9 hover:text-light grid place-items-center rounded-sm font-semibold cursor-pointer">1 M</p>
                            <p className="size-9 hover:text-light grid place-items-center rounded-sm font-semibold cursor-pointer">1 Y</p>
                        </div>
                    </div>
                    <Graph />
                </div>
                <div className="flex flex-col justify-between items-center gap-4">
                    <RadioButton title="Weight" selected={true}></RadioButton>
                    <RadioButton title="Weight"></RadioButton>
                    <RadioButton title="Weight"></RadioButton>
                    <RadioButton title="Weight"></RadioButton>
                </div>
            </div>

            <Historic />
        </div>
    );
}

export default Dashboard;
