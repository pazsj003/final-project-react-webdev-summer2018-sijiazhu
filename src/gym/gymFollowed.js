import React, {Component} from 'react'
import Input from "@material-ui/core/Input";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import UserServiceClient from "../Service/UserServiceClient";
import FriendServiceClient from "../Service/FriendServiceClient";


import { withRouter } from 'react-router';

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import Fitness from "@material-ui/icons/FitnessCenter";
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
import Clear from "@material-ui/icons/Clear";
import PersonAdd from "@material-ui/icons/PersonAdd";
// core components
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Button from "../components/CustomButtons/Button.jsx";
import GridContainer from "../components/Grid/GridContainer.jsx";
import GridItem from "../components/Grid/GridItem.jsx";
// import HeaderLinks from "components/Header/HeaderLinks.jsx";
// import NavPills from "../components/NavPills/NavPills.jsx";
import Parallax from "../components/Parallax/Parallax.jsx";

import profile from "../assets/img/faces/user01.png";


import {  Switch } from "react-router";


import profilePageStyle from "../assets/jss/material-kit-react/views/profilePage.jsx";
import GymServiceClient from "../Service/GymServiceClient";
import yelp from "./yelp";

const yelpApiKey = 'QpvQ6MkGeowXumpiefvYSloMnSCAQVa5ePt4FlNHwqHwc1GFUsKEkmMYbu54y4mprD-7xN-KdhX1sRO4OKLUb2jgf-Schxp3M_cBTZpL8yLRkdLO30GvKQGl03RIW3Yx'
'use strict';

const client = yelp.client(yelpApiKey);

const img =profile;
const gymclear =[];

class friends extends Component {
    constructor(props) {

        super(props);
        this.state = {
            gyms:[],

            gymIdList:[],
            checkFriend:false,
            authorization:false,
            name:'',
            users:[],
            User:{},
            friend:{
                id:1,
                userId:1,
            },
            SearchUser:{},
            currentUser: {
                // users:[],
                username: 'username',
                password: '',
                firstName: 'firstName',
                lastName: 'lastName',
                role: 'normal user',
                address: 'address',
                dateOfBirth: '',
            },
            currentUserName:'',
            currentUserprofile:'',
            friends: []
        }


        this.setGymsIdList=this.setGymsIdList.bind(this);
        this.userServiceClient = UserServiceClient.instance;
        this.friendServiceClient=FriendServiceClient.instance;
        this.gymServiceClient=GymServiceClient.instance;
    }


    goToFriends(){
        this.props.history.push(`/userpage/${this.state.currentUser.id}/friends`)
    }
    goToGyms(){
        this.props.history.push(`/userpage/${this.state.currentUser.id}/gyms`)
    }



    componentDidMount() {

        this.readProfile();
        this.readCurrentUser();
        // this.findAllUsers();
        // this.findAllFriends()
    }
//********************gym fucntion

    setGymsIdList(gymlist){

        console.log("set gym list  " + JSON.stringify(gymlist));
        this.setState({gymIdList:gymlist});
        this.findGymFromYelp(gymlist);
    }


    findGymFromYelp(gymlist){
        let gymsVariable=[];
        // console.log("gym detail  in find yelp"+ JSON.stringify(gymlist))
        gymlist.map((gym,key)=>{
            this.yelpFetch(gym)

        })


        // this.setState({gyms:gymsVariable});
        // console.log("after set gyms variable "+ JSON.stringify(this.state.gyms))

    }

    yelpFetch(gym) {

            client.business(
                gym.gymId
            ).then(response => {
                console.log(response);
                this.setGymFromYelp(response.jsonBody)
            }).catch(e => {
                console.log(e);
            });


    }

    setGym(GYM) {
        this.setState({gyms: GYM})
        this.setState({matchLocation:this.state.location})

    }


    setGymFromYelp(GYM) {
        console.log("gym detail "+ JSON.stringify(GYM))
        // gymsVariable.push(GYM);
        this.setState({gyms:[...this.state.gyms, GYM]});

        // this.setState({location: GYM.location.display_address})
        // this.setPhotos(GYM.photos)

        console.log("gym location in set gym yelp" + JSON.stringify(this.state.gyms));

    }


    goToGymProfile(gym){
        this.props.history.push(`/gym/${gym.id}`)
    }


    findAllGyms(user){
       this.setState({gyms:gymclear}) ;

        this.gymServiceClient
            .findAllGymsForUser(user.id)
            .then(response=>this.setGymsIdList(response));


    }

    deleteGym(gym){
        this.gymServiceClient
            .deleteGym(gym.id,this.state.User)
            .then(()=> {
                    return(
                        // alert("user Account with username " + user.username + " deleted"),
                        this.findAllGyms(this.state.User)
                    )
                }

            )
    }
    rendergyms(gym,key){
        const { classes, ...rest } = this.props;
        const imageClasses = classNames(
            classes.imgRaised,
            classes.imgRoundedCircle,
            classes.imgFluid
        );
        // let localProfileImg = img;
        // console.log("yes inside user list " +JSON.stringify(user));
        // if(user.profileimg !==null){
        //     console.log("yes inside " +user.profileimg);
        //     localProfileImg=user.profileimg
        //
        // }

        return(

            <div
                key={key}
                className="col-lg-6"
                style={{
                    marginLeft: '0px',
                    marginRight: '0px',
                    marginTop: '10px',
                    marginBottom: '10px'


                }}


            >
                <div
                    style={{

                        borderRadius: '25px',


                    }}

                    className="card">
                    <div


                        className="card-body">
                        {/***************** head button*/}
                        <Button


                            color='transparent'
                            style={{
                                Left: '50px',

                                // padding: '3px',
                                borderRadius: '12px',
                                // backgroundColor: 'Transparent',


                            }}

                            onClick={
                                () => this.goToGymProfile(gym)

                            }>
                            <img className="nav-link"


                                 src={gym.image_url}
                                 alt="..."
                                 style={{
                                     padding: '1px',
                                     height: '200px',
                                     width: '200px',
                                     borderRadius: '50%'
                                 }}

                            />
                            <h6 style={{
                                margin: '5px',
                                color: '#2F51D8'
                            }}>{gym.name}</h6>


                        </Button>
                        <p
                            className='float-none'
                            style={{
                                display:'inline',

                            }}>
                            {this.state.localtime}
                        </p>

{/***************** add Friend*/}
                        <div className='float-right'>



                            {/*</Button>*/}
                            {/***************** delete button*/}
                            { this.state.authorization &&<Button
                                justIcon
                                round
                                className={classes.margin5}
                                style={{
                                    // width :'30px',
                                    // marginTop:'20px',
                                    opacity: '0.3',


                                }}
                                onClick={() => this.deleteGym(gym)}

                                color="github">
                                <Clear className={classes.inputIconsColor}/>
                            </Button>
                            }
                        </div>



                    </div>

                </div>
            </div>

        )
    }

//********************profile fucntion
    backtoprofile(){

        this.props.history.push('/profile')
    }
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
        var Name=user.firstName+' ' +user.lastName ;
        this.setState({User:user})
        this.setState({name:Name})
        this.updateProfileImg(this.state.User.profileimg);




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


//********************user fucntion
    readCurrentUser() {
        console.log(" in  user from other check match proms user id " +  this.props.match.params.id);

        if (this.props.match.params.id !== undefined) {
            this.userServiceClient
                .findUserById(this.props.match.params.id)
                .then(user=>
                    this.checkUserprofile(user)
                )
        }
    }
    checkUserprofile(user){
        if(user ===404){

            this.props.history.push('/profile');

        }else {

            if (user.id === this.state.User.id) {

                this.setState({authorization: true});


            }
            this.setCurrentUser(user)
        }
    }


    setCurrentUser(user){
        console.log("current user info " + JSON.stringify(user));
        var Name=user.firstName+' ' +user.lastName ;
        this.setState({currentUser:user})
        this.setState({currentUserName:Name})
        this.updateCurrentUserProfileImg(user.profileimg);
        // this.findAllFriends(user);
        this.findAllGyms(user);

    }

    updateCurrentUserProfileImg(event){
        console.log("current user profile image   "  + event);

        if(event !==null){
            console.log("yes inside " +event);

            this.setState({currentUserprofile:event});
        }else{

            console.log("yes outside  "  + img);
            this.setState({currentUserprofile:img});
        }



    }



    findAllUsers() {

        this.userServiceClient
            .findAllUsers()
            .then(response=>this.setUsers(response));

    }
    setUsers(UserList){
        console.log("users " + JSON.stringify(UserList));
        this.setState({users:UserList})
    }



    goToUserProfile(user){

        this.props.history.push(`/user/${user.id}`)

    }

    searchUser(){

        this.props.history.push(`/usersearch/${this.state.SearchUser.username}`)

    }

    verifyUserFinder(user){
        if(user ===404){
            console.log("not found")
        }
        else{

            this.setUsers(user)
        }


    }
//********************friend fucntion
    setFriends(UserList){

        // console.log("set friend list  " + JSON.stringify(UserList));
        this.setState({friends:UserList})
    }



    deleteFriend(user){
        this.friendServiceClient
            .deleteFriend(user.id)
            .then(()=> {
                    return(
                        // alert("user Account with username " + user.username + " deleted"),
                        this.findAllFriends(this.state.User)
                    )
                }

            )
    }

    findAllFriends(user){

        this.friendServiceClient
            .findAllFriendForUser(user.id)
            .then(response=>this.setFriends(response));


    }

    AddFriend(friend){

        console.log("set user to friend after" + JSON.stringify(friend))

        this.friendServiceClient
            .addFriend(this.state.User.id,friend)
            .then(()=> {
                    return(
                        this.findAllFriends(this.state.User)
                    )
                }

            )
    }

    createFriendInfo(user){
        var ID=user.id
        console.log("set user to friend " + JSON.stringify(user))


        this.setState({
            friend:{
                ...this.state.friend,userId:ID
            }
        },()=>{
            this.AddFriend(this.state.friend);
        })



    }

    // SearchFriend(){
    //     this.userServiceClient
    //         .findUserByUsername(this.state.currentUser)
    //         .then((response)=> {
    //
    //                 this.verifyFinder(response)
    //
    //             }
    //
    //         )
    // }
    verifyFinder(user){

        if(user ===404){
            console.log("not found")
        }else{
            this.setFriends(user)
        }



    }

    updateForm(newState) {
        console.log("input " + JSON.stringify(newState))

        this.setState(newState);

    }

    logout(){
        this.userServiceClient
            .logout()
    }























    render()
    {
        const { classes, ...rest } = this.props;
        const imageClasses = classNames(
            classes.imgRaised,
            classes.imgRoundedCircle,
            classes.imgFluid
        );

        return(
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

                                        value={this.state.SearchUser.username}
                                        onChange={(event)=>this.updateForm({SearchUser:{...this.state.SearchUser,username:event.target.value}})}
                                        className="form-control"
                                        id="firstNameFld"
                                        placeholder="Search"/>


                                </li>


                            </ul>

                            <Button

                                color="transparent"
                                justIcon

                                onClick={()=>this.searchUser()}
                                className={classes.margin5}>
                                <i
                                    style={{
                                        color:'white',


                                    }}
                                    className="fa fa-search" >

                                </i>

                            </Button>


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
                {/***************** user profile pic and head*/}
                <Parallax small filter image={require("../assets/img/bg01.jpg")} />
                <div className={classNames(classes.main, classes.mainRaised)}>
                    <div>
                        <div className={classes.container}>
                            <GridContainer justify="center">
                                <GridItem xs={12} sm={12} md={6}>
                                    <div className={classes.profile}>
                                        <div>
                                            <img  src={this.state.currentUserprofile}
                                                  alt="..."
                                                  style={{
                                                      height: '150px',
                                                      width:'150px'
                                                  }}
                                                  className={imageClasses} />
                                        </div>
                                        <div className={classes.name}>
                                            <h3 className={classes.title}>{this.state.currentUserName}</h3>

                                            <Button
                                                round
                                                color="rose"
                                                // color="transparent"
                                                justIcon
                                                // link
                                                onClick={()=>this.goToGyms()}
                                                className={classes.margin5}>
                                                <i className="fa  fa-futbol-o" />

                                            </Button>
                                            Gyms
                                            <Button
                                                round
                                                // size="sm"
                                                color="transparent"
                                                justIcon
                                                // link
                                                onClick={()=>this.goToFriends()}
                                                className={classes.margin5}>
                                                <i className="fa fa-users" >

                                                </i>

                                            </Button>
                                            Following
                                        </div>
                                    </div>
                                </GridItem>
                            </GridContainer>
                            <div className={classes.description}>
                                <p>
                                    {this.state.currentUser.intro}
                                </p>
                            </div>

                            {/***************** User List*/}







                            {/***************** Friend List*/}


                            <GridContainer
                                style={{
                                    // width:'600px',
                                    marginTop: '100px',
                                    marginBottom: '50px',
                                    // borderRadius: '25px',
                                    // borderStyle: 'solid',
                                    // borderColor: '#DCDCDC',
                                    // borderWidth: '1px'


                                }}

                                justify="center">
                                <div className={classes.container}>


                                    <div


                                        className="row">

                                        {this.state.gyms
                                            .map((option, index) => {
                                                return (
                                                    this.rendergyms(option, index)


                                                )})}


                                    </div>


                                </div>

                            </GridContainer>









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

export default withStyles(profilePageStyle) (friends);

