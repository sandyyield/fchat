import { Button, Divider, Input, message } from "antd";
import React, { CSSProperties, useEffect, useState } from "react";
import { ArrowLeftOutlined } from '@ant-design/icons';
import './index.less';
import { ImgCropper } from "../ImgCropper";


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
    marginLeft: "24px",
    position: "relative",
    marginTop: "8px"
}

const OnBrowserStyle: CSSProperties = {
    textAlign: "center",
    position: "relative",
    marginTop: "24px"
}


export const SetScaleRect: React.FC<{}> = () => {

    const initState = { x: 0, y: 0, h: 480, w: 640 };
    const [rect, setRect] = useState<Rect>(initState);

    useEffect(() => {
        try {
            if (window.nativeSync) {
                // await window.native.hidePage();
                //初始化填充rect
                const rectJ = window.nativeSync.getRect();
                if (!rectJ) {
                    console.log('effect getrect is empty');
                    return () => { };
                }
                const rect: Rect = JSON.parse(rectJ);
                setRect(rect);
            }
        }
        catch (e) {
            console.log(e);
        }

        return () => { }
    }, [])


    //自动保存值
    useEffect(() => {
        
        if (window.nativeSync) {
            window.nativeSync.saveRect(JSON.stringify(rect))
            message.success('保存成功', 1)
        }
        
    }, [rect])


    /**
     * 保存
     */
    const handleSave = () => {
        try {
            if (window.nativeSync) {
                window.nativeSync.saveRect(JSON.stringify(rect))
                message.success('保存成功', 1)
            }
            else {
                message.error('保存异常，请使用收银端打开', 1);
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * 恢复默认值
     */
    const handleRestore = () => {
        try {
            setRect({ ...initState })
            message.success('重置成功', 1);
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * 返回 
     */
    const handleReturn = async () => {
        if (window.nativeSync) {
            await window.nativeSync.hidePage();
        }
        else {
            message.error('返回异常，请使用收银端打开', 1);
        }
        console.log('返回成功，已最小化到后台');
    }

    const handleSetW = (e: React.ChangeEvent<HTMLInputElement>) => {
        const w = Math.floor(+e.target.value);
        const h = Math.floor(w * 0.75);
        const r = { ...rect, w, h };
        setRect(r);
    }

    const handleSetH = (e: React.ChangeEvent<HTMLInputElement>) => {
        const h = Math.floor(+e.target.value);
        const w = Math.floor(h / 0.75);
        const r = { ...rect, w, h };
        setRect(r);
    }
    const handleSetX = (e: React.ChangeEvent<HTMLInputElement>) => {
        const r = { ...rect, x: +e.target.value }
        setRect(r);
    }
    const handleSetY = (e: React.ChangeEvent<HTMLInputElement>) => {
        const r = { ...rect, y: +e.target.value };
        setRect(r);
    }

    const onSave = (x:number,y:number,w:number,h:number) => {
        console.log('onSave',{x,y,w,h});
        setRect({x,y,w,h});
    } 

    const getBase64 = () =>{
        if(window.nativeSync){
            return window.nativeSync.getaiphoto();
        }
        return "";
    }

    return (
        <div>
            <div className="setscalerect">
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
                <Divider className="divider" />
                <div style={!window.native ? OnBrowserStyle : leftFormatStyle} >
                    <span className="configspan">
                        <span className="labelfont">
                            <label>起始坐标:</label>
                        </span>
                        <span className="inputspan">
                            <Input className="input" type="number" suffix="X" value={rect.x} onChange={handleSetX} size={size} style={{ marginLeft: "32px", width }} ></Input>
                            <Input className="input" type="number" suffix="Y" value={rect.y} onChange={handleSetY} size={size} style={{ marginLeft: "16px", width }}></Input>
                        </span>
                        <span style={{ margin: "32px" }}></span>
                        <span className="labelfont">
                            <label>切图大小:</label>
                        </span>
                        <span className="inputspan">
                            <Input className="input" type="number" suffix="宽" value={rect.w} onChange={handleSetW} size={size} style={{ marginLeft: "32px", width }}></Input>
                            <Input className="input" type="number" suffix="高" value={rect.h} onChange={handleSetH} size={size} style={{ marginLeft: "16px", width }}></Input>
                        </span>
                    </span>
                </div>
                
            </div>
            <ImgCropper src={getBase64()} onCroped={onSave}/>
        </div>
    )
}