import { BoxContainer } from "../../Components/BoxContainer";
import Dustbin from "../../Components/Dustbin";
import { ConnectLst } from "../ConnectLst";

export const DustbinBox = () => {
    return (
        <span>
            <ConnectLst />
            <Dustbin />
            <BoxContainer />
        </span>
    );
}