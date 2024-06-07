import Tags from "./tags";

type Prop = {
    selected: boolean;
}

const ListItem = ({selected} : Prop) => {
    return (
        <div className={` border-t-[2px] border-darkgray flex flex-row items-center justify-between px-16 cursor-pointer duration-300 h-[100px] group ease-smooth ${selected ? "pl-[55%] bg-darkgray" :" pl-[50%]"}`}>
            <div className={`flex flex-row gap-16 items-center ${selected ? "text-light" : "text-lightgray"} group-hover:text-light`}>
                <p className="">
                    14/03
                </p>
                <h4 className=" uppercase">
                    Braço e Pernas
                </h4>
            </div>
            <div className="flex flex-row gap-8 justify-end">
                <Tags selected={selected}></Tags>
            </div>
        </div>
    );
}

export default ListItem;
