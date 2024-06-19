import React, { useState } from "react";
import { Menu } from "antd";
import { HomeOutlined, PlusSquareOutlined, AreaChartOutlined, TeamOutlined, EditOutlined, SettingOutlined, BarsOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import BasicModal from "../BasicModal/BasicModal";
import "./Menu.css" 
import { useTranslation } from 'react-i18next';

const MenuList = ({ darkTheme }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const { t } = useTranslation();

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
                    <NavLink to="/" activeClassName="active-link">{t("Página Inicial")}</NavLink>
                </Menu.Item>
                <Menu.Item key="novoProjeto" icon={<PlusSquareOutlined />}>
                  {t("Novo Projeto")}
                </Menu.Item>
                <Menu.Item key="novaTarefa" icon={<BarsOutlined />}>
                {t("Nova Tarefa")} 
                </Menu.Item>
                <Menu.Item key="relatorios" icon={<AreaChartOutlined />}>
                {t("Relatórios")} 
                </Menu.Item>
                <Menu.Item key="cadastro" icon={<EditOutlined />}>
                {t("Cadastro")}
                </Menu.Item>
                <Menu.Item key="configuracoes" icon={<SettingOutlined />}>
                {t("Configurações")} 
                </Menu.Item>
            </Menu>
            <BasicModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </>
    );
};

export default MenuList;
