import EnterSvg from "./enter";

type Prop = {
    text    : string
    onClick?: () => void;
}

const CustomButton = ({text, onClick }: Prop) => {
    return (
        <div data-testid='custombutton' onClick={onClick} className="group bg-light flex h-[48px] self-center rounded-full px-6 items-center gap-4 cursor-pointer hover:pr-4 select-none duration-300 w-fit active:scale-[90%] ease-smooth">
            <p className="text-darkgray font-semibold">{text}</p>
            <div className="size-3 bg-gray rounded-full group-hover:size-8 ease-smooth flex items-center justify-center duration-300 pr-[1px] pt-[1px]">
                <EnterSvg className=" stroke-2 fill-transparent stroke-tranparent group-hover:fill-light group-hover:stroke-light"/>
            </div>
        </div>
    );
}

export default CustomButton;
