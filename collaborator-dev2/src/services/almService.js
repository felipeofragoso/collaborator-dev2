import api from './api';

export const storeAlm = async (itemAlm) => {
  console.log('chamando a api para cadastrar alm');
  try {
    const response = await api.post('/almtools/cadastrar_alm', itemAlm);
    console.log(response);
    alert('Alm cadastrado com sucesso');
  } catch (error) {
    console.log('Erro post alm: ', error);
  }
};

export const getAlm = async () => {
  try {
    const arrayGetAlms = [];
    const response = await api.get('almtools/listar_alm');
    // console.log(response.data);

    for (let key in response.data) {
      const teste = {
        ...response.data[key],
        id: key,
      };
      arrayGetAlms.push(teste);
    }
    // console.log(arrayGetAlms);
    return arrayGetAlms;
  } catch (error) {
    console.log('Erro em pegar dados ALM: ', error);
  }
};
