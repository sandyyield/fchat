import { Form, Input } from "antd"
import React from "react"

interface UserFormProps {
    labelLst: Array<string>
}

const UserForm: React.FC<UserFormProps> = ({ labelLst }) => {
    return (
        <div>
            <Form>
                {labelLst?.map((i, index) => (
                    <Form.Item
                        key={index}
                        label={i}
                        name={i}
                        rules={[{ required: true, message: `Please input your ${i}!` }]}
                        children={<Input />}
                    />
                ))}
            </Form>
        </div>
    )
}

const Container = () => {
    const labelLst = [
        'username',
        'password',
        'address',
        'e-mail',
        'brithday',
        'deathday1121'
    ];

    return (<UserForm labelLst={labelLst} />)
}

export default Container;




