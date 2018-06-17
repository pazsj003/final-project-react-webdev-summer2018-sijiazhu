import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Wiki from '../wiki/wiki'
import Research from "../wiki/Research";
import Design from "../wiki/Design";

class Home extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Route path="/home"
                           component={Wiki}>
                    </Route>
                    <Link to={'/home/research'}>
                        Research
                    </Link> |
                    <Route path="/home/research"
                           component={Research}>
                    </Route>

                    <Link to={'/home/design'}>
                        Design
                    </Link>
                    <Route path="/home/design"
                           component={Design}>
                    </Route>
                </div>

            </Router>


        )
    }

}

export default Home;