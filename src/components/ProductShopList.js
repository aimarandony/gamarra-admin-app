import React from 'react'
import { ProductCardShop } from './ProductCardShop'

export const ProductShopList = ({productList}) => {
  return (
    <div className='row'>
        {
            productList.map(data => <ProductCardShop key={data.id} product={data} />)
        }
    </div>
  )
}
