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

import profilePageStyle from "../assets/jss/material-kit-react/views/profilePage";




import Input from "@material-ui/core/Input";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';


import UserServiceClient from "../Service/UserServiceClient";
import GymServiceClient from "../Service/GymServiceClient";
import FriendServiceClient from "../Service/FriendServiceClient";


// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Fitness from "@material-ui/icons/FitnessCenter";
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
import Clear from "@material-ui/icons/Clear";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Done from "@material-ui/icons/Done";
import Add from "@material-ui/icons/Add";

// core components
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Button from "../components/CustomButtons/Button.jsx";
import GridContainer from "../components/Grid/GridContainer.jsx";
import GridItem from "../components/Grid/GridItem.jsx";
// import HeaderLinks from "components/Header/HeaderLinks.jsx";
// import NavPills from "../components/NavPills/NavPills.jsx";
import Parallax from "../components/Parallax/Parallax.jsx";
// const yelp = require('yelp-fusion');
import profile from "../assets/img/faces/user01.png";

const img =profile;

const yelpApiKey = 'QpvQ6MkGeowXumpiefvYSloMnSCAQVa5ePt4FlNHwqHwc1GFUsKEkmMYbu54y4mprD-7xN-KdhX1sRO4OKLUb2jgf-Schxp3M_cBTZpL8yLRkdLO30GvKQGl03RIW3Yx'
'use strict';

const client = yelp.client(yelpApiKey);

class GymSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            SearchUser:{},
            gyms: [],
            reviews: [],
            location:'',
            matchLocation:'',
            User:{},
            gym:{},
            gymIdList: [],







        }
        this.renderGym = this.renderGym.bind(this);
        this.yelpFetch = this.yelpFetch.bind(this);
        this.handleChange=this.handleChange.bind(this);
        // this.yelpFetch();

        this.userServiceClient = UserServiceClient.instance;
        this.gymServiceClient=GymServiceClient.instance;



    }
    componentDidMount() {

        this.readProfile();
        // this.checkSearchFromOtherPage();
        // this.findAllUsers();
        // this.findAllFriends()
    }

//********************Services fucntion

    createGymInfo(gym){
        var ID=gym.id
        console.log("set user to gym " + JSON.stringify(gym))


        this.setState({
            gym:{
                ...this.state.gym,
                gymId:ID,
                userId:this.state.User.id
            }
        },()=>{
            this.FollowGym(this.state.gym);
        })
    }

    FollowGym(gym){
        console.log("set user to gym after" + JSON.stringify(gym))

        this.gymServiceClient
            .addGym(this.state.User.id,gym)
            .then((response)=> {
                    return(
                        this.setGymServer(response),
                        this.findAllGyms(this.state.User)
                    )
                }

            )
    }

    setGymServer(response){

    }
    setGymsIdList(gymlist){

        console.log("set gym list  " + JSON.stringify(gymlist));
        this.setState({gymIdList:gymlist})
    }





    findAllGyms(user){

        this.gymServiceClient
            .findAllGymsForUser(user.id)
            .then(response=>this.setGymsIdList(response));


    }

//********************User fucntion
    readProfile(){
        this.userServiceClient
            .Profile()
            .then(user=>
                this.checkprofile(user)
            )
    }
    checkprofile(user){
        if(user ===401){
            console.log("log out")
            this.props.history.push('/login');

        }else{
            this.setUser(user)

        }
    }

    setUser(user){
        console.log("user login " + JSON.stringify(user));
        // var Name=user.firstName+' ' +user.lastName ;
        this.setState({User:user})
        // this.setState({name:Name})
        this.updateProfileImg(this.state.User.profileimg);
        this.findAllGyms(user);

    }

    updateProfileImg(event){
        console.log("profile image   "  + event);

        if(event !==null){
            console.log("yes inside " +event);

            this.setState({profile:event});
        }else{

            console.log("yes outside  "  + img);
            this.setState({profile:img});
        }


    }
    backtoprofile(){

        this.props.history.push('/profile')
    }

    searchUser(){
        this.props.history.push(`/usersearch/${this.state.SearchUser.username}`)

    }
    updateForm(newState) {
        console.log("input " + JSON.stringify(newState))

        this.setState(newState);

    }

    logout(){
        this.userServiceClient
            .logout()
    }












//********************api fucntion


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
        const { classes, ...rest } = this.props;
        const imageClasses = classNames(
            classes.imgRaised,
            classes.imgRoundedCircle,
            classes.imgFluid
        );
        var gymCheck = true;
        var localgymCheck = this.state.gymIdList;
        // var checkselfProfile = true;
        // if(user.id ===this.state.User.id){
        //     checkselfProfile = false;
        // }else{

            for(let i =0; i<localgymCheck.length;i++ ){
                if(localgymCheck[i].gymId === gym.id){
                    gymCheck= false;
                }
            }
        // }

        return (
            <li style={{

                listStyle: 'none',
                margin: 20,
                borderBottom: '1px solid',
                // marginTop: '100px',
                // marginBottom: '50px',
                borderRadius: '25px',
                borderStyle: 'solid',
                borderColor: '#DCDCDC',
                borderWidth: '1px'




            }}
                key={index}>
                <div
                    style={{

                        // listStyle: 'none',
                        margin: '10px',
                        marginTop: '20px',
                        // borderBottom: '1px solid',
                        // // marginTop: '100px',
                        // // marginBottom: '50px',
                        // borderRadius: '25px',
                        // borderStyle: 'solid',
                        // borderColor: '#DCDCDC',
                        // borderWidth: '1px'




                    }}

                    className="row">
                    <div className="col-4" style={{width: '18rem'}}>
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
                        <div className="float-right">
                        <p className="card-text"
                           style={{margin: 5}}>{gym.location.display_address[0]}</p>
                        <p className="card-text"
                           style={{margin: 5}}>{gym.location.display_address[1]}</p>
                        <p className="card-text"
                           style={{margin: 5}}>{gym.phone}</p>

                            <div>
                                {gymCheck ? (
                                    <Button
                                        onClick={() => this.createGymInfo(gym)}
                                        // round
                                        color="warning"
                                        justIcon
                                        // link
                                        // size="lg"
                                        className={classes.margin5}>
                                        <Add
                                            style={{
                                                color:'white',
                                                // fontSize: 70,
                                            }}

                                            className={classes.inputIconsColor}/>

                                    </Button>
                                ) : (
                                    <Button
                                        // onClick={()=>this.createFriendInfo(user)}
                                        // round
                                        color="warning"
                                        justIcon
                                        // link
                                        // size="lg"
                                        className={classes.margin5}>
                                        <Done
                                            style={{
                                                // fontSize: '100px',
                                                color:'white',

                                            }}

                                            className={classes.inputIconsColor}/>

                                    </Button>


                                )

                                }
                            </div>

                        </div>
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

    setGym(GYM) {
        this.setState({gyms: GYM})
        this.setState({matchLocation:this.state.location})

    }

    handleChange(e) {
        this.setState({location: e.target.value });
    }









    render() {

        const { classes, ...rest } = this.props;
        const imageClasses = classNames(
            classes.imgRaised,
            classes.imgRoundedCircle,
            classes.imgFluid
        );


        return (

            <div>
            <div>

{/***************** NavBar*/}
                <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
                    <div className="container">
                        <Link className="navbar-brand" to={'/publichome'}>Fitness NetWork</Link>
                        <Link
                            style={{
                                color: 'white',
                            }}

                            className="nav-link"

                            to={'/gymsearch'}>
                            <Fitness className={classes.inputIconsColor}/>

                        </Link>
                        <ul className="navbar-nav ml-auto ">
                            <li className="nav-item  ">
{/***************** Search User*/}
                                <input
                                    style={{

                                        height:'33px',
                                        width:'350px'}}

                                    value={this.state.SearchUser.userName}
                                    onChange={(event)=>this.updateForm({SearchUser:{...this.state.SearchUser,username:event.target.value}})}
                                    className="form-control"
                                    id="firstNameFld"
                                    placeholder="Search"/>


                            </li>


                        </ul>

                        <a  style={{

                            marginLeft:'20px',
                            color: 'white',
                            textDecoration: 'none',

                        }}
                            className=" fa fa-search"
                            href="#"
                            onClick={()=>this.searchUser()}/>


                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Button
                                        style={{
                                            padding: '3px',
                                            borderRadius: '12px',
                                            backgroundColor: 'Transparent',



                                        }}

                                        onClick={()=>this.backtoprofile()}>
                                        <img  className="nav-link"


                                              src={this.state.profile}
                                              alt="..."
                                              style={{
                                                  padding:'1px',
                                                  height: '30px',
                                                  width:'30px',
                                                  borderRadius: '50%'
                                              }}

                                        />
                                        {this.state.User.firstName}


                                    </Button>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={'/profilesetting'}>Setting</Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" onClick={()=>this.logout()}>Log Out</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>


{/***************** background pic and head*/}
                <Parallax small filter image={require("../assets/img/bg01.jpg")} />
                <div className={classNames(classes.main, classes.mainRaised)}>
                    <div>
                        <div className={classes.container}>



{/***************** Gym List*/}
                            {/*<GridContainer*/}
                                {/*style={{*/}
                                    {/*// width:'1500px',*/}
                                    {/*marginTop: '100px',*/}
                                    {/*marginBottom: '50px',*/}
                                    {/*borderRadius: '25px',*/}
                                    {/*borderStyle: 'solid',*/}
                                    {/*borderColor: '#DCDCDC',*/}
                                    {/*borderWidth: '1px'*/}


                                {/*}}*/}

                                {/*justify="center">*/}



                                <div
                                    style={{
                                    marginTop: '100px',
                                    marginLeft: '100px',
                                    // marginRight: '100px',
                                    marginBottom: '50px',
                                    }}

                                    className={classes.container}>

                                    <GridContainer
                                        style={{marginTop: '100px',
                                                // marginLeft:'100px',
                                            marginBottom: '50px'

                                        }}

                                        justify="center">
                                        <div
                                            style={{
                                                display: 'inline',
                                                marginTop: '50px',
                                                marginLeft: '200px',
                                                // marginRight: '100px',
                                                marginBottom: '50px',
                                            }}


                                            className={classes.container}>




                                            <div className="navbar-brand"  >Gym Search</div>

                                            <form
                                                style={{
                                                    display: 'inline',
                                                    marginLeft: '20px',
                                                    // color: 'black',
                                                    // textDecoration: 'none',
                                                }}
                                                // className='form-control'
                                            >


                                                <input
                                                    style={{
                                                        display: 'inline',
                                                        height:'33px',
                                                        width:'350px'}}
                                                    type="text"
                                                    className="form-control"
                                                    // value={this.state.location}
                                                    placeholder="Address or zip code"
                                                    onChange={this.handleChange}
                                                />
                                                <a  style={{
                                                    display: 'inline',
                                                    marginLeft:'20px',
                                                    color: 'black',
                                                    textDecoration: 'none',

                                                }}
                                                    className=" fa fa-search"
                                                    href="#"
                                                    onClick={this.yelpFetch}/>


                                            </form>

                                        </div>

                                    </GridContainer>


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

                            {/*</GridContainer>*/}

{/***************** Friend List*/}












                        </div>

                    </div>

                    <GridContainer
                        style={{marginTop: '100px',
                            marginBottom: '50px'

                        }}

                        justify="center">
                        <div className={classes.container}>

                            <br/>

                        </div>

                    </GridContainer>
                </div>

                <Footer />
            </div>








        )
    }

}


export default withStyles(profilePageStyle)(GymSearch);
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