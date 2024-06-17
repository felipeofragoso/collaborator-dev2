import React from "react";
import logo from "../../assets/img/logo.png";

import "../Home/Home.css"

const Home = () => {
    return (
        <div className="container">
            <img src={logo} alt="Logo" className="logo-img" />
            {/* <div>Teste</div> */}
        </div>
    );
};

export default Home;
