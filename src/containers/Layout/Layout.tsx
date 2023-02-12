import { Component } from "react"

import Navigation from "components/Header/Header"

class Layout extends Component {
   render() {
      return (
         <>
            <Navigation />
            <main>{this.props.children}</main>
         </>
      )
   }
}

export default Layout
