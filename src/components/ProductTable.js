import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react'
import { getProducts } from '../services/ProductService';

import './ProductTable.css'

export const ProductTable = () => {

  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [filterTable, setFilterTable] = useState(null);

  const handleSearch = (value) => {
    setFilterTable(
      products.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(value.toLowerCase())
        )
      )
    );
  };

  useEffect(() => {
    getProducts().then(resp => {
      resp.map(data => {
        data.key = data.id;
        return data;
      });      
      setProducts(resp);
      setLoading(false);
    });
  }, [])


  return (
    <div>
      <Input.Search className='input-search' size='large' placeholder='Buscar Producto' onKeyUpCapture={(e) => handleSearch(e.target.value)} />
      <Table loading={isLoading} dataSource={filterTable === null ? products : filterTable} pagination={{ pageSize: 4 }} scroll={{ x: 800 }} >
        <Table.Column title="Descripción" dataIndex="description" />
        <Table.Column title="Talla" dataIndex="size" align='center' />
        <Table.Column title="Color" dataIndex="color" align='center' />
        <Table.Column title="Precio Unit." align='center' render={({ price }) => (<span>S/ {price}</span>)} />
        <Table.Column title="Stock" align='center' render={({stock}) => (<span>{stock} Unidades</span>)} />
        <Table.Column title="Estado" align='center' render={({ active }) => (
          <Tag color={active ? "green" : "red"}>
            {active ? "STOCK" : "SIN STOCK"}
          </Tag>
        )} />
        <Table.Column title="Acciones" render={({ id }) => (
          <>
            <Button type="primary" size="small" icon={<EditOutlined />} style={{ marginRight: "8px" }}>
              Editar
            </Button>
            <Button type="ghost" size="small" icon={<DeleteOutlined />}>
              Eliminar
            </Button>
          </>
        )} />
      </Table>
    </div >
  )
}
