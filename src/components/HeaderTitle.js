import { Button } from 'antd'
import React from 'react'

import './HeaderTitle.css'

export const HeaderTitle = ({ title, btnName, clickEvent }) => {
    return (
        <div className='c-header-title'>
            <h4 className='title'>{title}</h4>
            <Button type='primary' size='large' onClick={clickEvent}>{btnName}</Button>
        </div>
    )
}
