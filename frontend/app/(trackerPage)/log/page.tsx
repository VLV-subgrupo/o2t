import { PencilLine, Plus, Save, Trash2, X } from "lucide-react";
import ScrollableList from "../components/scrollableList";
import { DatePicker } from "../components/datePicker";
import AddLabel from "../components/addLabel";

const Log = () => {
    return (
        <div className="flex-1 overflow-y-auto">
            <div className="absolute left-28 bg-darkgray w-[623px] h-[765px] flex flex-col p-6 justify-between gap-4 rounded-xl">
                <div className="flex flex-row gap-4">
                    <div className="flex flex-row -gap-[4px]">
                        <div className="size-[42px] rounded-full bg-gray cursor-pointer group -mr-1 border-[2px] border-darkgray grid place-items-center hover:bg-lightgray transition-colors duration-300">
                            <Plus className="size-4 stroke-lightgray group-hover:stroke-darkgray"/>
                        </div>
                        <div className="size-[42px] rounded-full bg-gray cursor-pointer group -mr-1 border-[2px] border-darkgray grid place-items-center hover:bg-lightgray transition-colors duration-300">
                            <PencilLine  className="size-4 stroke-lightgray group-hover:stroke-darkgray"/>
                        </div>
                        <div className="size-[42px] rounded-full bg-gray cursor-pointer group -mr-1 border-[2px] border-darkgray grid place-items-center hover:bg-lightgray transition-colors duration-300">
                            <Save className="size-4 stroke-lightgray group-hover:stroke-darkgray"/>
                        </div>
                        <div className="size-[42px] rounded-full bg-gray cursor-pointer group -mr-1 border-[2px] border-darkgray grid place-items-center hover:bg-lightgray transition-colors duration-300">
                            <Trash2 className="size-4 stroke-lightgray group-hover:stroke-darkgray"/>
                        </div>
                    </div>
                    <DatePicker className="w-full justify-start text-left font-semibold text-p bg-transparent"></DatePicker>
                </div>
                <input type="text" placeholder="Workout Title" className="bg-transparent outline-none w-full text-h4 font-bold placeholder-lightgray px-4 uppercase"></input>
                <AddLabel />
                <textarea placeholder="Workout Description" className="bg-transparent outline-none w-full h-full text-p font-bold placeholder-lightgray border border-gray rounded-lg p-4 resize-none"></textarea>
            </div>
            <ScrollableList />
        </div>
    );
}

export default Log;
