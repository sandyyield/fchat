import { CSSProperties, FC, useRef } from "react";
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from "react-dnd";
import { ItemTypes } from "../../Types";
import { Card as CardAntd } from 'antd'


const style: CSSProperties = {
    cursor: 'grab',
    // height: '10rem',
    width: '20rem',
    backgroundColor: 'gray',
    font: '10px'

}

export interface CardProps {
    id: number,
    text: string,
    index: number,
    moveCard: (dragIndex: number, hoverIndex: number) => void,
}

interface DragItem {
    index: number,
    id: string,
    type: string,
}

export const Card: FC<CardProps> = ({ id, text, index, moveCard }) => {

    const ref = useRef<HTMLDivElement>(null);

    //drop
    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.SORT,
        collect: (monitor) => ({
            handlerId: monitor.getHandlerId()
        }),
        hover: (item: DragItem, monitor: DropTargetMonitor) => {
            if (!ref.current) return;
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundIngRect = ref.current?.getBoundingClientRect();

            const hoverMiddleY = (hoverBoundIngRect.bottom - hoverBoundIngRect.top) / 2;

            const clientOffset = monitor.getClientOffset();

            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundIngRect.top;

            if (dragIndex < hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    })

    //drag 
    const [{ idDragging }, drag] = useDrag({
        type: ItemTypes.SORT,
        item: () => ({ id, index }),
        collect: (monitor) => ({
            idDragging: monitor.isDragging(),
        })
    })

    drag(drop(ref));

    const opacity = idDragging ? 0.8 : 1;

    return (
        <div style={{ ...style, opacity }} ref={ref} data-handler-id={handlerId} >
            <CardAntd title={text} />
        </div>
    );
}