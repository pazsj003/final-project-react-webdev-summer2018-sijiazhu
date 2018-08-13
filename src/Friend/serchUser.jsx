import React, {Component} from 'react'
import Input from "@material-ui/core/Input";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import UserServiceClient from "../Service/UserServiceClient";
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



const img =profile;


class serchUser extends Component {
    constructor(props) {

        super(props);
        this.state = {
            profile:'',
            searchUserName:'',
            checkFriend:false,
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
            friends: []
        }
        this.checkSearchFromOtherPage =this.checkSearchFromOtherPage.bind(this);
        this.userServiceClient = UserServiceClient.instance;
        this.friendServiceClient=FriendServiceClient.instance;
    }

    setUser(user){
        console.log("user login " + JSON.stringify(user));
        var Name=user.firstName+' ' +user.lastName ;
        this.setState({User:user})
        this.setState({name:Name})
        this.updateProfileImg(this.state.User.profileimg);
        this.findAllFriends(user);

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


    componentDidMount() {

        this.readProfile();
        this.checkSearchFromOtherPage();
        // this.findAllUsers();
        // this.findAllFriends()
    }

    checkSearchFromOtherPage(){
        console.log(" in search user from other check match proms user name " +  this.props.match.params.username);
       if( this.props.match.params.username !==undefined){
           this.setState(
               {SearchUser:{...this.state.SearchUser,username:this.props.match.params.username}}
               ,()=>{this.searchUser()}

               )
       }else{
           this.findAllUsers()
       }
    }

    goToUserProfile(user){

        this.props.history.push(`/user/${user.id}`)

    }

    findAllUsers() {
        console.log(" findAllUsers check  "  );
        this.userServiceClient
            .findAllUsers()
            .then(response=>this.setUsers(response));

    }
    setUsers(UserList){
        console.log("users " + JSON.stringify(UserList));
        this.setState({users:UserList})
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



    searchUser(){
        console.log("search user  " + JSON.stringify(this.state.SearchUser));
        this.userServiceClient
            .findUserByUsername(this.state.SearchUser)
            .then(response=>
                this.verifyUserFinder(response)

            )
    }
    verifyUserFinder(user){
        console.log("verifyUserFinder user in search user  " + JSON.stringify(user));
        if(user ===404){
            console.log("not found")
            alert("here are some recommend users")
            this.findAllUsers();
        }
        else{

            this.setUsers(user)
        }


    }

    setFriends(UserList){

        // console.log("set friend list  " + JSON.stringify(UserList));
        this.setState({friends:UserList})
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
    SearchFriend(){
        this.userServiceClient
            .findUserByUsername(this.state.currentUser)
            .then((response)=> {

                    this.verifyFinder(response)

                }

            )
    }
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




















    renderUsers(user,key){
        const { classes, ...rest } = this.props;
        const imageClasses = classNames(
            classes.imgRaised,
            classes.imgRoundedCircle,
            classes.imgFluid
        );

        let localProfileImg = img;
        var friendCheck = true;
        var localFriendCheck = this.state.friends;
        var checkselfProfile = true;
        if(user.id ===this.state.User.id){
            checkselfProfile = false;
        }else{
            for(let i =0; i<localFriendCheck.length;i++ ){
                if(localFriendCheck[i].id === user.id){
                    friendCheck= false;
                }
            }
        }



        if(user.profileimg !==null){
            console.log("yes inside " +user.profileimg);
            localProfileImg=user.profileimg

        }

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

                            onClick={() => this.goToUserProfile(user)}


                        >
                            <img className="nav-link"


                                 src={localProfileImg}
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
                            }}>{user.username}</h6>


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
                            {checkselfProfile &&
                            <div>
                                {friendCheck ? (
                                    <Button
                                        onClick={() => this.createFriendInfo(user)}
                                        round
                                        color="github"
                                        justIcon
                                        // link
                                        className={classes.margin5}>
                                        <PersonAdd
                                            style={{
                                                fontSize: 70,
                                            }}

                                            className={classes.inputIconsColor}/>

                                    </Button>
                                ) : (
                                    <Button
                                        // onClick={()=>this.createFriendInfo(user)}
                                        round
                                        color="github"
                                        justIcon
                                        // link
                                        className={classes.margin5}>
                                        <i className="fa  fa-user"/>
                                        {/*<PersonAdd*/}
                                        {/*style={{*/}
                                        {/*fontSize : 70,*/}
                                        {/*}}*/}

                                        {/*className={classes.inputIconsColor} />*/}

                                    </Button>


                                )

                                }
                            </div>
                            }


                            {/***************** delete button*/}
                            {/*<Button*/}
                            {/*justIcon*/}
                            {/*round*/}
                            {/*className={classes.margin5}*/}
                            {/*style={{*/}
                            {/*// width :'30px',*/}
                            {/*// marginTop:'20px',*/}
                            {/*opacity:'0.3',*/}


                            {/*}}*/}
                            {/*onClick={()=>this.deletePost()}*/}

                            {/*color="github">*/}
                            {/*<Clear className={classes.inputIconsColor} />*/}
                            {/*</Button>*/}
                        </div>



                    </div>

                </div>
            </div>

        )

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



                            {/***************** User List*/}
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

                                        {this.state.users
                                            .map((option, index) => {
                                                return (
                                                    this.renderUsers(option, index)


                                                )})}


                                    </div>


                                </div>

                            </GridContainer>






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


export default withStyles(profilePageStyle)(serchUser);
