import { CSSProperties, FC } from 'react';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import { ItemTypes } from '../../Types'

/**
 * box组件
 */

const b_style: CSSProperties = {
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    float: 'left',
}

export interface BoxProps {
    name: string
}

interface DropResult {
    allowedDropEffect: string
    dropEffect: string
    name: string
}

export const Box: FC<BoxProps> = ({ name }) => {

    const [{ opacity }, drag] = useDrag(
        () => ({
            type: ItemTypes.BOX,
            item: { name },
            end(item, monitor) {
                const dropResult = monitor.getDropResult() as DropResult
                if (item && dropResult) {
                    let alertMessage = ''
                    const isDropAllowed =
                        dropResult.allowedDropEffect === 'any' ||
                        dropResult.allowedDropEffect === dropResult.dropEffect

                    if (isDropAllowed) {
                        const isCopyAction = dropResult.dropEffect === 'copy'
                        const actionName = isCopyAction ? 'copied' : 'moved'
                        alertMessage = `You ${actionName} ${item.name} into ${dropResult.name}!`
                    } else {
                        alertMessage = `You cannot ${dropResult.dropEffect} an item into the ${dropResult.name}`
                    }
                    alert(alertMessage)
                }
            },
            collect: (monitor: DragSourceMonitor) => ({
                opacity: monitor.isDragging() ? 0.4 : 1,
            }),
        }),
        [name],
    )


    return (
        //这里拓展运算符在chrome49 报错是什么情况  Uncaught SyntaxError: Unexpected token ...
        <div ref={drag} style={{ ...b_style, opacity }}>
            {name}
        </div>
    )
}

// const sourceSpec = {
//     beginDrag(props: { id: any; }, monitor: any, component: any) {
//         // 返回需要注入的属性
//         return {
//             id: props.id
//         }
//     },
//     // endDrag(props, monitor, component){
//     //   // ..
//     // },
//     // canDrag(props, monitor){
//     //   // ..
//     // },
//     // isDragging(props, monitor){
//     //   // ..
//     // }
// }


// export default DragSource(ItemTypes.USERCARD, sourceSpec, (connect) => ({
//     connectDragSource: connect.dragSource(),
//     connectDragPreview: connect.dragPreview(),
// }))(Box);