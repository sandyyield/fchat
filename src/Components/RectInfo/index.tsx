import { Button, Divider, Input, InputNumber, message } from "antd";
import React, { ChangeEventHandler, CSSProperties, ReactElement, ReactNode, useEffect, useState } from "react";
import { CloseOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import './index.less';
import { VideoBox } from "../VideoBox";

interface RectInfoProps {
    posx: number,
    posy: number,
    weight: number,
    heigth: number,
}



declare global {
    interface Window {
        native: {
            hello: (str: string) => Promise<string>,
            saveRect: (json: string) => Promise<void>,
            hidePage: () => Promise<void>,
            getRect: () => Promise<string>, //返回rectjson
            setRect: (x: string, y: string, h: string, w: string) => Promise<void>, //设置红框线
        }
    }
}

interface Rect {
    x: number,
    y: number,
    w: number,
    h: number,
}

const size = "large";
const width = "120px"
const leftFormatStyle: CSSProperties = {
    textAlign: "left",
    marginLeft: "64px",
    position: "relative",
    marginTop: "24px"
}

const OnBrowserStyle:CSSProperties ={
    textAlign: "center",
    position: "relative",
    marginTop: "24px"
}


export const RectInfo: React.FC<RectInfoProps | null> = (props) => {

    const initState = { x: 0, y: 0, h: 600, w: 800 };

    const [rect, setRect] = useState<Rect>(initState);


    useEffect(() => {
        const fn = async () => {
            if (window.native) {
                // await window.native.hidePage();
                //初始化填充rect
                const rectJ = await window.native.getRect();
                const rect: Rect = JSON.parse(rectJ);
                setRect(rect);
            }
        }
        fn.call(this);
        return () => { }
    }, [])

    /**
     * 保存
     */
    const handleSave = async () => {
        // window.native.hello('123').then((res: string) => console.log(res)).then(() => message.success('保存成功', 1));
        if (window.native) {
            await window.native.saveRect(JSON.stringify(rect))
            message.success('保存成功', 1)
        }
        else {
            message.error('保存异常，请使用收银端打开', 1);
        }
    }

    /**
     * 恢复默认值
     */
    const handleRestore = async () => {
        setRect({ ...initState })
        if (window.native) {
            await window.native.saveRect(JSON.stringify(initState));
        }
        else {
            message.error('重置异常，请使用收银端打开', 1)
        }
        message.success('重置成功', 1);
    }

    /**
     * 返回 
     */
    const handleReturn = async () => {
        if (window.native) {
            await window.native.hidePage();
        }
        else {
            message.error('返回异常，请使用收银端打开', 1);
        }
        console.log('返回成功，已最小化到后台');
    }

    const handleSetW = (e: React.ChangeEvent<HTMLInputElement>) => {
        const w = +e.target.value;
        const h = w * 0.75;
        const r = { ...rect, w, h };
        setRect(r);
        setUiRect(r);
    }

    const handleSetH = (e: React.ChangeEvent<HTMLInputElement>) => {
        const h = +e.target.value;
        const w = h / 0.75;
        const r = { ...rect, w, h };
        setRect(r);
        setUiRect(r);
    }
    const handleSetX = (e: React.ChangeEvent<HTMLInputElement>) => {
        const r = { ...rect, x: +e.target.value }
        setRect(r);
        setUiRect(r);
    }
    const handleSetY = (e: React.ChangeEvent<HTMLInputElement>) => {
        const r = { ...rect, y: +e.target.value };
        setRect(r)
        setUiRect(r);
    }

    const setUiRect = async (r: Rect) => {
        console.log(r);

        if (window.native) {
            await window.native.setRect(r.x + '', r.y + '', r.h + '', r.w + '');
        }
    }




    return (
        <div>
            <div className="main">
                <div className="top">
                    <span className="topleft">
                        <Button className="returnfont" onClick={handleReturn} icon={<ArrowLeftOutlined />} size={size} type="link" > 返回</Button>
                    </span>
                    <span className="titlefont">
                        <label >AI图片设置</label>
                    </span>
                    <span className="topright">
                        <span style={{ marginRight: "16px" }}>
                            <Button className="resetfont" type="link" size={size} onClick={handleRestore}>重置默认值</Button>
                        </span>
                        <span style={{ marginLeft: "16px" }}>
                            <Button className="savefont" type="link" size={size} onClick={handleSave}>保存</Button>
                        </span>
                    </span>
                </div>
                <Divider />
                <div style={!window.native ? OnBrowserStyle: leftFormatStyle} >
                    <span className="configspan">
                        <span className="labelfont">
                            <label>起始坐标:</label>
                        </span>
                        <span className="inputspan">
                            <Input className="input" type="number" suffix="X" value={rect.x} onChange={handleSetX} size={size} style={{ marginLeft: "32px", width }}></Input>
                            <Input className="input" type="number" suffix="Y" value={rect.y} onChange={handleSetY} size={size} style={{ marginLeft: "16px", width }}></Input>
                        </span>
                        <span style={{ margin: "32px"}}></span>
                        <span className="labelfont">
                            <label>切图大小:</label>
                        </span>
                        <span className="inputspan">
                            <Input className="input" type="number" suffix="宽" value={rect.w} onChange={handleSetW} size={size} style={{ marginLeft: "32px", width }}></Input>
                            <Input className="input" type="number" suffix="高" value={rect.h} onChange={handleSetH} size={size} style={{ marginLeft: "16px", width }}></Input>
                        </span>
                    </span>
                </div>
                {/* {!window.native ? <VideoBox url="fileC:\Users\Administrator\Documents\WeChat Files\withoutthelove\FileStorage\Video\2021-12\3b9ac9cdc21f40ad86fb9c0f46a8ab5f.mp4"/> : <></>} */}
                {!window.native ? <VideoBox url="http://zhonglunnet041001.oss-cn-shanghai.aliyuncs.com/downloadfile/demo.mp4"/> : <></>}
            </div>
        </div>
    )
}