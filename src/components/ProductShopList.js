import React, { useEffect } from 'react'
import { ProductCardShop } from './ProductCardShop'

export const ProductShopList = ({productList, cart, setCart}) => {
  
  useEffect(() => {
    console.log(cart);
  }, [cart])
  

  return (
    <div className='row'>
        {
            productList.map(data => <ProductCardShop key={data.id} product={data} cart={cart} setCart={setCart} />)
        }
    </div>
  )
}
