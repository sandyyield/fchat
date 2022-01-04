import type { ModalProps } from 'antd';
import { Modal } from 'antd';
import type { FormInstance } from 'antd/es/form';
import React, { useState } from 'react';

const useFormModal = (modalProps: ModalProps, Slot: React.FC<any>) => {
    const [visiable, setVisiable] = useState(false);
    const open = () => {
        setVisiable(true);
    };
    const close = () => {
        setVisiable(false);
    };
    const FormModal = (slotProps: any) => {
        const onCancel = () => {
            close();
        };

        const ref = React.useRef<FormInstance>();
        
        const ok = () => {
            ref.current?.submit()
        };
        return (
            <Modal
                onCancel={onCancel}
                onOk={ok}
                visible={visiable}
                wrapClassName="modal-wrap"
                okText="保存"
                cancelText="取消"
                // cancelButtonProps={{ shape: 'round' }}
                // okButtonProps={{ shape: 'round' }}
                width={600}
                {...modalProps}
            >
                <Slot ref={ref} {...slotProps} afterSubmit={close} />
            </Modal>
        );
    };

    return {
        FormModal,
        open,
    };
};
export default useFormModal;
