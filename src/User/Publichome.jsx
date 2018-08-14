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

import {BrowserRouter as Router, Route, Link,Redirect} from 'react-router-dom'
import {  Switch } from "react-router";

import PostCreator from "../Widget/PostEditor";
import PostReader from "../Widget/PostReader";

import profilePageStyle from "../assets/jss/material-kit-react/views/profilePage.jsx";
import UserServiceClient from "../Service/UserServiceClient";
import PostServiceClient from "../Service/PostServiceClient";
import FriendServiceClient from "../Service/FriendServiceClient";



const img =profile
let  array = [];
class Publichome extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            SearchUser:{},
            profile:"",
            cardAnimaton: "cardHidden",
            User:{},
            name:'',
            posts:[{}],
            friends: [],
        };


        this.userServiceClient=UserServiceClient.instance;
        this.postServiceClient=PostServiceClient.instance;
        this.friendServiceClient=FriendServiceClient.instance;
        this.backtoprofile=this.backtoprofile.bind(this);

    }

    goToFriends(){
        this.props.history.push(`/userpage/${this.state.User.id}/friends`)
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
            var checkself=false;
            if(post.postuserId === this.state.User.id){
                checkself=true;
            }

            return(
                <GridContainer


                    key={key} justify="center">
                    <div
                        style={{paddingTop: '10px'}}
                        className={classes.container}>

                        <PostReader
                            deleteCallBack={this.deletePostCB}
                            checkSelf={checkself}
                            Post={post}
                            User ={this.state.User}
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
        array=[];
        console.log("inside read post check user Id " + this.state.User.id);
        this.state.friends.map((friend,key)=>{
            this.postServiceClient
                .findAllPostForUser(friend.id)
                .then(posts=>
                    this.PreSortPosts(posts))

        });


        this.postServiceClient
            .findAllPostForUser(this.state.User.id)
            .then(posts=> {
                return(

                    this.PreSortPosts(posts),
                    this.setPost(array)
                )
                }

            );





    }

    PreSortPosts(posts){


        for(let i=0;i<posts.length;i++){
            array.push(posts[i]);
        }
        console.log("add post in each friend and self " + JSON.stringify(array));

    }


    setPost(Posts){
        if(Posts!=null){
            console.log("read Post in profile set post " + JSON.stringify(Posts));

            Posts.sort((a,b)=>b.timeOrder-a.timeOrder);

            console.log("read Post in profile set post after sort" + JSON.stringify(Posts));
            this.setState({posts:Posts})
        }


    }
    componentDidMount() {

        this.readProfile();



    }
    findAllFriends(user){

        this.friendServiceClient
            .findAllFriendForUser(user.id)
            .then(response=>this.setFriends(response));


    }

    setFriends(UserList){

        // console.log("set friend list  " + JSON.stringify(UserList));
        this.setState({friends:UserList})
        this.readPost();
    }

    backtoprofile(){
        this.props.history.push('/profile');


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
            this.findAllFriends(user);
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
                                <div className={classes.container}>

                                    <PostCreator
                                        postcallBack={this.CallBackPost}
                                        profile={this.state.profile}
                                        User ={this.state.User}
                                    />

                                </div>

                            </GridContainer>




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

export default withStyles(profilePageStyle)(Publichome);
