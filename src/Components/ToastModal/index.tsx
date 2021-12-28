import { Modal } from "antd"
import { FC } from "react"

interface ToastModalProps {
    isModalVisible?: boolean,
    handleOk?: () => void,
    handleCancel?: () => void,
    title?: string,
    content?: string[];
}
export const ToastModal: FC<ToastModalProps> = ({ isModalVisible, handleOk, handleCancel, title, content }) => {
    return (
        <Modal title={title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} maskClosable={true} okText="确定" cancelText="取消">
            {content?.map((i, index) => {
                return (<p key={index}>{i}</p>)
            })}
        </Modal>
    )
}