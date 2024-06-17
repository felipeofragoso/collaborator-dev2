import React from "react";
import { Menu } from "antd";
import { HomeOutlined, PlusSquareOutlined, AreaChartOutlined, TeamOutlined, SettingOutlined, BarsOutlined } from "@ant-design/icons";


const MenuList = ({darkTheme}) => {
    return (
        <Menu theme={darkTheme? "dark" : "light"} mode="inline" className="menu-bar">
            <Menu.Item key="Pagina Inicial" icon={<HomeOutlined />}>
                Pagina Inicial
            </Menu.Item>
            <Menu.Item key="home2" icon={<PlusSquareOutlined />}>
                Novo Projeto
            </Menu.Item>
            <Menu.SubMenu key="tasks" icon={<BarsOutlined />} title="Cadastro">
            <Menu.Item key="task-1">Task 1</Menu.Item>
            <Menu.Item key="task-2">Task 2</Menu.Item>
            <Menu.SubMenu key="subtasks" title="Subtasks">
                <Menu.Item key="subtasks-1 ">Subtask 1</Menu.Item>
                <Menu.Item key="subtasks-2 ">Subtask 2</Menu.Item>
            </Menu.SubMenu>
            </Menu.SubMenu>
            <Menu.Item key="home3" icon={<AreaChartOutlined />}>
                Nova Tarefa
            </Menu.Item>
            <Menu.Item key="home4" icon={<SettingOutlined />}>
                Configurações
            </Menu.Item>
            <Menu.Item key="home5" icon={<TeamOutlined />}>
                Sobre
            </Menu.Item>
        </Menu>
    )
}

export default MenuList;