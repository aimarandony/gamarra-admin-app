import React, { useEffect } from 'react'
import { Button, Col, Form, Input, message, Modal, Row, Select } from 'antd';
import { useFormik } from 'formik';

import * as Yup from "yup";

import './ProductModal.css'
import { createProduct, getProductById, getProducts, updateProduct } from '../services/ProductService';

export const ProductModal = ({ open, setOpen, idEdit, setIdEdit, setData }) => {

  const validationSchema = Yup.object().shape({
    description: Yup.string().trim()
      .matches(/^[ñÑa-zA-ZáéíóúÁÉÍÓÚ ]*$/, "Solo se admiten letras.")
      .required("La descripción es requerida."),
    size: Yup.string().trim()
      .matches(/^[ñÑa-zA-ZáéíóúÁÉÍÓÚ ]*$/, "Solo se admiten letras.")
      .required("La Talla es requerida."),
    color: Yup.string().trim()
      .matches(/^[ñÑa-zA-ZáéíóúÁÉÍÓÚ ]*$/, "Solo se admiten letras.")
      .required("El color es requerido."),
    price: Yup.number().min(0, "El Precio mínimo es de 0.").required("El Precio es requerido."),
    stock: Yup.number().min(0, "El Stock mínimo es de 0.").required("El Stock es requerido."),
  })

  const { handleSubmit, values, handleChange, errors, touched, resetForm, setFieldValue, setValues } = useFormik({
    initialValues: {
      description: "",
      size: "S",
      color: "ROJO",
      price: 0,
      stock: 0,
    },
    validationSchema,
    onSubmit: (data) => {
      console.log(data);
      if (idEdit === 0) {
        createProduct(data)
          .then(() => {
            message.success("Producto creado correctamente.");
            handleCancel();
          })
          .catch(resp => {
            if (resp.response.status === 404) {
              message.warn(resp.response.data.description);
            } else {
              message.error("Ocurrió un error al registrar. Inténtelo de nuevo.");
            }
          });
      } else {
        updateProduct(data, idEdit)
          .then(() => {
            message.success("Producto actualizado correctamente.");
            handleCancel();
          })
          .catch(resp => {
            if (resp.response.status === 404) {
              message.warn(resp.response.data.description);
            } else {
              message.error("Ocurrió un error al registrar. Inténtelo de nuevo.");
            }
          });
      }

    }
  });

  let handleCancel = () => {
    resetForm();
    setOpen(false);
    setIdEdit(0);
    getProducts().then(resp => {
      resp.map(data => {
        data.key = data.id;
        return data;
      });
      setData(resp);
    })
  }

  let setDataProduct = () => {
    getProductById(idEdit).then(resp => {
      setValues({
        description: resp.description,
        size: resp.size,
        color: resp.color,
        price: resp.price,
        stock: resp.stock,
      })
    })
  }

  useEffect(() => {
    idEdit !== 0 && setDataProduct();
    // eslint-disable-next-line
  }, [idEdit])


  return (
    <Modal title="GUARDAR PRODUCTO" visible={open} onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancelar
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Guardar
        </Button>
      ]}
    >
      <Form layout='vertical' onSubmitCapture={handleSubmit}>
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item label="Descripción:" required>
              <Input name="description" value={values.description} onChange={handleChange} />
              {errors.description && touched.description ? (
                <div className="error-field">{errors.description}</div>
              ) : null}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Talla:" required>
              <Select
                name="size"
                value={values.size}
                onChange={(size) => setFieldValue("size", size)}
                placeholder="Selecciona una Talla"
              >
                <Select.Option value="S" key="S">SMALL</Select.Option>
                <Select.Option value="M" key="M">MEDIUM</Select.Option>
                <Select.Option value="L" key="L">LARGE</Select.Option>
              </Select>
              {errors.size && touched.size ? (
                <div className="error-field">{errors.size}</div>
              ) : null}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Color:" required>
              <Select
                name="color"
                value={values.color}
                onChange={(color) => setFieldValue("color", color)}
                placeholder="Selecciona un Color"
              >
                <Select.Option value="ROJO" key="ROJO">ROJO</Select.Option>
                <Select.Option value="NEGRO" key="NEGRO">NEGRO</Select.Option>
                <Select.Option value="VERDE" key="VERDE">VERDE</Select.Option>
                <Select.Option value="AZUL" key="AZUL">AZUL</Select.Option>
                <Select.Option value="BLANCO" key="BLANCO">BLANCO</Select.Option>
                <Select.Option value="AMARILLO" key="AMARILLO">AMARILLO</Select.Option>
              </Select>
              {errors.color && touched.color ? (
                <div className="error-field">{errors.color}</div>
              ) : null}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Precio:" required>
              <Input type='number' name="price" value={values.price} onChange={handleChange} />
              {errors.price && touched.price ? (
                <div className="error-field">{errors.price}</div>
              ) : null}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Stock:" required>
              <Input type='number' name="stock" value={values.stock} onChange={handleChange} />
              {errors.stock && touched.stock ? (
                <div className="error-field">{errors.stock}</div>
              ) : null}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
