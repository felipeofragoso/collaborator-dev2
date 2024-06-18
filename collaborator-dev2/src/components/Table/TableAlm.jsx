import React, { useState } from 'react';
import { Space, Table, Grid, Input, Button, Modal, Form, InputNumber, Popconfirm } from 'antd';
import './Table.css';

const { useBreakpoint } = Grid;
const { Search } = Input;

const initialData = [];

for (let i = 1; i <= 10; i++) {
  initialData.push({
    key: i,
    name: 'teste',
    age: Number(`${i}2`),
    address: `New York No. ${i} Lake Park`,
    description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
    login: 'qualquer coisa',
    senha: 123454,
    tipo: 'qualquer tipo ',
  });
}

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

  // essa função é para clicar no botão de ok no modal de cadastro de ALM
  const handleAdd = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setIsAddModalVisible(false);
        const newItem = {
          key: filteredData.length + 1,
          ...values,
        };
        setFilteredData([...filteredData, newItem]);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
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
        console.log('Validate Failed:', info);
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
      title: 'Name',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      sorter: (a, b) => a.age - b.age,
      width: 80,
    },
    {
      title: 'Login',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: 'senha',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: 'tipo',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: 'vpn',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: 'Address',
      dataIndex: 'address',
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
      title: 'Action',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => showEditModal(record)}>Edit</Button>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

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

     
      {/* Esse modal é para cadastrar um novo item na tabela */}
      <Modal
        title="Cadastrar Novo Item"
        visible={isAddModalVisible}
        onCancel={handleAddCancel}
        onOk={handleAdd}
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
      {/* FIM ############# Modal Cadastrar Alm */}

      {/* Esse modal é para editar um item na tabela */}

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
