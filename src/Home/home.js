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
import ProfilePage from '../User/ProfilePage'
import Publichome from '../User/Publichome'
import profileSetting from '../User/profileSetting'
import admin from '../User/admin'
import friends from '../Friend/friends'
import UserPage from '../Friend/UserPage'
import serchUser from '../Friend/serchUser'
import Footer from "../components/Footer/Footer.jsx";

import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';


class Home extends Component {

    render() {
        return (
            <Router>
                <div>
                    <div>

                        <Route path="/search"
                               component={api}>
                        </Route>


                        <Route path="/login"
                               component={Login}>
                        </Route>



                        <Route path="/signup"
                               component={SignUpPage}>
                        </Route>

                        <Route path="/admin"
                               component={admin}>
                        </Route>

                        <Route path="/about"
                               component={Wiki}>
                        </Route>

                        <Route path="/gym/:id"
                               component={gymEditor}>
                        </Route>

                        <Route path="/profile"
                               component={ProfilePage}>
                        </Route>

                        <Route path="/user/:id"
                               component={UserPage}>
                        </Route>

                        <Route path="/userpage/:id/friends"
                               component={friends}>
                        </Route>

                        <Route path="/usersearch/:username"
                               component={serchUser}>
                        </Route>


                        <Route path="/home"
                               component={LandingPage}>
                        </Route>
                        <Route path="/profilesetting"
                               component={profileSetting}>
                        </Route>

                        <Route path="/publichome"
                               component={Publichome}>
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
                            {/*yes it is*/}

                        {/*</div>*/}


                    </div>

                    {/*<Footer />*/}
                </div>


            </Router>


        )
    }

}

export default Home;