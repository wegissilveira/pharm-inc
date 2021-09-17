import React from 'react'

import classes from './Navigation.module.css'


const Navigation: React.FC = () => {
    return (
        <div className={classes['Navigation-container']}>
            <div className={classes['Navigation-subContainer']}>
                <img src={require("assets/logo/logo.png").default}  alt="pharma-logo"/>
            </div>
        </div>
    )
}

export default Navigation
