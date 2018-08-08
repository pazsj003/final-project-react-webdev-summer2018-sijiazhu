import React, {Component} from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

class LoginKen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>


                <div className="container-fluid p-4">

                    < h1 className="navbar-brand"> register </h1>

                    <input
                        placeholder="username"
                        className="form-control"/>
                    <input
                        placeholder="password"
                        className="form-control"/>
                    < button
                        className="btn btn-primary btn-block">
                        register
                    </button>

                    <i className="fa fa-facebook"> </i>


                </div>
            </div>
        )

    }

}

export default LoginKen;