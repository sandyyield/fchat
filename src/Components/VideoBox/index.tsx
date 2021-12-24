import { Button } from 'antd';
import flv from 'flv.js';
import React, { CSSProperties, useRef, RefObject, useEffect, FC, Fragment } from 'react';
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
        isLive,
        hasAudio,
        hasVideo,
        showControls,
        enableStashBuffer,
        stashInitialSize,
        isMuted,
        url,
    } = props;

    // const videoRef = useRef() as RefObject<HTMLVideoElement>;
    const videoRef = useRef<HTMLVideoElement>(null);

    /**
     * 加载播放器
     */
    // useEffect(() => {
    //     const player = flv.createPlayer(
    //         {
    //             type: "flv",
    //             isLive: false,
    //             hasAudio: hasAudio,
    //             hasVideo: hasVideo,
    //             url: url,
    //             ...props.flvMediaSourceOptions,
    //         },
    //         {
    //             stashInitialSize: stashInitialSize,
    //             enableStashBuffer: enableStashBuffer,
    //             ...props.flvConfig,
    //         }
    //     );

    //     player.attachMediaElement(videoRef.current!);
    //     player.load();
    //     player.play();
    //     // player.on("error", (err) => {
    //     //   props.errorCallback?.(err);
    //     // });
    // }, [null]);

    useEffect(() => {
        if (flv.isSupported()) {
            const videoElement = videoRef.current;
            try {
                const flvPlayer = flv.createPlayer({
                    isLive: true,
                    type: 'mp4',
                    url: 'http://mirror.aarnet.edu.au/pub/TED-talks/911Mothers_2010W-480p.mp4',

                });
                if (videoElement != null) {
                    flvPlayer.attachMediaElement(videoElement);
                }
                flvPlayer.load();
                flvPlayer.play();
            } catch (e) {
                console.error(e);
            }
        }


        return () => {

        }
    }, [])

    let _videoStream: MediaStream | null = null;

    /**
     * 浏览器是否支持
     */
    const browserIsSuppert = () => "mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices ? true : false;

    const handleOpenCreama = async () => {
        const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
        console.log(videoStream);
        _videoStream = videoStream;
        // videoStream.
    }

    const style: CSSProperties = {
        width: "100px",
        height: "200px"
    };

    return (
        // <div className='videomain'>
        //     <span className='videospan'>
        <Fragment>
            {browserIsSuppert() ? <Button onClick={handleOpenCreama}>打开视频流</Button> : '当前浏览器不支持此功能'}
            <video ref={videoRef} controls={true} style={{ height, width }}></video>
            {/* <video controls={false} ref={videoRef} style={style} src={_videoStream}></video> */}
            {/* <video
                controls={showControls}
                muted={isMuted}
                ref={videoRef}
                style={{ height, width }}
                {...props.videoProps}
            /> */}
        </Fragment>
        //     </span>
        // </div>

    )
}