import React, {Component} from 'react'
 import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {  Switch } from "react-router";
// import {Switch} from 'react-router'


import Wiki from '../wiki/wiki'
import api from '../Api/api'
import gymEditor from '../gym/gymEditor'
import Login from '../User/LoginPage'
import SignUp from '../User/signup'
import LandingPage from "./LandingPage"
import SignUpPage from '../User/SignUpPage'


import Footer from "../components/Footer/Footer.jsx";

import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';


class Home extends Component {

    render() {
        return (
            <Router>
                <div>
                    <div>
                        <div>

                        <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
                            <div className="container">
                                <Link className="navbar-brand" to={'/home'}>Fitness NetWork</Link>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"> </span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarResponsive">
                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <Link className="nav-link" to={'/signup'}>Sign Up</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to={'/login'}>Log In</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                        </div>
                        <Route path="/search"
                               component={api}>
                        </Route>


                        <Route path="/login"
                               component={Login}>
                        </Route>

                        {/*<Route path="/signup"*/}
                               {/*component={SignUp}>*/}
                        {/*</Route>*/}

                        <Route path="/signup"
                               component={SignUpPage}>
                        </Route>

                        <Route path="/about"
                               component={Wiki}>
                        </Route>

                        <Route path="/gym/:id"
                               component={gymEditor}>
                        </Route>


                        <Route path="/home"
                               component={LandingPage}>
                        </Route>

                        {/*<div path="">*/}
                             {/*<LandingPage />*/}
                        {/*</div>*/}







                        {/*<Link to={'/home'}>*/}
                            {/*home*/}
                        {/*</Link>|*/}

                        {/*<Link to={'/login'}>*/}
                            {/*login*/}
                        {/*</Link>|*/}
                        {/*<Link to={'/loginKen'}>*/}
                            {/*loginKen*/}
                        {/*</Link>|*/}

                        {/*<Link to={'/search'}>*/}
                            {/*search*/}
                        {/*</Link>|*/}



                        {/*<Link to={`/about`}>*/}
                             {/*about*/}
                        {/*</Link>*/}







                        {/*<div style ={{backgroundColor:'#708090'}}>*/}
                            {/*/!*yes it is*!/*/}
                            {/*<Footer whiteFont />*/}
                        {/*</div>*/}


                    </div>


                </div>


            </Router>


        )
    }

}

export default Home;