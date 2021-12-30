import { Button, Divider, Input, InputNumber, message } from "antd";
import React, { ChangeEventHandler, CSSProperties, ReactElement, ReactNode, useEffect, useState } from "react";
import { CloseOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import './index.less';
import { VideoBox } from "../VideoBox";
import { ToastModal } from "../ToastModal";
import { useDebounced } from "../../utils";
import { debounce } from "../../utils/debounce";
import { random } from "nanoid";

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
        nativeSync: {
            setRect: (x: string, y: string, h: string, w: string) => void, //设置红框线
            getRect:() => string,
            hidePage:() => void,
            saveRect: (json: string) => void,
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
    marginLeft: "24px",
    position: "relative",
    marginTop: "8px"
}

const OnBrowserStyle: CSSProperties = {
    textAlign: "center",
    position: "relative",
    marginTop: "24px"
}


export const RectInfo: React.FC<RectInfoProps | null> = (props) => {

    const initState = { x: 0, y: 0, h: 480, w: 640 };

    const [rect, setRect] = useState<Rect>(initState);

    const debounceRect = useDebounced(rect, 1000);

    //modal state
    const [visible, setVisible] = useState(false);

    const [ModalMsg, setModalMsg] = useState<string[]>([]);
    const titleMsg = "请合理设置";
    const modalMsg1 = "x + 宽 < 640, y + 高 < 480";
    const modalMsg2 = "建议x , y 为正整数";


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

                //init modal msg 
                setModalMsg([`${titleMsg} : ${modalMsg1}' , ${modalMsg2}`]);
            }
        }
        catch (e) {
            console.log(e);

        }

        return () => { }
    }, [])


    useEffect(() => {
        // setUiRect(debounceRect);
        console.log('???')
        setUiRectSync(debounceRect);
    }, [debounceRect])

    // const SetRectLog = (v:Rect) =>{
    //     console.log(`set v ${Math.random()}`);
    //     setRect(v)
    // }


    // const debounceSetRect = (v: Rect, delay = 1000) => debounce(() => SetRectLog(v),delay)()//setRect(UseDebounced(v))

    const showModal = () => setVisible(true);
    const handleModalOk = () => setVisible(false);
    const handleModalCancel = () => setVisible(false);


    /**
     * 保存
     */
    const handleSave = () => {
        try {

            console.log(rect);
            
            // window.native.hello('123').then((res: string) => console.log(res)).then(() => message.success('保存成功', 1));
            //check 是否存在x+w > 640 & y + h > 480 的情况， 如果有 就弹个modal
            if (+rect.x + +rect.w > 640 || +rect.y + +rect.h > 480) {

                setModalMsg([modalMsg1]);
                if (!window.native) {
                    showModal();
                }
                else {
                    message.warning(` 建议:${modalMsg1}`)
                }
                return;
            }
            if (+rect.x < 0 || +rect.y < 0 || +rect.h < 0 || +rect.w < 0) {
                setModalMsg([modalMsg2]);
                if (!window.native) {
                    showModal();
                }
                else {
                    message.warning(` 建议:${modalMsg2}`)
                }
                return;
            }
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
            if (window.nativeSync) {
                window.nativeSync.saveRect(JSON.stringify(initState));
            }
            else {
                message.error('重置异常，请使用收银端打开', 1)
            }
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
        const w = Math.floor(+e.target.value * 100) / 100;
        const h = Math.floor(w * 0.75 * 100) / 100;
        const r = { ...rect, w, h };
        setRect(r);
        // setUiRect(r);
    }

    const handleSetH = (e: React.ChangeEvent<HTMLInputElement>) => {
        const h = Math.floor(+e.target.value * 100) / 100;
        const w = Math.floor(h / 0.75 * 100) / 100;
        const r = { ...rect, w, h };
        setRect(r);
        // setUiRect(r);
    }
    const handleSetX = (e: React.ChangeEvent<HTMLInputElement>) => {
        const r = { ...rect, x: +e.target.value }
        
        setRect(r);
        // setUiRect(r);
    }
    const handleSetY = (e: React.ChangeEvent<HTMLInputElement>) => {
        const r = { ...rect, y: +e.target.value };
        setRect(r);
        // setUiRect(r);
    }


    const setUiRect = (r: Rect) => {
        try {

            if (window.nativeSync) {
                window.nativeSync.setRect(r.x + '', r.y + '', r.h + '', r.w + '');
            }
        }
        catch (e) {
            console.log(e);

        }
    }

    //同步设置线条
    const setUiRectSync = (r: Rect) => {
        try {

            if (window.nativeSync) {
                window.nativeSync.setRect(r.x + '', r.y + '', r.h + '', r.w + '');
            }
        }
        catch (e) {
            console.log(e);

        }
    }


    return (
        <div>
            <ToastModal isModalVisible={visible} handleOk={handleModalOk} handleCancel={handleModalCancel} title="请检查输入的宽高" content={ModalMsg} />
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
                {/* {!window.native ? <VideoBox url="fileC:\Users\Administrator\Documents\WeChat Files\withoutthelove\FileStorage\Video\2021-12\3b9ac9cdc21f40ad86fb9c0f46a8ab5f.mp4"/> : <></>} */}
                {!window.native ?
                    <span className="video">

                        <VideoBox url="http://zhonglunnet041001.oss-cn-shanghai.aliyuncs.com/downloadfile/demo.mp4" />
                    </span>
                    : <></>}
            </div>
        </div>
    )
}