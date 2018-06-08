import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Wiki from '../wiki/wiki'
import Research from "../wiki/Research";

class Home extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Route path="/home"
                           component={Wiki}>
                    </Route>
                    <Route path="/research"
                           component={Research}>
                    </Route>
                </div>

            </Router>


        )
    }

}

export default Home;