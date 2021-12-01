import { Card } from "antd";
import React, { CSSProperties, useEffect, useState } from "react"
// import { Draggable } from "react-beautiful-dnd";
import { ConnectUserInfo } from "../../interface/ConnectUserInfo"
import {
    ConnectDropTarget,
    ConnectDragSource,
    // DropTargetMonitor,
    // DragSourceMonitor,
    useDrag,
} from 'react-dnd'
// import {
//     DragSource,
//     DropTarget,
//     DropTargetConnector,
//     DragSourceConnector,
// } from 'react-dnd'
import { ItemTypes } from "../../Types";
import { DropResult } from "react-beautiful-dnd";


export interface CardProps {
    id: any,
    content: string,
    index: number,
    moveCard: (dragIndex: number, hoverIndex: number) => void,
    isDragging: boolean,
    connectDragSource: ConnectDragSource,
    connectDropTarget: ConnectDropTarget
}

// interface CardInstance {
//     getNode(): HTMLDivElement | null
// }





/**
 * user card组件
 * @param props {connectUserInfo:ConnectUserInfo}
 * @returns 
 */
// @DragSource(type,spec,collect)


const ConnectUser: React.FC<{ connectUserInfo: ConnectUserInfo }> = (props) => {

    const [userInfo, setUserInfo] = useState<ConnectUserInfo>();

    // const ref = useRef()

    const divStyle: CSSProperties = {
        width: 400,
        // cursor: 'move',
        cursor: 'grab',
        opacity: 1,
        // backgroundColor:'blue',
        // height: 100,
    }


    const cardStyle: CSSProperties = {
        backgroundColor: 'blue'
    }

    useEffect(() => {
        const { connectUserInfo } = props;
        console.log(connectUserInfo);
        setUserInfo(connectUserInfo);
        return () => { };
    }, [props])

    const { id } = userInfo ?? { id: Math.random(), content: "default content" };

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.Card,
        item: () => ({ id }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId:monitor.getHandlerId(),
        }),
        end:(item,monitor) =>{
            const dropResult = monitor.getDropResult<DropResult>();
            if(item && dropResult){
                alert(`you dropped ${item.id} into ${dropResult.draggableId}`)
            }
        }
    });

    // const moveOpacity = () => (isDragging ? { opacity: 0.8 } : { opacity: 1 })
    const opacity = isDragging ? 0.4 : 1;
    const cursor = isDragging ? 'grabbing' : 'grab'; //这个好像不起作用  后面回来研究一下

    // drag(ref);

    return (

        <div style={{ ...divStyle,opacity,cursor }} ref={drag}>
            <Card style={cardStyle} title={userInfo ? userInfo.name : '未知用户'} extra={<a href="http://www.baidu.com">More</a>}>
                <p>{userInfo?.status ? 'online' : 'offline'}</p>
                {userInfo?.content ? <p>{userInfo.content}</p> : undefined}
            </Card>
        </div>
    )
}

export default ConnectUser;