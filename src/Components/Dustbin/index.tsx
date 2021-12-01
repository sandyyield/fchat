import { CSSProperties, FC } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../Types'

/**
 * Dustbin 回收站组件
 */

const style: CSSProperties = {
  height: '12rem',
  width: '12rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
}

// export interface DustbinProps {
//   allowedDropEffect: string
// }

function selectBackgroundColor(isActive: boolean, canDrop: boolean) {
  if (isActive) {
    return 'darkgreen'
  } else if (canDrop) {
    return 'darkkhaki'
  } else {
    return '#222'
  }
}

const Dustbin: FC = () => {
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.Card,
      drop: () => ({
        name: `Dustbin`,
        // allowedDropEffect,
      }),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    // [allowedDropEffect],
    []
  )

  const isActive = canDrop && isOver
  const backgroundColor = selectBackgroundColor(isActive, canDrop)

  return (
    <div ref={drop} style={{ ...style, backgroundColor }}>
      {`Works with  drop effect`}
      <br />
      <br />
      {isActive ? 'Release to drop' : 'Drag a box here'}
    </div>
  )
}


export default Dustbin;

