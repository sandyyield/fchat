import { FC, useEffect, useState } from "react"
// import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import ConnectUser from "../../Components/ConnectUser"
import { ConnectUserInfo } from "../../interface/ConnectUserInfo";




export const ConnectLst: FC<{}> = () => {

    const [connectCount, setConnectCount] = useState<null | ConnectUserInfo[]>(null);

    useEffect(() => {
        //初始化一些默认值 方便调试
        const connectUserlst: ConnectUserInfo[] = [
            {
                id: 1,
                name: "sandy",
                status: true,
                content: "nice to meet you"
            },
            {
                id: 2,
                name: "admin",
                status: false,
                content: "hello motro"
            },
            {
                id: 3,
                name: "seven",
                status: false,
                content: "goodbye"
            }
        ]

        setConnectCount(connectUserlst);
        return () => { };
    }, [])
    //#region beautful-dnd handle
    // const onDragEnd = (result: DropResult) => {
    //     if (!result.destination) {
    //         return;
    //     }
    //     console.log('drag end');


    // };

    // const onDragStart = () => {
    //     console.log('drag start');

    // }

    // const onDragUpdate = () => {
    //     console.log('drag update');
    // }
    //#endregion

    return (
        <div>
            {
                connectCount?.map((i, index) => {
                    return <ConnectUser connectUserInfo={i} key={i.id} />
                })
            }
        </div>
        //#region beautful dnd
        // <div>
        //     {
        //         connectCount?.map((i, index) => {
        //             return (
        //                 <DragDropContext
        //                     onDragEnd={onDragEnd}
        //                     onDragStart={onDragStart}
        //                     onDragUpdate={onDragUpdate}
        //                     key={i.id}
        //                 >
        //                     <Droppable droppableId="droppable">
        //                         {(provided: any, snapshot: any) => (
        //                             <div
        //                                 {...provided.droppableProps}
        //                                 ref={provided.innerRef}
        //                             >
        //                                 <ConnectUser connectUserInfo={i} key={i.id}/>
        //                             </div>

        //                         )
        //                         }


        //                     </Droppable>
        //                 </DragDropContext>
        //             )
        //         })
        //     }
        // </div>

        //#endregion
    )

}