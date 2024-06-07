import { cn } from "@/app/_lib/utils";

type Prop = {
    selected?: boolean;
    className?: string;
    tag?: string;
}

const Tags = ({selected, className, tag = "label"} : Prop) => {
    return (
        <div className={cn("rounded-full h-5 px-3 bg-gray w-fit select-none grid place-content-start", selected && "bg-red-600", className)}>
            <p className="text-label text-light font-semibold items-center">
                {tag}
            </p>
        </div>
     );
}

export default Tags;