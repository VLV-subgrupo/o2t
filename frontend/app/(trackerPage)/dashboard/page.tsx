import Profile from "@/app/(trackerPage)/components/profile";
import Graph from "../components/graph";
import Historic from "../components/historic";
import Mesure from "../components/mesure";

type Prop = {
    title : string,
}

const RadioButton = ({title} : Prop) =>{
    return(
        <div className="p-4 flex-1 h-32 flex flex-col bg-darkgray rounded-lg items-center">
            <h6 className=" text-lightgray select-none">
                {title}
            </h6>
            <div className="flex-grow flex items-center justify-center">
                <Mesure num="100" unit="kg"></Mesure>
            </div>
        </div>
    )
}

const Dashboard = () => {
    return (
        <div className="flex-1 flex flex-col gap-4">
            <div className="flex-grow w-full flex flex-col">
                <Graph></Graph>
                <div className="px-4 flex flex-row justify-between items-center w-full gap-2">
                    <RadioButton title="Weight"></RadioButton>
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
