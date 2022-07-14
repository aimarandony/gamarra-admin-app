import React, { useState } from 'react'
import { HeaderTitle } from '../components/HeaderTitle'
import { ProductModal } from '../components/ProductModal';
import { ProductTable } from '../components/ProductTable';

import './Product.css'

export default function Product() {

    const [openModal, setOpenModal] = useState(false);
    const [idEdit, setIdEdit] = useState(0);

    return (
        <div>
            <HeaderTitle title="Productos" btnName="Nuevo Producto" clickEvent={() => setOpenModal(true)} />
            <div className='c-product-content'>
                <ProductTable setIdEdit={setIdEdit} setOpenModal={setOpenModal} />
            </div>
            <ProductModal open={openModal} setOpen={setOpenModal} idEdit={idEdit} setIdEdit={setIdEdit} />
        </div>
    )
}
