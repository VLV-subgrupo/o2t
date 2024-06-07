import Mesure from "./mesure";

const Graph = () => {
    return ( 
        <div className="flex-grow w-full p-8">
            <div>
                <h3 className="text-light">Title</h3>
                <Mesure num="101" unit="min" main={true} ></Mesure>
            </div>
        </div>
     );
}
 
export default Graph;