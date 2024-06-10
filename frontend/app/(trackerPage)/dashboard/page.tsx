import Graph from "../components/graph";
import Historic from "../components/historic";

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
            </div>
        </div>
    )
}

const Dashboard = () => {
    return (
        <div className="flex-1 flex flex-col gap-4">
            <div className="flex-grow w-full flex flex-col">
                <div className="flex-grow flex flex-row w-full p-8 select-none">
                    <div className="w-[40%] flex flex-col">
                        <h3>
                            Workout Duration
                        </h3>
                        <div className="flex-1 flex flex-col justify-center items-center">
                            <h6 className="flex flex-col text-light">
                                Today
                                <span className="text-display font-bold">70.0
                                    <span className="text-p ml-2 text-lightgray">min</span>
                                </span>
                            </h6>
                            <div className="flex flex-row gap-4">
                                <h6 className="flex flex-col text-lightgray">
                                    Goal
                                    <span className="text-h3 font-bold ">70.0
                                        <span className="text-p ml-2">min</span>
                                    </span>
                                </h6>
                                <h6 className="flex flex-col text-lightgray">
                                    Today
                                    <span className="text-h3 font-bold ">70.0
                                        <span className="text-p ml-2">min</span>
                                    </span>
                                </h6>
                            </div>

                        </div>
                    </div>
                    <Graph />
                </div>
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
