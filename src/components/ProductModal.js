import React from 'react'
import { Button, Col, Form, Input, message, Modal, Row } from 'antd';
import { useFormik } from 'formik';

import * as Yup from "yup";

import './ProductModal.css'
import { createProduct } from '../services/ProductService';

export const ProductModal = ({ open, setOpen }) => {

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

  const { handleSubmit, values, handleChange, errors, touched, resetForm } = useFormik({
    initialValues: {
      description: "",
      size: "",
      color: "",
      price: 0,
      stock: 0,
    },
    validationSchema,
    onSubmit: (data) => {
      console.log(data);
      createProduct(data)
        .then(() => {
          message.success("Producto creado correctamente.");
          handleCancel();
        })
        .catch(() => {
          message.error("Ocurrió un error al registrar. Inténtelo de nuevo.");
        });
    }
  });

  let handleCancel = () => {
    resetForm();
    setOpen(false);
  }

  let handleOk = () => {
    createProduct();
    setOpen(false);
  }

  return (
    <Modal title="GUARDAR PRODUCTO" visible={open} onOk={handleOk}
      onCancel={handleCancel}
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
              <Input name="size" value={values.size} onChange={handleChange} />
              {errors.size && touched.size ? (
                <div className="error-field">{errors.size}</div>
              ) : null}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Color:" required>
              <Input name="color" value={values.color} onChange={handleChange} />
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
