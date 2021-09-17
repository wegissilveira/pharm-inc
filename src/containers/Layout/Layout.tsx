import React, { Component } from 'react'

import Navigation from 'components/Navigation/Navigation'


class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                <Navigation />
                <main>
                    { this.props.children }
                </main>
            </React.Fragment>
        )
    }
}

export default Layout