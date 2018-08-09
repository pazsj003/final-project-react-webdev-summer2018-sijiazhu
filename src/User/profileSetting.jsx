import React, {Component} from 'react'
import Input from "@material-ui/core/Input";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import UserServiceClient from "../Service/UserServiceClient";



// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Button from "../components/CustomButtons/Button.jsx";
import GridContainer from "../components/Grid/GridContainer.jsx";
import GridItem from "../components/Grid/GridItem.jsx";
import CardFooter from "../components/Card/CardFooter.jsx";
// import HeaderLinks from "components/Header/HeaderLinks.jsx";
// import NavPills from "../components/NavPills/NavPills.jsx";
import Parallax from "../components/Parallax/Parallax.jsx";

import profile from "../assets/img/faces/user01.png";


import {  Switch } from "react-router";


import profilePageStyle from "../assets/jss/material-kit-react/views/profilePage.jsx";



class profileSetting extends Component {
    constructor(props) {

        super(props);
        this.state={
            profile:'../assets/img/faces/user05.png',
            name:'',
            currentUser:{
                username:'',
                password:'',
                firstName:'',
                lastName:'',
                role:'normal user',
                address:'',
                dateOfBirth:'',
                phone:'',
                email:'',
                intro:'',
                profileimg:'',

            },

            users:[]
        }
        this.userServiceClient=UserServiceClient.instance;
    }

    componentDidMount() {

        this.findAllUsers()
    }

    backtoprofile(){

        this.props.history.push('/profile')
    }

    setUser(user){
        console.log("user login " + JSON.stringify(user));
        var Name=user.firstName+' ' +user.lastName ;
        this.setState({currentUser:user})
        this.updateDate(this.state.currentUser.dateOfBirth);
        this.updateProfileImg(this.state.currentUser.profileimg);
        this.setState({name:Name})

    }


    componentDidMount() {

        this.readProfile();

    }


    readProfile(){
        this.userServiceClient
            .Profile()
            .then(user=>
                this.setUser(user)
            )
    }
    searchPeople(){

    }


    updateDate(event){

        if(event!=null){
            var dateStringArray= event.split('T');
            var date =dateStringArray[0];
            this.setState({date:date});
            console.log("current date 1 " + date);
            // var date = curr.toISOString();
            // console.log("current date 2" + date);
            this.setState({currentUser:{...this.state.currentUser,dateOfBirth:date}});
        }


    }


    updateProfileImg(event){
        console.log("profile image   "  + event);

        if(event !==null){
            console.log("yes inside " +event);

            this.setState({profile:event});
        }else{

            console.log("yes outside  "  + profile);
            this.setState({profile:profile});
        }



    }




    UpdateProfile(){
        this.userServiceClient
            .updateProfile(this.state.currentUser)
            .then((response)=> this.verifyUpdate(response)

            )
    }

    verifyUpdate(user){

        if(user ===409){

            console.log("same username used")
        }else{

            this.setUser(user);

        }


    }




    updateRole(option){

        this.setState({role : option});
        this.setState({User:{ ...this.state.User,  role : option.value}});

    }

    logout(){
        this.userServiceClient
            .logout()
    }



    updateForm(newState) {
        console.log("input " + JSON.stringify(newState))

        this.setState(newState);

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

                    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
                        <div className="container">
                            <Link className="navbar-brand" to={'/home'}>Fitness NetWork</Link>


                                <ul className="navbar-nav ml-auto ">
                                    <li className="nav-item  ">

                                    <input
                                        style={{

                                            height:'33px',
                                            width:'350px'}}



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
                                onClick={()=>this.searchPeople()}/>



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
                                            {this.state.currentUser.firstName}


                                        </Button>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link" to={'/profile'}>Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#" onClick={()=>this.logout()}>Log Out</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>

                <Parallax small filter image={require("../assets/img/bg02.jpg")} />
                {/*<div className={classNames(classes.main, classes.mainRaised)}>*/}
                    <div>
                <div className={classes.container}>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={6}>
                            <div className={classes.profile}>
                                <div>
                                    <img  src={this.state.profile}
                                          alt="..."
                                          style={{
                                              height: '150px',
                                              width:'150px'
                                          }}
                                          className={imageClasses} />
                                </div>
                                <div className={classes.name}>
                                    <h3 className={classes.title}>{this.state.name}</h3>

                                    <Button justIcon link className={classes.margin5}>
                                        <i className={"fa fa-twitter"} />
                                    </Button>
                                    <Button justIcon link className={classes.margin5}>
                                        <i className={"fa fa-instagram"} />
                                    </Button>
                                    <Button justIcon link className={classes.margin5}>
                                        <i className={"fa fa-facebook"} />
                                    </Button>
                                </div>
                            </div>
                        </GridItem>
                            </GridContainer>

                            <GridContainer justify="center">
                                <div className="container">


                            <div>


                                <div>
                                    <h1 id="tittle">Profile</h1>
                                    <form>
                                        <div className="form-group row">
                                            <label htmlFor="UsernameFld"
                                                   className="col-sm-2 col-form-label">Username
                                            </label>
                                            <div className="col-sm-10">
                                                <input type="text"
                                                       onChange={(event)=>this.updateForm({currentUser:{...this.state.currentUser,username:event.target.value}})}
                                                       value={this.state.currentUser.username}
                                                       className="form-control"
                                                       id="UsernameFld"
                                                       placeholder="User Name"
                                                       readOnly/>
                                            </div>
                                        </div>


                                        <div className="form-group row">
                                            <label htmlFor="firstNameFld"
                                                   className="col-sm-2 col-form-label">First Name
                                            </label>
                                            <div className="col-sm-10">
                                                <input type="text"
                                                       onChange={(event)=>this.updateForm({currentUser:{...this.state.currentUser,firstName:event.target.value}})}
                                                       value={this.state.currentUser.firstName}
                                                       className="form-control"
                                                       id="firstNameFld"
                                                       placeholder="First Name"/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="lastNameFld"
                                                   className="col-sm-2 col-form-label">Last Name
                                            </label>
                                            <div className="col-sm-10">
                                                <input type="text"
                                                       onChange={(event)=>this.updateForm({currentUser:{...this.state.currentUser,lastName:event.target.value}})}
                                                       value={this.state.currentUser.lastName}
                                                       className="form-control"
                                                       id="lastNameFld"
                                                       placeholder="Last Name"/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="Phone"
                                                   className="col-sm-2 col-form-label">Phone
                                            </label>

                                            <div className="col-sm-10">
                                                <input type="text"
                                                       onChange={(event)=>this.updateForm({currentUser:{...this.state.currentUser,phone:event.target.value}})}
                                                       value={this.state.currentUser.phone}
                                                       className="form-control"
                                                       id="Phone"
                                                       placeholder="Phone"/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="EmailFld"
                                                   className="col-sm-2 col-form-label">Email
                                            </label>
                                            <div className="col-sm-10">
                                                <input type="text"
                                                       onChange={(event)=>this.updateForm({currentUser:{...this.state.currentUser,email:event.target.value}})}
                                                       value={this.state.currentUser.email}
                                                       className="form-control"
                                                       id="EmailFld"
                                                       placeholder="email@example.com"/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="roleFld"
                                                   className="col-sm-2 col-form-label">Role
                                            </label>
                                            <div className="col-sm-10">
                                                <select id="roleFld"
                                                        onChange={(event)=>this.updateForm({currentUser:{...this.state.currentUser,role:event.target.value}})}
                                                        value={this.state.currentUser.role}
                                                        className="form-control">
                                                    <option value="normal user">normal user</option>
                                                    <option value="coach">coach</option>

                                                </select>
                                            </div>
                                        </div>


                                        <div className="form-group row">
                                            <label htmlFor="DateBirthFld"
                                                   className="col-sm-2 col-form-label">Date of Birth

                                            </label>
                                            <div className="col-sm-10">
                                                <input id="DateBirthFld"
                                                       onChange={(event)=>this.updateForm({currentUser:{...this.state.currentUser,dateOfBirth:event.target.value}})}

                                                       className="form-control"
                                                       type="date"
                                                       value={this.state.currentUser.dateOfBirth}
                                                       >
                                                </input>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="imgFld"
                                                   className="col-sm-2 col-form-label">profile picture Link
                                            </label>
                                            <div className="col-sm-10">
                                                <input type="text"
                                                       onChange={(event)=>this.updateForm({currentUser:{...this.state.currentUser,profileimg:event.target.value}})}
                                                       value={this.state.currentUser.profileimg}
                                                       className="form-control"
                                                       id="imgFld"
                                                       placeholder="www...jpg"/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="introFld"
                                                   className="col-sm-2 col-form-label">Introduction
                                            </label>
                                            <div className="col-sm-10">
                                                <textarea type="text"
                                                       onChange={(event)=>this.updateForm({currentUser:{...this.state.currentUser,intro:event.target.value}})}
                                                       value={this.state.currentUser.intro}
                                                       className="form-control"
                                                       id="introFld"
                                                       placeholder="Hi I am  designer"/>
                                            </div>
                                        </div>






                                        {/*<button id="updateBtn"*/}
                                                {/*type="button"*/}
                                                {/*className="update btn btn-primary btn-block">Update*/}
                                        {/*</button>*/}




                                    </form>



                                </div>




                            </div>




                                </div>
                                <Button
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center'

                                    }}
                                    type='button'
                                    onClick={() => this.UpdateProfile()}

                                    size="lg">
                                    Update
                                </Button>

                            </GridContainer>
                        </div>
                    </div>
                {/*</div>*/}
                <Footer />



            </div>
        )

    }

}
export default withStyles(profilePageStyle)(profileSetting);


const styles=({
    hrefstyle :{
    textDecoration: 'none',
    // color: 'blue'

    }



})