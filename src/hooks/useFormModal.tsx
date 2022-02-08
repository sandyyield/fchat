import type { ModalProps } from 'antd';
import { Modal } from 'antd';
import type { FormInstance } from 'antd/es/form';
import React, { forwardRef, useEffect, useRef, useState } from 'react';




/**
 * TOFIX... 这里还有一个关闭动效消失的bug没有处理  需要处理一下
 */
type ModalRefType<T> = { open: (initProps?: Partial<T>) => void; close: () => void } | null;

//这里类型约束还不太简洁
// type useFormModalType = <T>(modalProps: Omit<Partial<ModalProps>, 'confirmLoading' | 'visible'>, Slot: React.FC<T>) => { FormModal: React.ElementType, open: () => void }
// const useFormModal: useFormModalType = (modalProps, Slot) => {  

const useFormModal = function <T>(modalProps: Omit<Partial<ModalProps>, 'confirmLoading' | 'visible'>, Slot: React.ComponentType<T>) {

    // const modalRef = useRef<ModalRefType<T>>();

    //观察下是否每次都刷新
    useEffect(() => {
        console.log('is init');
    }, [])

    const [loading, setLoading] = useState(false);
    const [visiable, setVisiable] = useState(false);
    const open = () => {
        setVisiable(true);
    };
    const close = () => {
        setLoading(false);
        setVisiable(false);
    };


    const FormModal = forwardRef<ModalRefType<T>, T>((slotProps: T, mRef) => {
        // const FormModal = forwardRef<ModalRefType<T>,T>((slotProps, mRef) => {



        const onCancel = () => {
            close();
        };

        const ref = useRef<FormInstance>();

        const ok = () => {
            console.log('submit');

            ref.current?.submit()
            setLoading(true)
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
                confirmLoading={loading}
                {...modalProps}
            >
                <Slot ref={ref} {...slotProps} afterSubmit={close} beforeSubmit={() => setLoading(true)} />
            </Modal>
        );
    });

    return {
        FormModal,//: useCallback((props) => (<FormModal ref={modalRef} {...props} />), []),
        open,
    };
};
export default useFormModal;
