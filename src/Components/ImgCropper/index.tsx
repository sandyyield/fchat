import React, { useEffect, useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

type Base64 = string;

interface ImgCropperProps {
    src: Base64,
    onCroped?: (x: number, y: number, w: number, h: number) => void;
}



export const ImgCropper: React.FC<ImgCropperProps> = (props) => {
    
    const [img, setImg] = useState("https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png")

    useEffect(() => {
        const { src } = props;
        console.log('props src', src)
        if(src){
            setImg(src)
        }
    }, [])

    const cropperRef = useRef<HTMLImageElement>(null);
    const onCrop = () => {
        // const imageElement: any = cropperRef?.current;
        // const cropper: any = imageElement?.cropper;
    };

    const onCropEnd = () => {
        const imageElement: any = cropperRef?.current;
        const cropper: any = imageElement?.cropper;
        // console.log(cropper.getData(true));
        const { x, y, width, height } = cropper.getData(true)
        console.log(`${x},${y},${width},${height}`);

        const { onCroped } = props;
        if (onCroped) {
            onCroped(+x, +y, width, height);
        }
    }


    return (
        <Cropper
            src={img}//
            // src="file:///G:/prictureexmple/1.png"
            style={{ height: 600, width: "100%" }}
            viewMode={1}
            // Cropper.js options
            initialAspectRatio={16 / 9}
            guides={false}
            crop={onCrop}
            ref={cropperRef}
            cropend={onCropEnd}
            aspectRatio={4 / 3} //固定宽高比
            zoomable={false}
        />
    );
};