import React, { useEffect, useState } from 'react'
import { ProductShopList } from '../components/ProductShopList'
import { getProducts } from '../services/ProductService'
import { Button } from 'antd'
import { ShoppingFilled } from '@ant-design/icons'
import { ProductShopCartList } from '../components/ProductShopCartList'

import './Home.css'

export default function Home() {

    const [data, setData] = useState([]);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        getProducts().then(setData);
    }, [])

    return (
        <div className='c-home container'>
            <ProductShopList productList={data} cart={cart} setCart={setCart}/>
            <div className='c-button-car'>
                <span className='count'>6</span>
                <Button type='primary' shape='circle' onClick={() => setOpenDrawer(true)}
                    icon={<ShoppingFilled style={{ display: 'inline-flex' }} />} size='large' />
            </div>
            <ProductShopCartList openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} cart={cart} setCart={setCart} />
        </div>
    )
}
