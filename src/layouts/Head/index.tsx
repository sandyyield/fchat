import { Menu } from "antd";
import { Header } from "antd/lib/layout/layout"

export const Head = () => {
    return (
        <Header className="header">
            <div className="logo">
                <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </div>
        </Header>
    )
};