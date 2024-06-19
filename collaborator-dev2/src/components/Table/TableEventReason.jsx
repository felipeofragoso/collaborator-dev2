import React, { useState, useEffect } from 'react';
import { Space, Table, Grid, Input, Button, Modal, Form, InputNumber, Popconfirm } from 'antd';
import "./Table.css"
import api from '../../services/api';

const { useBreakpoint } = Grid;
const { Search } = Input;

// const initialData = [];
// for (let i = 1; i <= 10; i++) {
//   initialData.push({
//     key: i,
//     name: 'John Brown',
//     age: Number(`${i}2`),
//     address: `New York No. ${i} Lake Park`,
//     description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
//   });
// }

const defaultTitle = () => 'Motivos de Eventos';
const defaultFooter = () => 'Here is footer';

const TableEventReason = () => {
  const screens = useBreakpoint();
  const isSmallScreen = screens.xs; // Consider xs as small screen

  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/event_reason/listar');
        const data = response.data.map((item, index) => ({
          key: index + 1,
          name: item.nome,
          description: item.descricao,  
          status: item.status,
          ...item,
        }));
        setData(data);
        setFilteredData(data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = data.filter((item) =>
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
        const newData = [...data, newItem];
        setData(newData);
        setFilteredData(newData);
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
        const updatedData = data.map((item) => 
          item.key === editingItem.key ? { ...item, ...values } : item
        );
        setData(updatedData);
        setFilteredData(updatedData);
        setEditingItem(null);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
    setFilteredData(newData);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: 80,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 200,
      filters: [
        {
          text: '',
          value: '',
        },
        {
          text: '',
          value: '',
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
          placeholder="Search..."
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
    </>
  );
};




export default TableEventReason;