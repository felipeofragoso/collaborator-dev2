import api from './api';

export const storeAlm = async (itemAlm) => {
  try {
    const response = await api.post('/almtools/cadastrar_alm', itemAlm);
    console.log(response);
  } catch (error) {
    console.log("Erro post alm: ", error);
  }
};
