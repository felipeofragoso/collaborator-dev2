import React, { useState, useEffect } from 'react';
import { Space, Table, Input, Button, Modal, Form, InputNumber, Popconfirm, message } from 'antd';
import { storeRole, getRole, updateRole, deleteRole } from '../../services/roleService';
import './Table.css';
import { MdDeleteForever} from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const { useBreakpoint } = Grid;
const { Search } = Input;

const initialData = [];
// for (let i = 1; i <= 10; i++) {
//   initialData.push({
//     key: i,
//     nome: 'Python',
//     descricao: Number(`${i}2`),
//     status: `New York No. ${i} Lake Park`,
//     description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
//   });
// }

const defaultTitle = () => 'Funçao';
const defaultFooter = () => '';

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
            await deleteRole(idRole);
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
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: 'Ação',
      key: 'acao',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => showEditModal(record)}> <FaEdit/></Button>
          <Popconfirm title="Tem certeza que deseja excluir?" onConfirm={() => handleDelete(record.key)}>
            <Button> <MdDeleteForever/> </Button>
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
          placeholder="Procurar..."
          enterButton
          onSearch={handleSearch}
        />
        <Button type="primary" onClick={showAddModal}>
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
        title="Cadastrar Novo Item"
        visible={isAddModalVisible}
            // função para fechar o modal de cadastro
        onCancel={handleAddCancel}
                // função para que faz o botão OK do modal de cadastro ser executado
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
            rules={[{ required: false, message: 'Por favor, insira o nome!' }]}
          >
            {/*dentro de setCadastro é criado um novo objeto {}, e dentro dele é criado uma cópia do objeto cadastro(está no useState) por meio do rest operator e em seguida é adicionado a propriedade a ser alterada ou criada  */}
            <Input
              type="text"
              required
              onChange={(e) => setCadastro({ ...cadastro, nome: e.target.value })}
            />


            <Input />
          </Form.Item>
          <Form.Item
          
            name="descricao"
            label="Descrição"
            rules={[{ required: false, message: 'Por favor, insira a descrição!' }]}
          >
            <Input
              type="text"
              required
              onChange={(e) => setDescricao({ ...cadastro, descricao: e.target.value })}
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
