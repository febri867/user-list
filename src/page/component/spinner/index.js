import React, { PureComponent } from 'react'
import './_spinner.scss'

class Spinner extends PureComponent {
    render() {
        return (
            <div className="spinner">
                <div className="bounce1"/>
                <div className="bounce2"/>
                <div className="bounce3"/>
            </div>
        );
    }
}

export default Spinner