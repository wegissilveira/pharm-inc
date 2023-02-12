import React from "react";

import classes from "./Header.module.css"

const Header = () => {
   return (
      <div className={classes["Header-container"]}>
         <div className={classes["Header-subContainer"]}>
            <img
               src={require("assets/logo/logo.png").default}
               alt="pharma-logo"
            />
         </div>
      </div>
   )
}

export default Header
