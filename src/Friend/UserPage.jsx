import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
import Fitness from "@material-ui/icons/FitnessCenter";
// core components
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Button from "../components/CustomButtons/Button.jsx";
import GridContainer from "../components/Grid/GridContainer.jsx";
import GridItem from "../components/Grid/GridItem.jsx";
// import HeaderLinks from "components/Header/HeaderLinks.jsx";
// import NavPills from "../components/NavPills/NavPills.jsx";
import Parallax from "../components/Parallax/Parallax.jsx";

import profile   from "../assets/img/faces/user01.png";

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {  Switch } from "react-router";

import PostCreator from "../Widget/PostEditor";
import PostReader from "../Widget/PostReader";

import profilePageStyle from "../assets/jss/material-kit-react/views/profilePage.jsx";
import UserServiceClient from "../Service/UserServiceClient";
import PostServiceClient from "../Service/PostServiceClient";

const img =profile

class UserPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            checkSelf:true,
            SearchUser:{},
            profile:"",
            cardAnimaton: "cardHidden",
            User:{},
            name:'',
            currentUserName:'',
            currentUserprofile:'',
            currentUser:{},
            posts:[{}],
        };


        this.userServiceClient=UserServiceClient.instance;
        this.postServiceClient=PostServiceClient.instance;

    }

    componentDidMount() {

        this.readProfile();
        this.readCurrentUser();



    }

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

        }else if(user.id === this.state.User.id){

            this.props.history.push('/profile');
        }

        else{
            this.setState({checkSelf:false});
            this.setCurrentUser(user)
        }
    }


    setCurrentUser(user){
        console.log("current user info " + JSON.stringify(user));
        var Name=user.firstName+' ' +user.lastName ;
        this.setState({currentUser:user})
        this.setState({currentUserName:Name})
        this.updateCurrentUserProfileImg(user.profileimg);

        this.readPost();
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



    goToFriends(){
        this.props.history.push(`/userpage/${this.state.currentUser.id}/friends`)
    }



    logout(){
        this.userServiceClient
            .logout()
    }


    setUser(user){
        console.log("user login " + JSON.stringify(user));
        var Name=user.firstName+' ' +user.lastName ;
        this.setState({User:user})
        this.setState({name:Name})
        this.updateProfileImg(this.state.User.profileimg);

        // this.readPost();


    }
    updateForm(newState){
        this.setState(newState);
    }

    deletePostCB =(postId)=>{

        this.postServiceClient
            .deletePost(postId)
            .then(()=>this.readPost())
    }

    renderPost(post, key){
        if(post!=null){
            const { classes, ...rest } = this.props;
            return(
                <GridContainer


                    key={key} justify="center">
                    <div
                        style={{paddingTop: '10px'}}
                        className={classes.container}>

                        <PostReader
                            deleteCallBack={this.deletePostCB}
                            checkSelf={this.state.checkSelf}
                            Post={post}
                            User ={this.state.currentUser}
                        />

                    </div>

                </GridContainer>
            )
        }
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


    searchUser(){
        this.props.history.push(`/usersearch/${this.state.SearchUser.username}`)

    }

    CallBackPost=(post)=>{

        console.log("read Post from callback " + JSON.stringify(post));
        this.setState({posts:[...this.state.posts,post]});

        this.setPost(this.state.posts);
        console.log("new posts after   callback " + JSON.stringify(this.state.posts));


    }

    readPost(){
        console.log("inside read post check user Id " + this.state.currentUser.id);
        this.postServiceClient
            .findAllPostForUser(this.state.currentUser.id)
            .then(posts=>
                this.setPost(posts))
    }


    setPost(Posts){
        if(Posts!=null){
            console.log("read Post in profile set post " + JSON.stringify(Posts));

            Posts.sort((a,b)=>b.timeOrder-a.timeOrder);

            console.log("read Post in profile set post after sort" + JSON.stringify(Posts));
            this.setState({posts:Posts})
        }


    }



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

    render() {
        const { classes, ...rest } = this.props;
        const imageClasses = classNames(
            classes.imgRaised,
            classes.imgRoundedCircle,
            classes.imgFluid
        );
        const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
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

                                    <input
                                        style={{

                                            height:'33px',
                                            width:'350px'}}

                                        value={this.state.SearchUser.username}
                                        onChange={(event)=>this.updateForm(
                                            {SearchUser:{...this.state.SearchUser,username:event.target.value}})}

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
{/***************** background pic and head*/}
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
                                                color="transparent"
                                                justIcon
                                                // link
                                                className={classes.margin5}>
                                                <i className="fa  fa-futbol-o" />

                                            </Button>
                                            Gyms
                                            <Button
                                                round
                                                // size="sm"
                                                color="transparent"
                                                justIcon
                                                onClick={()=>this.goToFriends()}
                                                // link
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
{/***************** PostCreator*/}





{/***************** PostReader*/}

                            {this.state.posts.map((post,key)=>{

                                return(

                                    this.renderPost(post,key)

                                )}

                            )}



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
        );
    }
}

export default withStyles(profilePageStyle)(UserPage);
