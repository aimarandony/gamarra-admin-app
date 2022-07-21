import React, { useEffect, useState } from 'react'
import { Button, Drawer } from 'antd';

import './ProductShopCart.css'
import { ProductCartItem } from './ProductCartItem';

export const ProductShopCartList = ({ openDrawer, setOpenDrawer, cart, setCart, setOpenModal }) => {

    const [total, setTotal] = useState(0)
    const [deleteChange, setDeleteChange] = useState(0)

    const onClose = () => {
        setOpenDrawer(false);
    }

    const handleOpenModal = () => {
        setOpenDrawer(false);
        setOpenModal(true);
    }

    useEffect(() => {
        setTotal(0);
        cart.forEach(product => {
            setTotal(total => total + (product.price * product.quantity));
        });
    }, [cart, deleteChange])

    return (
        <Drawer title="CARRITO DE COMPRA"
            width={500} placement="right"
            onClose={onClose} visible={openDrawer}
            footer={<div className='c-shop-drawer-footer'>
                <div className='c-price-total'>
                    <span className='text'>Pago Total</span>
                    <span className='price'>S/ {total}</span>
                </div>
                <Button onClick={handleOpenModal} size='large' type='primary' block>COMPRAR</Button>
            </div>}
        >
            {
                cart.map((product, index) => (<ProductCartItem key={product.id} product={product} cart={cart} setCart={setCart} position={index} setDeleteChange={setDeleteChange} />))
            }
        </Drawer>
    )
}
