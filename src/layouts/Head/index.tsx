import { Button, Menu } from "antd";
import { Header } from "antd/lib/layout/layout"

export const Head = () => {
    return (
        <div className="head">
            <Header style={{minWidth:"500px"}}>
                <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </Header>
        </div>
    )
};