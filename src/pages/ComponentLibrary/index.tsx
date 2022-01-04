import { Button } from "antd"
import { forwardRef } from "react";
import { Count } from "../../Components/Count/indext"
// import { ImgCropper } from "../../Components/ImgCropper";
import { UserForm } from "../../Components/UserForm";
import useFormModal from "../../hooks/useFormModal";

export const ComponentLibrary = () => {

    const { open, FormModal: UserModal } = useFormModal({ title: '新建用户' }, forwardRef(UserForm))


    return (
        <div>
            component exmple:<br />
            <Count />
            {/* use modal demo */}
            <Button onClick={open}>useModal</Button>
            <UserModal />

            {/* <ImgCropper src={""}  /> */}
        </div>
    )

}