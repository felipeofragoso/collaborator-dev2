// import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import PageNotFound from "./pages/PageNotFound/PageNotFound"
import { Layout } from "antd";

import "./App.css";

const { Content, Header, Sider, Footer } = Layout;

const App = () => (
  <BrowserRouter>
    <Layout className="layout">
      {/* <Navbar /> */}
      <Header className="header">Header</Header>
      <Layout className="layout-content">
        <Sider className="sidebar">Sider</Sider>
        <Content className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<PageNotFound />} /> {/* Renderiza PageNotFound para todas as rotas não correspondentes */}
          </Routes>
        </Content>
      </Layout>
      <Footer className="footer">Footer</Footer>
    </Layout>
  </BrowserRouter>
);

export default App;
