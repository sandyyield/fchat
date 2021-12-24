import { Button } from 'antd';
import FlvJs from 'flv.js';
import { CSSProperties, useRef,RefObject, useEffect } from 'react';
import './index.less'

export const VideoBox = () => {

    const videoRef = useRef() as RefObject<HTMLVideoElement>;

    /**
     * 加载播放器
     */
    useEffect(() => {
        // const flvPlayer = FlvJs.createPlayer('')
        return () => {}
        
    }, [])

    let _videoStream :MediaStream | null = null;

    /**
     * 浏览器是否支持
     */
    const browserIsSuppert = () => "mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices ? true : false;

    const handleOpenCreama = async () =>{
        const videoStream = await navigator.mediaDevices.getUserMedia({video:true});
        console.log(videoStream);
        _videoStream = videoStream;
        // videoStream.
    }
    
    const style:CSSProperties ={
        width:"640px",
        height:"480px"
    };

    return (
        <div className='videomain'>
            <span className='videospan'>
                {browserIsSuppert() ? <Button onClick={handleOpenCreama}>打开视频流</Button>:'当前浏览器不支持此功能'}
                {/* <video controls={false} ref={videoRef} style={style} src={_videoStream}></video> */}
            </span>
        </div>

    )
}