import { Layout, Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { BugFilled } from '@ant-design/icons';
import './style.less'
import { NavLink, useNavigate } from 'react-router-dom';


const { Sider } = Layout;
export const Left = () => {

    const navigate = useNavigate();

    const handleClick = () => navigate('/');


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
                        <NavLink to="/page/debug/setting">AISettingPage</NavLink>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <NavLink to="/page/debug/sortcard">SortCard</NavLink>
                    </Menu.Item>
                    {/* <Menu.Item key="3">
                        <NavLink to="/page/debug/connectlst">ConnectLst</NavLink>
                    </Menu.Item> */}
                    <Menu.Item key="4">
                        <NavLink to="/page/debug/dustbin">Dustbin</NavLink>
                    </Menu.Item>

                </SubMenu>
                <SubMenu key="home" icon={<BugFilled />} title="Home" onTitleClick={handleClick}>
                    <Menu.Item key="1">
                        <NavLink to="/maincontent">MainContent</NavLink>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="component" icon={<BugFilled />} title="Component" onTitleClick={() => navigate("/component")} />
            </Menu>
        </Sider>
    )
}