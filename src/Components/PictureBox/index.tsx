import { useRef} from 'react';
import { Cropper } from 'react-cropper';

export const PictureBox = () => {

    const cropperRef = useRef<HTMLImageElement>(null);
    const onCrop = () => {
        const imageElement: any = cropperRef?.current;
        const cropper: any = imageElement?.cropper;
        console.log(cropper.getCroppedCanvas().toDataURL());
    };

    return (
        <Cropper
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?1245"
            style={{ height: 400, width: "100%" }}
            // Cropper.js options
            initialAspectRatio={16 / 9}
            guides={false}
            crop={onCrop}
            ref={cropperRef}
        />
    );

    // return (
    // <Space size={12}>
    //     <Image
    //         width={640}
    //         height={480}
    //         src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?${random}`}
    //     // placeholder={
    //     //     <Image
    //     //         preview={false}
    //     //         src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
    //     //         width={200}
    //     //     />
    //     // }
    //     />
    //     <Button
    //         type="primary"
    //         onClick={() => {
    //             setRandom(Date.now());
    //         }}
    //         style={{ visibility: "hidden" }}
    //     >
    //         Reload
    //     </Button>
    // </Space>
    // )
}