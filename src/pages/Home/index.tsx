import { Button } from "antd";
import { useEffect, useState } from "react";
import { __api } from "../../api";
import { BoxContainer } from "../../Components/BoxContainer";
// import { Card } from "../../Components/Card";
import Dustbin from "../../Components/Dustbin";
import { SortCardContainer } from "../../Components/SortCardContainer";
import { ConnectLst } from "../ConnectLst";


export const Home = () => {

    const [showSort, setShowSort] = useState(false);

    useEffect(() => {
        setShowSort(false);
        return () => { }
    }, [])

    const handlerClick = async () => {
        const host = `${__api.getziplist}?dirc=125806668`;
        console.log(host);
        
        const rep = await fetch(host);
        if(rep.ok){
            console.log(await rep.json());
        }

    }

    return (
        <div>
            <Button onClick={handlerClick}>fetch ziplist</Button>
            {showSort ? (<div>
                <ConnectLst />
                <Dustbin />
                <BoxContainer />
            </div>) : <SortCardContainer />}
        </div>
    );
}