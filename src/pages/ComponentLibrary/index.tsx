import { Button } from "antd"
import { forwardRef } from "react";
import { Count } from "../../Components/Count/indext"
// import { ImgCropper } from "../../Components/ImgCropper";
import UserForm from "../../Components/UserForm";
import useFormModal from "../../hooks/useFormModal";
import ES6Exmple from "../../Components/ES6Exmple";

export const ComponentLibrary = () => {


    const { open, FormModal: UserModal } = useFormModal({ title: '新建用户' }, forwardRef(UserForm));

    const { open: open2, FormModal: ES6ExmpleModal } = useFormModal({ title: 'ES6+语法糖尝试板' }, forwardRef(ES6Exmple));

    return (
        <div>
            component exmple:<br />
            <Count />
            {/* use modal demo */}
            <Button onClick={open}>useModal</Button>
            <UserModal />

            <Button onClick={open2}>ES6Exmple</Button>
            <ES6ExmpleModal />


            
        </div>
    )

}