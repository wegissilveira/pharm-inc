import React from 'react'

import classes from './FloatingButton.module.css'

import { ArrowUpOutlined } from '@ant-design/icons'


const FloatingButton: React.FC = props => {

    const scrollToTop = () => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    }

    return (
        <div onClick={scrollToTop} className={classes['Button-container']}>
            <ArrowUpOutlined />
        </div>
    )
}

export default FloatingButton
