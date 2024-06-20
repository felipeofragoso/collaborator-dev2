import React from 'react';
import { Button, Result } from 'antd';


const PageNotFound = () => (
  <Result
    status="404"
    title="404"
    subTitle="Desculpe, essa página não existe."
    extra={<Button type="primary">Voltar para Pagina Inicial</Button>}
  />
);
export default PageNotFound;