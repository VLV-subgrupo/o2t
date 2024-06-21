import { cn } from "@/app/_lib/utils";

type Prop = {
    selected?: boolean;
    className?: string;
    name : string;
    color : string;
    onClick?: () => void;
}

const Tags = ({selected, className, name, color, onClick} : Prop) => {
    return (
        <div onClick={onClick} className={cn("rounded-full h-5 px-3 bg-gray w-fit select-none grid place-content-start", selected && "bg-red-600", className)}
        style={{ backgroundColor: color}}>
            <p className="text-label text-darkgray font-semibold items-center lowercase">
                {name}
            </p>
        </div>
     );
}

export default Tags;