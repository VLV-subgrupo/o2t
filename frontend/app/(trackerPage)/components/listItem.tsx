import Tags from "./tags";

type Prop = {
    selected: boolean;
    title : string
    date : string
    tags ?: string[]
    
}

const ListItem = ({selected, title, date, tags = []} : Prop) => {
    return (
        <div className={` border-b-[2px] border-darkgray flex flex-row items-center justify-between px-16 cursor-pointer transition-all duration-500 h-[100px] group ease-smooth hover:border-gray ${selected ? "pl-[53%] bg-darkgray" :" pl-[50%]"}`}>
            <div className={`flex flex-row gap-16 items-center ${selected ? "text-light" : "text-lightgray"}`}>
                <p className="">
                    {date}
                </p>
                <h4 className=" uppercase">
                    {title}
                </h4>
            </div>
            <div className="flex flex-row gap-4 justify-end">
                {tags.map((tag, index) => (
                    <Tags key={index} selected={selected} name={tag} />
                ))}
            </div>
        </div>
    );
}

export default ListItem;
