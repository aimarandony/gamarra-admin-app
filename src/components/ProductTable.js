import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, message, Popconfirm, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react'
import { deleteProduct, getProducts } from '../services/ProductService';

import './ProductTable.css'

export const ProductTable = ({ setIdEdit, setOpenModal, setData, data }) => {

  const [isLoading, setLoading] = useState(true);
  const [filterTable, setFilterTable] = useState(null);

  const handleSearch = (value) => {
    setFilterTable(
      data.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(value.toLowerCase())
        )
      )
    );
  };

  const handleEdit = (id) => {
    setIdEdit(id);
    setOpenModal(true);
  }

  const handleDeleteProduct = (id) => {
    deleteProduct(id)
      .then(resp => {
        console.log(resp);
        getProducts().then(resp => {
          resp.map(data => {
            data.key = data.id;
            return data;
          });
          setData(resp);
        });
        message.success("Producto eliminado correctamente.");
      })
      .catch(resp => {
        console.log(resp);
        if (resp.response.data.message === "Invalid Delete") {
          message.warn("El producto se encuentra en uso y no puede ser eliminado.");
        } else {
          message.error("Ocurrió un error Interno. Vuelva a intentarlo.");
        }
      })
  }

  useEffect(() => {
    getProducts().then(resp => {
      resp.map(data => {
        data.key = data.id;
        return data;
      });
      setData(resp);
      setLoading(false);
    });
  }, [setData])


  return (
    <div>
      <Input.Search className='input-search' size='large' placeholder='Buscar Producto' onKeyUpCapture={(e) => handleSearch(e.target.value)} />
      <Table loading={isLoading} dataSource={filterTable === null ? data : filterTable} pagination={{ pageSize: 4 }} scroll={{ x: 800 }} >
        <Table.Column title="Descripción" dataIndex="description" />
        <Table.Column title="Talla" dataIndex="size" align='center' />
        <Table.Column title="Color" dataIndex="color" align='center' />
        <Table.Column title="Precio Unit." align='center' render={({ price }) => (<span>S/ {price}</span>)} />
        <Table.Column title="Stock" align='center' render={({ stock }) => (<span>{stock} Unidades</span>)} />
        <Table.Column title="Estado" align='center' render={({ active }) => (
          <Tag color={active ? "green" : "red"}>
            {active ? "STOCK" : "SIN STOCK"}
          </Tag>
        )} />
        <Table.Column title="Acciones" render={({ id }) => (
          <>
            <Button type="ghost" size="small" icon={<EditOutlined />}
              onClick={() => handleEdit(id)} style={{ marginRight: "8px" }}>
              Editar
            </Button>
            <Popconfirm
              title="¿Desea eliminar este producto?"
              onConfirm={() => handleDeleteProduct(id)}
              onCancel={() => { }}
              okText="Si, Eliminar"
              cancelText="Cancelar"
            >
              <Button type="ghost" size="small" icon={<DeleteOutlined />}>
                Eliminar
              </Button>
            </Popconfirm>
          </>
        )} />
      </Table>

    </div >
  )
}
