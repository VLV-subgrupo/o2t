type Prop = {
    children: React.ReactElement,
    className?: string,
    title: string,
}

const Card = ({children, className, title}: Prop) => {
    return (
        <div className={`${className} flex flex-col gap-4 px-4 py-3 justify-start items-center has-[:focus]:bg-darkgray duration-500 transition-all rounded-md group`}>
            <h6 className="self-start text-lightgray font-bold group-has-[:focus]:text-light">
                {title}
            </h6>
            {children}
        </div>
    );
}

export default Card;