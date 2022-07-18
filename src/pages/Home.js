import React, { useEffect, useState } from 'react'
import { ProductShopList } from '../components/ProductShopList'
import { getProducts } from '../services/ProductService'

export default function Home() {

    const [data, setData] = useState([])

    useEffect(() => {
        getProducts().then(setData);
    }, [])
    
    return (
        <div>
            <ProductShopList productList={data} />
        </div>
    )
}
