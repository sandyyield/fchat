import { Breadcrumb } from "antd"
import { Content } from "antd/lib/layout/layout"
import { CSSProperties, Fragment } from "react"
import {
    Routes,
    Route,
} from "react-router-dom"
import { SetScaleRect } from "../../Components/SetScaleRect"
import { SortCardContainer } from "../../Components/SortCardContainer"
import { ComponentLibrary } from "../../pages/ComponentLibrary"
import { DustbinBox } from "../../pages/DustbinBox"
import { Home } from "../../pages/Home"
import { Setting } from "../../pages/Setting"
// import { Swi } from "react-router-dom"



const contentStyle: CSSProperties = {
    padding: "24px",
    margin: 0,
    minHeight: "280px",
    // backgroundColor: "blue"

}
export const Context = () => {
    return (
        <Fragment>
            {/* 面包屑 */}
            <Breadcrumb style={{ margin: '12px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={contentStyle}>
                <div style={{ backgroundColor: "#fff", minHeight: "100%" }} >
                    <Routes>
                        <Route path="/" element={<p>404</p>}></Route>
                        <Route path="/page/debug/setting" element={<Setting />} />
                        <Route path="/page/debug/SetScaleRect" element={<SetScaleRect />} />
                        <Route path="/page/debug/sortcard" element={<SortCardContainer />} />
                        <Route path="/page/debug/dustbin" element={<DustbinBox />} />

                        <Route path="/page/home/" element={<Home />}></Route>
                        <Route path="/component" element={<ComponentLibrary />}></Route>
                    </Routes>
                </div>
            </Content>
        </Fragment>
    )
}