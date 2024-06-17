import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Logo from "./components/Logo/Logo";
import MenuList from "./components/MenuList/MenuList";
import Home from "./pages/Home/Home";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Registrations from "./pages/Registrations/Registrations";
import ToggleThemeButton from './components/ToggleThemeButton';
import { Layout, Button } from "antd";

import "./App.css";


const { Content, Header, Sider, Footer } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsed={collapsed}
          collapsible
          trigger={null}
          theme={darkTheme ? "dark" : "light"}
          className='sidebar'
        >
          <Logo />
          <MenuList darkTheme={darkTheme} />
          <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0, background: darkTheme ? '#001529' : '#2D939C' }}>
            <Button
              type="text"
              className='toggle'
              onClick={() => setCollapsed(!collapsed)}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            />
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<PageNotFound />} />
              <Route path="/Registrations" element={<Registrations />} />
            </Routes>
          </Content>
          <Footer style={{ textAlign: 'center', background: darkTheme ? '#001529' : '#2D939C', color: darkTheme ? '#fff' : '#000' }}>
            Neki ©2024 Criado por Residentes
          </Footer>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
