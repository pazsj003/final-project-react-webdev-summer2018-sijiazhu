import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Wiki from '../wiki/wiki'
import {Switch} from 'react-router'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import {FontAwesomeIcon} from '../../node_modules/@fortawesome/react-fontawesome'
import gymEditor from "../gym/gymEditor";
import Design from "../wiki/Design";
import yelp from './yelp'
const yelpApiKey = 'QpvQ6MkGeowXumpiefvYSloMnSCAQVa5ePt4FlNHwqHwc1GFUsKEkmMYbu54y4mprD-7xN-KdhX1sRO4OKLUb2jgf-Schxp3M_cBTZpL8yLRkdLO30GvKQGl03RIW3Yx'
'use strict';

// const yelp = require('yelp-fusion');

const client = yelp.client(yelpApiKey);

class api extends Component {

    constructor(props) {
        super(props);
        this.state = {

            gyms: [],
            reviews: [],
            location:'',
            matchLocation:'',
        }
        this.renderGym = this.renderGym.bind(this);
        this.yelpFetch = this.yelpFetch.bind(this);
        this.handleChange=this.handleChange.bind(this);
        // this.yelpFetch();


    }


    setGym(GYM) {
        this.setState({gyms: GYM})
        this.setState({matchLocation:this.state.location})

    }

    setReviews(Reviews) {
        this.setState({reviews: Reviews})

    }

    renderRate(rate) {
        switch (rate) {
            case 1:

            case 2:
                return ([

                        <span className="fa fa-star "
                              style={Styles.twoStarChecked}/>,
                        <span className="fa fa-star "
                              style={Styles.twoStarChecked}/>,
                        <span className="fa fa-star "
                              style={Styles.uncheck}/>,
                        <span className="fa fa-star "
                              style={Styles.uncheck}/>,

                        <span className="fa fa-star "
                              style={Styles.uncheck}
                        />,

                    ]
                )
                break;
            case 2.5:
                return ([

                        <span className="fa fa-star "
                              style={Styles.twoStarChecked}/>,
                        <span className="fa fa-star "
                              style={Styles.twoStarChecked}/>,
                        <span className="fa fa-star-half-full "
                              style={Styles.twoStarChecked}/>,
                        <span className="fa fa-star "
                              style={Styles.uncheck}/>,

                        <span className="fa fa-star "
                              style={Styles.uncheck}
                        />,

                    ]
                )
                break;


            case 3:
                return ([

                        <span className="fa fa-star "
                              style={Styles.threeStarChecked}/>,
                        <span className="fa fa-star "
                              style={Styles.threeStarChecked}/>,
                        <span className="fa fa-star "
                              style={Styles.threeStarChecked}/>,
                        <span className="fa fa-star "
                              style={Styles.uncheck}/>,

                        <span className="fa fa-star "
                              style={Styles.uncheck}
                        />,

                    ]
                )
                break;
            case 3.5:
                return ([

                        <span className="fa fa-star "
                              style={Styles.threeStarChecked}/>,
                        <span className="fa fa-star "
                              style={Styles.threeStarChecked}/>,
                        <span className="fa fa-star "
                              style={Styles.threeStarChecked}/>,
                        <span className="fa fa-star-half-empty"
                              style={Styles.threeStarChecked}/>,

                        <span className="fa fa-star "
                              style={Styles.uncheck}/>,

                    ]
                )
                break;
            case 4:
                return ([

                        <span className="fa fa-star "
                              style={Styles.fourStarChecked}/>,
                        <span className="fa fa-star "
                              style={Styles.fourStarChecked}/>,
                        <span className="fa fa-star "
                              style={Styles.fourStarChecked}/>,
                        <span className="fa fa-star "
                              style={Styles.fourStarChecked}/>,

                        <span className="fa fa-star "
                              style={Styles.uncheck}
                        />,

                    ]
                )
                break;

            case 4.5:
                return ([

                        <span className="fa fa-star "
                              style={Styles.fourStarChecked}/>,
                        <span className="fa fa-star "
                              style={Styles.fourStarChecked}/>,
                        <span className="fa fa-star "
                              style={Styles.fourStarChecked}/>,
                        <span className="fa fa-star "
                              style={Styles.fourStarChecked}/>,

                        <span className="fa fa-star-half-full "
                              style={Styles.fourStarChecked}
                        />,

                    ]
                )
                break;


            case 5:
                return ([

                        <span className="fa fa-star "
                              style={Styles.fiveStarChecked}/>,
                        <span className="fa fa-star "
                              style={Styles.fiveStarChecked}/>,
                        <span className="fa fa-star "
                              style={Styles.fiveStarChecked}/>,
                        <span className="fa fa-star "
                              style={Styles.fiveStarChecked}/>,

                        <span className="fa fa-star "
                              style={Styles.fiveStarChecked}
                        />,

                    ]
                )
                break;
        }

    }


    renderGym(gym, index) {


        return (
            <li style={{
                listStyle: 'none',
                margin: 20,
                borderBottom: '1px solid',
                borderColor: 'black',

            }}
                key={index}>
                <div className="row">
                    <div className="col-lg-2" style={{width: '18rem'}}>
                        <img className="card-img-top"
                             src={gym.image_url}
                             alt="Card image cap"
                             style={{
                                 width: 200,
                                 marginBottom: 20,
                                 borderRadius: 20
                             }}
                        />
                    </div>

                    <div className=" col-4">
                        <Link className="card-title"
                              style={Styles.gymName}
                              to={`/gym/${gym.id}`}
                              state={{gym:gym}}
                        >{gym.name}</Link>

                        <div style={{paddingTop: 10}}>
                            {this.renderRate(gym.rating)}
                        </div>

                    </div>

                    <div className=" col-4">

                        <p className="card-text"
                           style={{margin: 5}}>{gym.location.display_address[0]}</p>
                        <p className="card-text"
                           style={{margin: 5}}>{gym.location.display_address[1]}</p>
                        <p className="card-text"
                           style={{margin: 5}}>{gym.phone}</p>

                    </div>


                </div>


            </li>
        )

    }

    yelpReview(id, callback) {

        client.reviews(id).then(response => {
            // console.log(response);
            callback = response.jsonBody.reviews[0].text;
            console.log("reviews " + callback)
            // this.setReviews(response.jsonBody.reviews)
        }).catch(e => {
            console.log(e);
        });
    }

    yelpFetch() {
        if(this.state.location!==this.state.matchLocation){
            client.search({
                term: 'gyms',
                location: this.state.location
            }).then(response => {
                console.log(response);
                this.setGym(response.jsonBody.businesses)
            }).catch(e => {
                console.log(e);
            });
        }

    }

    handleChange(e) {
        this.setState({location: e.target.value });
    }


    render() {
        return (

            <Switch>
                <div>
                    <h1>Fitness network
                    </h1>
                    <h3>
                        Api Search
                    </h3>

                    <form>


                            <input
                                type="text"
                                // value={this.state.location}
                                placeholder="Address or zip code"
                                onChange={this.handleChange}
                            />

                        <button type="button"
                                className="btn btn-primary"
                                onClick={this.yelpFetch}>Search</button>
                    </form>

                    <div>
                        <ul>
                            {this.state.gyms.map((gym, index) => {
                                    return (
                                        this.renderGym(gym, index)
                                    )
                                }
                            )}

                        </ul>


                    </div>




                </div>


            </Switch>

        )
    }

}

export default api;

const Styles = {
    gymName: {
        fontSize: 20
    },

    fiveStarChecked: {
        margin: 2,
        padding: 3,
        border: '1px solid',
        borderColor: '#B22222',
        background: '#B22222',
        borderRadius: '5px',
        fontSize: '120%',
        color: 'white'

    },

    fourStarChecked: {
        margin: 2,
        padding: 3,
        border: '1px solid',
        borderColor: '#ff4d4d',
        background: '#ff4d4d',
        borderRadius: '5px',
        fontSize: '120%',
        color: 'white'

    },

    threeStarChecked: {
        margin: 2,
        padding: 3,
        border: '1px solid',
        borderColor: '#ff8000',
        background: '#ff8000',
        borderRadius: '5px',
        fontSize: '120%',
        color: 'white'

    },

    twoStarChecked: {
        margin: 2,
        padding: 3,
        border: '1px solid',
        borderColor: '#ffbf00',
        background: '#ffbf00',
        borderRadius: '5px',
        fontSize: '120%',
        color: 'white'

    },


    uncheck: {
        margin: 2,
        padding: 3,
        border: '1px solid',
        borderColor: 'lightGray',
        background: 'lightGray',
        borderRadius: '5px',
        fontSize: '120%',
        color: 'white'
    },

    halfChecked: {
        margin: 2,
        padding: 3,
        border: '1px solid',
        borderColor: '#B22222',
        background: '#B22222',
        borderRadius: '5px',
        fontSize: '120%',
        color: 'white'

    },

};