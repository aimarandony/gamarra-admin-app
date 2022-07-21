import React, { useEffect } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Tag } from 'antd';

import './ProductCardShop.css'

export const ProductCardShop = ({ product, cart, setCart }) => {

  let productSrc = "noProductImage.jpg";

  if (product.description.toUpperCase() === "POLO MANGA CORTA" ||
    product.description.toUpperCase() === "POLO MANGA LARGA") {
    productSrc = `${String(product.description).toUpperCase().split(" ").join("_")}_${product.color}.png`;
    product.urlImage = productSrc;
  }

  const addToCart = () => {
    let productFound = cart.filter(e => e.id === product.id);
    if (productFound.length === 0) {
      product.quantity = 1;
      setCart([...cart, product]);
    } else {
      let updCart = cart.map(e => {
        if (product.quantity !== e.stock) {
          if (e.id === product.id) e.quantity += 1;
        }
        return e;
      });
      setCart(updCart)
    }
  }

  useEffect(() => {

  }, [])

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
            product.active ? <Button onClick={addToCart} icon={<PlusOutlined />}>Añadir</Button> : <Tag color='red'>SIN STOCK</Tag>
          }
        </div>
      </Card>
    </div>
  )
}
