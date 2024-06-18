import React from 'react';
import { Space, Table, Grid } from 'antd';

const { useBreakpoint } = Grid;

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
    width: 100,
    render: () => (
      <Space size="middle">
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [];
for (let i = 1; i <= 10; i++) {
  data.push({
    key: i,
    name: 'John Brown',
    age: Number(`${i}2`),
    address: `New York No. ${i} Lake Park`,
    description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
  });
}

const defaultTitle = () => 'Here is title';
const defaultFooter = () => 'Here is footer';

const TableMessages = () => {
  const screens = useBreakpoint();
  const isSmallScreen = screens.xs; // Consider xs as small screen

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
      <Table
        {...tableProps}
        pagination={{
          position: ['bottomRight'],
        }}
        columns={columns}
        dataSource={data}
      />
    </>
  );
};


export default TableMessages;