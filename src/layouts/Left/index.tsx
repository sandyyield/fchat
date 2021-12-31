import { Layout, Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { BugFilled, AppstoreFilled, PieChartFilled } from '@ant-design/icons';
import './style.less'
import { NavLink } from 'react-router-dom';


const { Sider } = Layout;
export const Left = () => {

    return (
        <Sider width={200} className='sider'>
            {/* 增加一些菜单 */}
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
            >
                <SubMenu key="debug" icon={<BugFilled />} title="Debug">
                    <Menu.Item key="1">
                        <NavLink to="/page/debug/SetScaleRect">SetScaleRect</NavLink>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <NavLink to="/page/debug/sortcard">SortCard</NavLink>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <NavLink to="/page/debug/setting">AISettingPage</NavLink>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <NavLink to="/page/debug/dustbin">Dustbin</NavLink>
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key="home" icon={<PieChartFilled />}>
                    <NavLink to="/">MainContent</NavLink>
                </Menu.Item>
                <Menu.Item key="component" icon={<AppstoreFilled />} title="Component" >
                    <NavLink to="/component">Component</NavLink>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}