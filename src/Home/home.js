import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Wiki from '../wiki/wiki'
import api from '../Api/api'
import gymEditor from '../gym/gymEditor'

class Home extends Component {

    render() {
        return (
            <Router>
                <div>
                    <div>
                        <Link to={'/home'}>
                            home
                        </Link>|



                        <Link to={`/about`}>
                             about
                        </Link>

                        <Route path="/home"
                               component={api}>
                        </Route>



                        <Route path="/about"
                               component={Wiki}>
                        </Route>

                        <Route path="/gym/:id"
                               component={gymEditor}>
                        </Route>




                    </div>


                </div>


            </Router>


        )
    }

}

export default Home;