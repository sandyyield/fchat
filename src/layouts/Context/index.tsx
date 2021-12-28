import { Breadcrumb } from "antd"
import { Content } from "antd/lib/layout/layout"
import { CSSProperties,Fragment } from "react"



const contentStyle: CSSProperties = {
    padding: "24px",
    margin: 0,
    minHeight: "280px"
}
export const Context = () => {

    return (
        <Content style={contentStyle}>
            {/* 面包屑 */}
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <div className="content" >
                Content
            </div>
        </Content>
    )
}