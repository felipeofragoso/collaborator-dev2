import React, { useState, useEffect } from 'react';
import { storeAlm, getAlm } from '../../services/almService';
import {
  Space,
  Table,
  Grid,
  Input,
  Button,
  Modal,
  Form,
  InputNumber,
  Popconfirm,
  Switch,
} from 'antd';
import './Table.css';

const { useBreakpoint } = Grid;
const { Search } = Input;

const initialData = [];

const defaultTitle = () => 'Alm';
const defaultFooter = () => 'footer';

// Componente de tabela

const TableAlm = () => {
  const screens = useBreakpoint();
  const isSmallScreen = screens.xs; // Consider xs as small screen

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(initialData);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();
  const [cadastro, setCadastro] = useState({
    nome: '',
    url: '',
    login: '',
    senha: '',
    tipo: '',
    vpn: '',
    status: '',
  });
  const [status, setStatus] = useState(false);
  const [dataAlm, setDataAlm] = useState([]);

  // Chamando os dados do banco e guardando em um useState para poder usar na lista, é preciso usar useEffect para não criar o erro do loop infinito na renderização
  useEffect(() => {
    const response = async () => {
      const pegandoAlm = await getAlm();
      console.log(pegandoAlm);
      setDataAlm(pegandoAlm);
    };

    response();
  }, []);

  // essa função é para filtrar a tabela
  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = initialData.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.age.toString().includes(value) ||
        item.address.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredData(filtered);
  };
  // FIM ############# lógica filtrar ALM

  // essa função é para abrir e fechar o modal de cadastro de ALM
  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };
  // FIM ############# lógica abrir e fechar modal de cadastro de ALM

  // essa função é para clicar no botão de OK dentro do modal de cadastro de ALM
  const handleAdd = () => {
    if (
      cadastro.nome !== '' &&
      cadastro.url !== '' &&
      cadastro.login !== '' &&
      cadastro.senha !== '' &&
      cadastro.tipo !== '' &&
      cadastro.vpn !== '' &&
      cadastro.status !== ''
    ) {
      return storeAlm(cadastro);
    }

    return alert('Preencha todos os campos!');
    // setCadastro({ nome: '', url: '', login: '', senha: '', tipo: '', vpn: '', status: '' });

    // form
    //   .validateFields()
    //   .then((values) => {
    //     form.resetFields();
    //     setIsAddModalVisible(false);
    //     const newItem = {
    //       key: filteredData.length + 1,
    //       ...values,
    //     };
    //     setFilteredData([...filteredData, newItem]);
    //   })
    //   .catch((info) => {
    //     console.log('Validate Failed:', info);
    //   });
  };

  // essa função é para abrir o modal de edição de um item
  const showEditModal = (item) => {
    setEditingItem(item);
    form.setFieldsValue(item);
    setIsEditModalVisible(true);
  };
  // essa função é para fechar o modal de edição de um item
  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setEditingItem(null);
  };

  //  essa função é para salvar o item editado

  const handleEdit = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setIsEditModalVisible(false);
        const updatedData = filteredData.map((item) =>
          item.key === editingItem.key ? { ...item, ...values } : item,
        );
        setFilteredData(updatedData);
        setEditingItem(null);
      })
      .catch((info) => {
        // console.log('Validate Failed:', info);
      });
  };

  // essa função é para deletar um item da tabela
  const handleDelete = (key) => {
    const newData = filteredData.filter((item) => item.key !== key);
    setFilteredData(newData);
  };

  // esse array é para definir as colunas da tabela
  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: 'Age trocar',
      dataIndex: 'age',
      sorter: (a, b) => a.age - b.age,
      width: 80,
    },
    {
      title: 'Login',
      dataIndex: 'login',
      width: 150,
    },
    {
      title: 'Senha',
      dataIndex: 'senha',
      width: 150,
    },
    {
      title: 'Tipo',
      dataIndex: 'tipo',
      width: 150,
    },
    {
      title: 'Vpn',
      dataIndex: 'vpn',
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 200,
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: 'Ação',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => showEditModal(record)}>Editar</Button>
          <Popconfirm title="Deseja deletar?" onConfirm={() => handleDelete(record.key)}>
            <a>Deletar</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // possível linhas da tabela
  for (let i = 1; i <= 10; i++) {
    initialData.push({
      key: i,
      name: 'teste',
      vpn: 'Testando Vpn',
      status: 'Testando Status',
      // age: Number(`${i}2`),
      // address: `New York No. ${i} Lake Park`,
      // description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
      login: 'qualquer ',
      senha: 123454,
      tipo: 'testando tipo',
      url: 'Testando URL',
    });
  }

  // essa função é para definir a tabela
  const tableProps = {
    bordered: true,
    size: 'small',
    title: defaultTitle,
    showHeader: true,
    footer: defaultFooter,
    rowSelection: {},
    scroll: isSmallScreen ? { x: 'max-content', y: 620 } : { y: 620 },
    pagination: isSmallScreen ? { pageSize: 5 } : false,
  };

  // lógica do switch de status
  const onChangeSwitch = (checked) => {
    setCadastro({ ...cadastro, status: checked });
    checked ? setStatus(false) : setStatus(true);
  };

  return (
    <>
      {/* Container botao e barra de pesquisa */}
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Search..."
          enterButton
          onSearch={handleSearch}
          backgroud="linear-gradient(to bottom, #2d939c, #68C7CF)"
        />
        <Button
          type="primary"
          onClick={showAddModal}
          style={{ background: 'linear-gradient(to bottom, #2d939c, #68C7CF)', border: 'none' }}
        >
          Cadastrar
        </Button>
      </Space>

      {/* FIM ############# Container botao e barra de pesquisa */}

      {/* Tabela modal */}
      <Table
        {...tableProps}
        pagination={{
          position: ['bottomRight'],
        }}
        columns={columns}
        dataSource={filteredData}
      />
      {/* FIM ############# Tabela modal */}

      {/* Esse modal é para cadastrar um novo item na tabela, apertando o botão de cadastro */}
      <Modal
        title="Cadastrar Novo ALM"
        visible={isAddModalVisible}
        // função para fechar o modal de cadastro
        onCancel={handleAddCancel}
        // função para que faz o botão OK do modal de cadastro ser executado
        onOk={handleAdd}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="nameAlm"
            label="Nome"
            rules={[{ required: true, message: 'Coloque o nome por favor!' }]}
          >
            {/*dentro de setCadastro é criado um novo objeto {}, e dentro dele é criado uma cópia do objeto cadastro(está no useState) por meio do rest operator e em seguida é adicionado a propriedade a ser alterada ou criada  */}
            <Input
              type="text"
              required
              onChange={(e) => setCadastro({ ...cadastro, nome: e.target.value })}
            />
          </Form.Item>

          <Form.Item
            name="urlAlm"
            label="Url"
            rules={[{ required: true, message: 'Coloque a URL por favor!' }]}
          >
            <Input
              type="text"
              required
              onChange={(e) => setCadastro({ ...cadastro, url: e.target.value })}
            />
          </Form.Item>

          <Form.Item
            name="loginAlm"
            label="Login"
            rules={[{ required: true, message: 'Coloque o usuário de login por favor!' }]}
          >
            <Input
              type="text"
              required
              onChange={(e) => setCadastro({ ...cadastro, login: e.target.value })}
            />
          </Form.Item>

          <Form.Item
            name="senhaAlm"
            label="Senha"
            rules={[{ required: true, message: 'Coloque a senha por favor!' }]}
          >
            <Input
              type="text"
              required
              onChange={(e) => setCadastro({ ...cadastro, senha: e.target.value })}
            />
          </Form.Item>
          <Form.Item
            name="tipoAlm"
            label="Tipo"
            rules={[{ required: true, message: 'Coloque o tipo por favor!' }]}
          >
            <Input
              type="text"
              required
              onChange={(e) => setCadastro({ ...cadastro, tipo: e.target.value })}
            />
          </Form.Item>
          <Form.Item
            name="vpnAlm"
            label="Vpn"
            rules={[{ required: true, message: 'Coloque o vpn por favor!' }]}
          >
            <Input
              type="text"
              required
              onChange={(e) => setCadastro({ ...cadastro, vpn: e.target.value })}
            />
          </Form.Item>

          {/* Aqui entra o Switch */}

          <Form.Item name="statusAlm" label="Status" rules={[{ required: true }]}>
            <Switch onChange={() => onChangeSwitch(status)} />
            {status ? <p>Ativo</p> : <p>Inativo</p>}
          </Form.Item>
        </Form>
      </Modal>
      {/* FIM ############# Modal Cadastrar Alm */}

      {/* Esse modal é para editar um item na tabela pelo botão de editar */}

      <Modal
        title="Editar Item"
        visible={isEditModalVisible}
        onCancel={handleEditCancel}
        onOk={handleEdit}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[{ required: true, message: 'Please input the age!' }]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please input the address!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      {/* FIM ############# Modal Editar Alm */}
    </>
  );
};

export default TableAlm;
