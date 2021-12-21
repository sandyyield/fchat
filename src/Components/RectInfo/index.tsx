import { Button, Divider, InputNumber, message } from "antd";
import React, { CSSProperties, ReactElement, useState } from "react";
import { debounce } from "../../utils/debounce";

interface RectInfoProps {
    posx: number,
    posy: number,
    weight: number,
    heigth: number,
}

const style: CSSProperties = {
    // display:"flex",
    position: "relative",
    width: '50%',
    height: '500px',
    backgroundColor: "white",
    textAlign: "center"
}

const itemStyle: CSSProperties = {
    position: "absolute", textAlign: "center", left: "40%", top: "10rem"
}

const posStyle: CSSProperties = {
    // position: "relative",
    // width: "200px",
    // left: "0px",
    // top: '30%',
    // marginLeft: 'auto',
    // marginRight: 'auto',
    // backgroundColor: "gray"

}

declare global {
    interface Window {
        native: {
            hello: (str: string) => Promise<string>
        }
    }
}

export const RectInfo: React.FC<RectInfoProps> = (props) => {

    // const [rect, setRect] = useState<RectInfoProps | null>(props)

    const [x, setX] = useState(props.posx);
    const [y, setY] = useState(props.posy);
    const [h, setH] = useState(props.heigth);
    const [w, setW] = useState(props.weight);


    const size = "large";

    const handleClick = () => {
        // window.native.hello('123').then((res: string) => console.log(res)).then(() => message.success('保存成功', 1));
        message.success('保存成功', 1);

    }


    const handleRestore = () => {
        message.success('恢复成功', 1)
    }

    const leftFormatStyle: CSSProperties = {
        textAlign: "left",
        marginLeft: "64px",
        position: "relative",
        marginTop: "24px"


    }
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <h1 style={{ ...leftFormatStyle, marginTop: "64px", marginBottom: "0px" }}>AI图片设置</h1>
            <Divider />
            {/* 设置按钮 */}
            <div style={{ ...leftFormatStyle, marginTop: "0px" }}>
                <span>
                    <Button type="default" size={size} onClick={handleRestore}>重置</Button>
                </span>
                <span style={{ ...leftFormatStyle, marginLeft: "16px" }}>
                    <Button type="primary" size={size} onClick={handleClick}>保存</Button>
                </span>
            </div>

            <div style={leftFormatStyle} >
                <span>
                    <label>起始坐标:</label>
                    <InputNumber defaultValue={x} onChange={setX} size={size} style={{ marginLeft: "32px", }}></InputNumber>
                    <InputNumber defaultValue={y} onChange={setY} size={size} style={{ marginLeft: "16px", }}></InputNumber>
                </span>
                <span style={{ marginLeft: "64px", }}>
                    <label>切图大小:</label>
                    <InputNumber defaultValue={w} onChange={setW} size={size} style={{ marginLeft: "32px", }}></InputNumber>
                    <InputNumber defaultValue={h} onChange={setH} size={size} style={{ marginLeft: "16px", }}></InputNumber>
                </span>
            </div>
        </div>
    )
}