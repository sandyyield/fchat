import flv from 'flv.js';
import React, { useRef, useEffect, FC, Fragment } from 'react';
import './index.less'


export interface ReactFlvPlayerProps {
    isLive?: boolean;
    hasAudio?: boolean;
    hasVideo?: boolean;
    showControls?: boolean;
    enableStashBuffer?: boolean;
    stashInitialSize?: number | undefined;
    height?: number;
    width?: number;
    isMuted?: false;
    url: string;
    videoProps?: React.DetailedHTMLProps<
        React.VideoHTMLAttributes<HTMLVideoElement>,
        HTMLVideoElement
    >;
    flvMediaSourceOptions?: flv.MediaDataSource;
    flvConfig?: flv.Config;
    // errorCallback?: (err: any) => void;
}

export const VideoBox: FC<ReactFlvPlayerProps> = (props) => {

    const {
        height,
        width,
        // isLive,
        // hasAudio,
        // hasVideo,
        // showControls,
        // enableStashBuffer,
        // stashInitialSize,
        // isMuted,
        url,
    } = props;

    // const videoRef = useRef() as RefObject<HTMLVideoElement>;
    const videoRef = useRef<HTMLVideoElement>(null);

    let flvPlayer: flv.Player | null = null;

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        flvPlayer = flvPlayer ?? flv.createPlayer({
            isLive: true,
            type: 'mp4',
            url,
        });
        if (flv.isSupported()) {
            const videoElement = videoRef.current;
            try {
                // const flvPlayer = flv.createPlayer({
                //     isLive: false,
                //     type: 'mp4',
                //     url: 'http://zhonglunnet041001.oss-cn-shanghai.aliyuncs.com/downloadfile/demo.mp4',
                // });
                if (videoElement != null) {
                    flvPlayer?.attachMediaElement(videoElement);
                }
                flvPlayer?.load();
                console.log('init player');
                console.log(flvPlayer);

                if(browserIsSuppert()){
                    flvPlayer?.play();
                }
            } catch (e) {
                console.error(e);
            }
        }
        return () => {
            // flvPlayer?.pause()
            flvPlayer?.unload();
        }
    }, [])

    
    /**
     * 浏览器是否支持
     */
    const browserIsSuppert = () => "mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices ? true : false;
    
    // let _videoStream: MediaStream | null = null;
    // const handleOpenCreama = async () => {
    //     const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
    //     console.log(videoStream);
    //     _videoStream = videoStream;
    //     // videoStream.
    // }

  

    return (
        <Fragment>
            <span style={{ height, width, backgroundColor: "black" }}>
                {/* {browserIsSuppert() ? <Button onClick={handleOpenCreama}>打开视频流</Button> : '当前浏览器不支持此功能'} */}
                <span >

                    <video ref={videoRef} controls={false} muted={true} style={{ width: "640px", height: "480px", backgroundColor: "blue" }}></video>
                </span>
            </span>
        </Fragment>
    )
}