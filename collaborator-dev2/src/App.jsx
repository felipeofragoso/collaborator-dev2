import React from "react";
import "./App.css";

import { Layout, } from "antd";

const { Content, Header, Sider, Footer } = Layout;

const App = () => (
  <Layout className="Container">
    <Header className="Header">Header</Header>
     <Layout className="Container">
      <Sider className="Sidebar">Sider</Sider>
        <Content className="Content">Content</Content>
     </Layout>
    <Footer className="Footer">Footer</Footer>
  </Layout>
);

export default App;