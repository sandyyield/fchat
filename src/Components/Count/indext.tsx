import { Button } from "antd";
import { Fragment, useState } from "react"

export const Count = () => {

    let [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(count++);
        setCount(count++);  //这里相同对象render事件会合并  后一个覆盖前一个
    }


    return (
        <Fragment>
            <Button onClick={handleClick}>+1</Button>
            <p>{count}</p>
        </Fragment>
    )
}