import { useEffect, useState } from "react";
import { BoxContainer } from "../../Components/BoxContainer";
// import { Card } from "../../Components/Card";
import Dustbin from "../../Components/Dustbin";
import { SortCardContainer } from "../../Components/SortCardContainer";
import { ConnectLst } from "../ConnectLst";


export const Home = () => {

    const [showSort, setShowSort] = useState(false); 

    useEffect(() => {
        setShowSort(false);
        return () => {}
    }, [])

    return (
        <div>
            
            {showSort ? (<div>
                <ConnectLst />
                <Dustbin />
                <BoxContainer />
            </div>) : <SortCardContainer />}

        </div>
    );
}