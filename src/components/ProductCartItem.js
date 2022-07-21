import { DeleteFilled, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React, { useEffect, useState } from 'react'

import './ProductShopCart.css'

export const ProductCartItem = ({ product, cart, setCart, position, setDeleteChange }) => {

  const [quantity, setQuantity] = useState(0)
  const [disabledMinus, setDisabledMinus] = useState(false)
  const [disabledPlus, setDisabledPlus] = useState(false)
  const [hideProduct, setHideProduct] = useState(false)

  const minusQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setDisabledMinus(false);
      setDisabledPlus(false);

      let updCart = cart.map(e => {
        if (e.id === product.id) e.quantity -= 1;
        return e;
      });
      setCart(updCart)
    } else {
      setDisabledMinus(true);
    }
  }

  const plusQuantity = () => {
    if (quantity !== product.stock) {
      setQuantity(quantity + 1);
      setDisabledPlus(false);
      setDisabledMinus(false);

      let updCart = cart.map(e => {
        if (e.id === product.id) e.quantity += 1;
        return e;
      });
      setCart(updCart)
    } else {
      setDisabledPlus(true);
    }
  }

  const deleteProductToCart = () => {
    console.log(position);
    let updCart = cart;
    updCart.splice(position, 1);
    setCart(updCart);
    setHideProduct(true);
    setDeleteChange(position + 1)
  }

  useEffect(() => {
    setQuantity(product.quantity);
    if (product.quantity > 1) setDisabledMinus(false);
    if (product.quantity < product.stock) setDisabledPlus(false);
    // eslint-disable-next-line
  }, [product.quantity])

  return (
    <div className={`c-cart-item ${hideProduct ? 'd-none' : ''}`}>
      <div className='c-image'>
        <img src={`${process.env.PUBLIC_URL}/imgProducts/${product.urlImage}`} alt={product.id} />
      </div>
      <div className='c-content'>
        <span className='description'>{product.description} {product.color} - {product.size}</span>
        <span className='price'>S/ {product.price}</span>
        <div className='c-quantity'>
          <Button disabled={disabledMinus} onClick={minusQuantity} className='btn-minus' size='small' icon={<MinusOutlined />} />
          <span className='text'>{quantity}</span>
          <Button disabled={disabledPlus} onClick={plusQuantity} className='btn-plus' size='small' icon={<PlusOutlined />} />
          <span className='stock'>Stock máx. {product.stock}</span>
        </div>
      </div>
      <Button size='middle' onClick={deleteProductToCart} icon={<DeleteFilled style={{ display: 'inline-flex' }} />} />
    </div>
  )
}
