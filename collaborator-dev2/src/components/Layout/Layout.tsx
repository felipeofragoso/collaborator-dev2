import React from "react";
// import "./App.css";

import { Layout, } from "antd";

const { Content, Header, Footer } = Layout;

const App = () => (
  <Layout className="Container">
    <Header className="Header">Header</Header>
     <Content className="Content">Content</Content>
    <Footer className="Footer">Footer</Footer>
  </Layout>
);

export default App;