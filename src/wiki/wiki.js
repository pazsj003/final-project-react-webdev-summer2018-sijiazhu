import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Research from "./Research";
import Design from "./Design";
import {Switch} from 'react-router'


class Wiki extends Component {
    render() {
        return (
            <Router>

                <div>
                    <div>

                        <h1>Final Project Wiki Page</h1>

                        <div>
                            <h2>Team Member </h2>


                            <div>
                            sijia zhu(Ken)
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

                            </div>


                        </div>


                    </div>

                <div>

                    <Link to={'/about/research'}>
                        Research
                    </Link> |

                    <Link to={'/about/design'}>
                        Design
                    </Link>

                    <Route path="/about/research"
                           component={Research}>
                    </Route>

                    <Route path="/about/design"
                           component={Design}>
                    </Route>

                     </div>

                    </div>

            </Router>
    )


    }
    }

    export default Wiki;