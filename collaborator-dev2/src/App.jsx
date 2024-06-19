import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Logo from './components/Logo/Logo';
import MenuList from './components/MenuList/MenuList';
import Alm from './pages/Alm/Alm';
import EventReason from './pages/EventReason/EventReason';
import Messages from './pages/Messages/Messages';
import Home from './pages/Home/Home';
import Function from './pages/Function/Function';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Registrations from './pages/Registrations/Registrations';
import ToggleThemeButton from './components/ToggleThemeButton';
import { Layout, Button } from 'antd';

import "./App.css";
import Accessibility from "./components/accessibility/accessibility";

const { Content, Header, Sider, Footer } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh', overflow: 'hidden' }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          collapsed={collapsed}
          collapsible
          onCollapse={onCollapse}
          trigger={null}
          theme={darkTheme ? 'dark' : 'light'}
          className="sidebar"
        >
          <Logo />
          <MenuList darkTheme={darkTheme} />
          <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
              background: darkTheme ? '#001529' : '#2D939C', color: darkTheme ? '#fff' : '#000' }}>
               {/* Removendo degrade
               background: darkTheme
                 ? 'linear-gradient(to bottom, #2d939c, #68C7CF)'
                 : 'linear-gradient(to bottom, #2d939c, #68C7CF)',
               color: darkTheme ? '#fff' : '#000',
            }}
          > */}
            <Button
              type="text"
              className="toggle"
              onClick={() => setCollapsed(!collapsed)}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            />
          </Header>
          <Content
            style={{
              margin: '0', //margem removida para ajustar com Header e Footer
              padding: 110,
              minHeight: 360,
              background: darkTheme ? '#001529' : '#fff',
              overflow: 'auto', // Overflow: auto para permitir rolagem interna caso necessário
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Alm" element={<Alm />} />
              <Route path="/EventReason" element={<EventReason />} />
              <Route path="/Function" element={<Function />} />
              <Route path="/Messages" element={<Messages />} />
              <Route path="/Registrations" element={<Registrations />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
              background: darkTheme ? '#001529' : '#2D939C', color: darkTheme ? '#fff' : '#000' }}>
              
              {/* Removendo degrade
               background: darkTheme
               ? 'linear-gradient(to bottom, #2d939c, #68C7CF)'
                : 'linear-gradient(to bottom, #2d939c, #68C7CF)',
               color: darkTheme ? '#fff' : '#000',
            }} 
          >  */}
            Neki ©2024 Criado por Residentes
          </Footer>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
