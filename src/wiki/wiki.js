import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Research from "./Research";
import {Switch} from 'react-router'
class Wiki extends Component {
    render() {
        return (
            <Router>
                <div>


                    <h1>Final Project Wiki Page</h1>

                    <div>
                        <h2>Team Member </h2>


                        <body>sijia zhu(Ken)
                        <br/>
                        Email:zhu.sij@husky.neu.edu
                        <br/>
                        Web:zhusijia.com
                        <br/>
                        He is align program student who has architecture background. Before come to NEU, he was an
                        architect.
                        <br/>
                        he is interested in the product which have new technology with good design.
                        <br/>
                        In this project he will responsible for Front end and Back end.

                        </body>


                    </div>


                    <Link to={'/research'}>
                        Research
                    </Link>
                    <Route path="/research"
                           component={Research}>
                    </Route>


                </div>

            </Router>
        )


    }
}

export default Wiki;