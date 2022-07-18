import React from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Tag } from 'antd';

import './ProductCardShop.css'

export const ProductCardShop = ({ product }) => {

  let productSrc = "noProductImage.jpg";

  if (product.description.toUpperCase() === "POLO MANGA CORTA" ||
    product.description.toUpperCase() === "POLO MANGA LARGA") {
    productSrc = `${String(product.description).toUpperCase().split(" ").join("_")}_${product.color}.png`;
  }

  return (
    <div className='col-lg-4 col-md-6 col-sm-12 my-3'>
      <Card className='c-card-product-shop' hoverable>
        <div className='c-image'>
          <img src={`${process.env.PUBLIC_URL}/imgProducts/${productSrc}`} alt={productSrc} />
        </div>
        <p className='description'>{product.description} {product.color} - {product.size}</p>
        <div className='c-footer'>
          <div className='c-price'>
            <span className='title'>Precio</span>
            <span className='price'>S/ {product.price}.00</span>
          </div>
          {
            product.active ? <Button icon={<PlusOutlined />}>Añadir</Button> : <Tag color='red'>SIN STOCK</Tag>
          }
        </div>
      </Card>
    </div>
  )
}
