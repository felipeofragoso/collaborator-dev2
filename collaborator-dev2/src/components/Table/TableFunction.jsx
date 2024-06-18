import React, { useState } from 'react';
import { Space, Table, Grid, Input, Button, Modal, Form, InputNumber, Popconfirm } from 'antd';

const { useBreakpoint } = Grid;
const { Search } = Input;

const initialData = [];
for (let i = 1; i <= 10; i++) {
  initialData.push({
    key: i,
    nome: 'Python',
    descricao: Number(`${i}2`),
    status: `New York No. ${i} Lake Park`,
    description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
  });
}

const defaultTitle = () => 'Funçao';
const defaultFooter = () => 'Here is footer';

const TableFunction = () => {
  const screens = useBreakpoint();
  const isSmallScreen = screens.xs; // Consider xs as small screen

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(initialData);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = initialData.filter((item) =>
      item.nome.toLowerCase().includes(value.toLowerCase()) ||
      item.descricao.toString().includes(value) ||
      item.status.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };

  const handleAdd = () => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        setIsAddModalVisible(false);
        const newItem = {
          key: filteredData.length + 1,
          ...values,
        };
        setFilteredData([...filteredData, newItem]);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const showEditModal = (item) => {
    setEditingItem(item);
    form.setFieldsValue(item);
    setIsEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setEditingItem(null);
  };

  const handleEdit = () => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        setIsEditModalVisible(false);
        const updatedData = filteredData.map((item) => 
          item.key === editingItem.key ? { ...item, ...values } : item
        );
        setFilteredData(updatedData);
        setEditingItem(null);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleDelete = (key) => {
    const newData = filteredData.filter((item) => item.key !== key);
    setFilteredData(newData);
  };

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      width: 150,
    },
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      sorter: (a, b) => a.descricao - b.descricao,
      width: 80,
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
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: 'Ação',
      key: 'acao',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => showEditModal(record)}>Editar</Button>
          <Popconfirm title="Tem certeza que deseja excluir?" onConfirm={() => handleDelete(record.key)}>
            <a>Deletar</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

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
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Procurar..."
          enterButton
          onSearch={handleSearch}
        />
        <Button type="primary" onClick={showAddModal}>
          Cadastrar
        </Button>
      </Space>
      <Table
        {...tableProps}
        pagination={{
          position: ['bottomRight'],
        }}
        columns={columns}
        dataSource={filteredData}
      />
      <Modal
        title="Cadastrar Novo Item"
        visible={isAddModalVisible}
        onCancel={handleAddCancel}
        onOk={handleAdd}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
        >
          <Form.Item
            name="nome"
            label="Nome"
            rules={[{ required: true, message: 'Por favor, insira o nome!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="descricao"
            label="Descrição"
            rules={[{ required: true, message: 'Por favor, insira a descrição!' }]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Por favor, insira o status!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Editar Item"
        visible={isEditModalVisible}
        onCancel={handleEditCancel}
        onOk={handleEdit}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
        >
          <Form.Item
            name="nome"
            label="Nome"
            rules={[{ required: true, message: 'Por favor, insira o nome!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="descricao"
            label="Descrição"
            rules={[{ required: true, message: 'Por favor, insira a descrição!' }]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Por favor, insira o status!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};





export default TableFunction;