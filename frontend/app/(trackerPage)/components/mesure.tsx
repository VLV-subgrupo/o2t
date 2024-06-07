type Prop = {
    num  : string,
    unit : string,
    main?: boolean
}

const Mesure = ({num, unit, main = false} : Prop) => {
    return ( 
        <h1 className={`${main ? "text-h1" : "text-h3"}  text-lightgray font-bold select-none`}>
            {num}
            <span className="mx-2 text-p text-lightgray font-medium select-none pb-3">
                {unit}
            </span>
        </h1>
    );
}
 
export default Mesure;