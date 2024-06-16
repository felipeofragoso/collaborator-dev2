import React from 'react';
import { Button, Result } from 'antd';
import { ContainerPageNotFound } from '../../styles/PageNotFound.styles';

const PageNotFound = () => (
  <ContainerPageNotFound>
  <Result
    status="404"
    title="404"
    subTitle="Desculpe, essa página não existe."
    extra={<Button type="primary">Voltar para Pagina Inicial</Button>}
  />
  </ContainerPageNotFound>
);
export default PageNotFound;