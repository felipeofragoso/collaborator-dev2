import React, { useState } from "react";
import { Menu } from "antd";
import { HomeOutlined, PlusSquareOutlined, AreaChartOutlined, TeamOutlined, EditOutlined, SettingOutlined, BarsOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import BasicModal from "../BasicModal/BasicModal";
import "./Menu.css" 

const MenuList = ({ darkTheme }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleMenuClick = ({ key }) => {
        if (key === "cadastro") {
            setModalOpen(true);
        }
    };

    return (
        <>
            <Menu 
                theme={darkTheme ? "dark" : "light"} 
                mode="inline" 
                className="menu-bar" 
                onClick={handleMenuClick}
            >
                <Menu.Item key="paginaInicial" icon={<HomeOutlined />}>
                    <NavLink to="/" activeClassName="active-link">Página Inicial</NavLink>
                </Menu.Item>
                <Menu.Item key="novoProjeto" icon={<PlusSquareOutlined />}>
                    Novo Projeto
                </Menu.Item>
                <Menu.Item key="novaTarefa" icon={<BarsOutlined />}>
                    Nova Tarefa
                </Menu.Item>
                <Menu.Item key="relatorios" icon={<AreaChartOutlined />}>
                    Relatórios
                </Menu.Item>
                <Menu.Item key="cadastro" icon={<EditOutlined />}>
                    Cadastro
                </Menu.Item>
                <Menu.Item key="configuracoes" icon={<SettingOutlined />}>
                    Configurações
                </Menu.Item>
                <Menu.Item key="sobre" icon={<TeamOutlined />}>
                    Sobre
                </Menu.Item>
            </Menu>
            <BasicModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </>
    );
};

export default MenuList;
