import { Modal, ModalProps } from "antd"
import React, { useEffect, useRef, useState } from "react"
import type { FormInstance } from "antd";

/**
 * useModal
 * @param modalProps  ModalProps
 * @param Slot 插入的组件
 * @returns 
 */
export const useModal = (modalProps: ModalProps, Slot: React.FC<any>) => {
    const [visiable, setVisiable] = useState(false);

    useEffect(() => {
        console.log('use modal');
    }, [])


    useEffect(() => {
        console.log(`visiable value listener: ${visiable}`);
        
    }, [visiable])

    const open = () => setVisiable(true);
    const close = () => setVisiable(false);

    const FormModal = (slotProps: any) => {
        const onCancel = () => close();

        const ref = useRef<FormInstance>();

        // const ok = () => ref.current?.submit();

        return (
            <Modal
                onCancel={onCancel}
                visible={visiable}
                wrapClassName="modal-wrap"
                okText="提交"
                cancelButtonProps={{ shape: 'round' }}
                okButtonProps={{ shape: 'round' }}
                width={650}
                {...modalProps}
            >
                <Slot ref={ref} {...slotProps} afterSubmit={close} />
            </Modal>
        )
    }

    return {
        FormModal,
        open,
    }

}