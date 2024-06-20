import React, { useState, useEffect } from 'react';
import { Space, Table, Input, Button, Modal, Form, InputNumber, Popconfirm, message } from 'antd';
import { storeRole, getRole, updateRole, deleteRole } from '../../services/roleService';
import './Table.css';

const { Search } = Input;

const TableFunction = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const roles = await getRole();
            setData(roles);
            setFilteredData(roles);
        } catch (error) {
            message.error('Erro ao buscar os dados');
            console.error('Erro ao buscar os dados:', error);
        }
    };

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

    const handleAdd = async () => {
        try {
            const values = await form.validateFields();
            form.resetFields();
            setIsAddModalVisible(false);
            await storeRole(values);
            fetchData();
        } catch (error) {
            console.log('Validate Failed:', error);
        }
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

    const handleEdit = async () => {
        try {
            const values = await form.validateFields();
            form.resetFields();
            setIsEditModalVisible(false);
            await updateRole(editingItem.idRole, values);
            fetchData();
            setEditingItem(null);
        } catch (error) {
            console.log('Validate Failed:', error);
        }
    };

    const handleDelete = async (idRole) => {
        try {
            await deleteRole(record);
            fetchData();
        } catch (error) {
            console.error('Erro ao deletar:', error);
        }
    };

    const columns = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            width: 150,
        },
        {
            title: 'Descrição',
            dataIndex: 'descricao',
            key: 'descricao',
            width: 150,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 150,
        },
        {
            title: 'Ação',
            key: 'acao',
            width: 150,
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => showEditModal(record)}>Editar</Button>
                    <Popconfirm title="Tem certeza que deseja excluir?" onConfirm={() => handleDelete(record.idRole)}>
                        <a>Deletar</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

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
                columns={columns}
                dataSource={filteredData}
                rowKey="idRole"
                pagination={{ position: ['bottomRight'], pageSize: 5 }}
            />
            <Modal
                title="Cadastrar Novo Item"
                visible={isAddModalVisible}
                onCancel={handleAddCancel}
                onOk={handleAdd}
            >
                <Form form={form} layout="vertical" name="form_in_modal">
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
                <Form form={form} layout="vertical" name="form_in_modal">
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
