import { Button } from "antd"
import { forwardRef } from "react";
import { Count } from "../../Components/Count/indext"
// import { ImgCropper } from "../../Components/ImgCropper";
import { UserForm } from "../../Components/UserForm";
import { useModal } from "../../hooks/useModal"

export const ComponentLibrary = () => {

    //自定义useModal 好像有点问题
    // const ref = useRef<HTMLElement>(null)
    // const { FormModal, open } = useModal({}, forwardRef(UserForm));
    const { open } = useModal({ title: '新建用户' }, forwardRef(UserForm))




    return (
        <div>
            component exmple:<br />
            <Count />
            <Button onClick={open}>useModal-bug</Button>
            {/* <Button onClick={handleShowUseModal}>useModal</Button> */}
            <UserForm />
            {/* <ImgCropper src={""}  /> */}
        </div>
    )

}