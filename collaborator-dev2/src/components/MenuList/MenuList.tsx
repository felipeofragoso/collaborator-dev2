import { Menu } from "antd";
import { HomeOutlined, AppstoreOutlined, AreaChartOutlined, PayCircleOutlined, SettingOutlined, BarsOutlined } from "@ant-design/icons";


const MenuList = ({darkTheme}) => {
    return (
        <Menu theme={darkTheme? "dark" : "light"} mode="inline" className="menu-bar">
            <Menu.Item key="home" icon={<HomeOutlined />}>
                Home
            </Menu.Item>
            <Menu.Item key="home2" icon={<AppstoreOutlined />}>
                home 2
            </Menu.Item>
            <Menu.SubMenu key="tasks" icon={<BarsOutlined />} title="Tasks">
            <Menu.Item key="task-1">Task 1</Menu.Item>
            <Menu.Item key="task-2">Task 2</Menu.Item>
            <Menu.SubMenu key="subtasks" title="Subtasks">
                <Menu.Item key="subtasks-1 ">Subtask 1</Menu.Item>
                <Menu.Item key="subtasks-2 ">Subtask 2</Menu.Item>
            </Menu.SubMenu>
            </Menu.SubMenu>
            <Menu.Item key="home3" icon={<AreaChartOutlined />}>
                Home 3
            </Menu.Item>
            <Menu.Item key="home4" icon={<PayCircleOutlined />}>
                Home 4
            </Menu.Item>
            <Menu.Item key="home5" icon={<SettingOutlined />}>
                Home 5
            </Menu.Item>
        </Menu>
    )
}

export default MenuList;