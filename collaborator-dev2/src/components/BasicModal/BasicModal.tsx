import React from "react";
import { Modal, Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/img/logo.png';
import { useTranslation } from "react-i18next";

const { Text } = Typography;

const BasicModal = ({ modalOpen, setModalOpen }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={Logo} alt="Logo" style={{ width: "50px", height: "50px", marginRight: "10px" }} />
          <Text style={{ fontSize: "24px", margin: 0 }}>{t("Cadastros")}</Text>
        </div>
      }
      visible={modalOpen}
      onCancel={handleClose}
      footer={null}
      centered
      width={447}
      bodyStyle={{
        padding: '24px',
        borderRadius: '10px',
        border: '2px solid gray',
        backgroundColor: '#fff',
      }}
    >
      <div>
        <Button
          type="text"
          onClick={handleClose}
          style={{ marginBottom: '16px', width: '100%' }}
        >
          {t("Clientes")}
        </Button>

        <Button
          type="text"
          onClick={handleClose}
          style={{ marginBottom: '16px', width: '100%' }}
        >
          {t("Tipos de Custos Extras")}
        </Button>

        <Button
          type="text"
          onClick={handleClose}
          style={{ marginBottom: '16px', width: '100%' }}
        >
          {t("Tecnologia")}
        </Button>

        <Button
          type="text"
          onClick={handleClose}
          style={{ marginBottom: '16px', width: '100%' }}
        >
          {t("Funções")}
        </Button>

        <Button
          type="text"
          onClick={handleClose}
          style={{ marginBottom: '16px', width: '100%' }}
        >
          {t("Motivos de Eventos")}
        </Button>

        <Button
          type="text"
          onClick={handleClose}
          style={{ marginBottom: '16px', width: '100%' }}
        >
          {t("Mensagens")}
        </Button>

        <Button
          type="text"
          onClick={handleClose}
          style={{ marginBottom: '16px', width: '100%' }}
        >
          {t("ALM")}
        </Button>

        <Button
          type="primary"
          onClick={() => navigate('/')}
          style={{ marginBottom: '16px', width: '100%' }}
        >
          {t("Pagina Inicial")}
        </Button>

      </div>
    </Modal>
  );
};

export default BasicModal;
