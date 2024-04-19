import EnterSvg from "./enter";

type Prop = {
    onClick: () => void;
}

const CustomButton = ({ onClick }: Prop) => {
    return ( 
        <div onClick={onClick} className="group bg-secondary flex h-[48px] self-center rounded-full px-[24px] items-center gap-4 cursor-pointer hover:pr-4 select-none">
            <h1 className=" font-medium text-base text-background ">Change</h1>
            <div className="size-3 bg-primary rounded-full group-hover:size-8 group-hover:ease-bounce flex items-center justify-center">
                <EnterSvg className=" stroke-2 fill-transparent stroke-tranparent group-hover:fill-secondary group-hover:stroke-secondary"/>
            </div>
        </div>
    );
}
 
export default CustomButton;