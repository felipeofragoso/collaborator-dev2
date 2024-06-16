import { LogoutOutlined } from "@ant-design/icons";
import { HeaderContainer } from "../../styles/header.styles";

const Header = () => {
    return (
        <HeaderContainer>
            <LogoutOutlined onClick={() => alert('Sair')} />
        </HeaderContainer>
    );
};

export default Header;
