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
// import HeaderLinks from "components/Header/HeaderLinks.jsx";
// import NavPills from "../components/NavPills/NavPills.jsx";
import Parallax from "../components/Parallax/Parallax.jsx";

import profile from "../assets/img/faces/user05.png";


import {  Switch } from "react-router";


import profilePageStyle from "../assets/jss/material-kit-react/views/profilePage.jsx";



class admin extends Component {
    constructor(props) {

        super(props);
        this.state={
            currentUser:{username:'username',
                password:'',
                firstName:'firstName',
                lastName:'lastName',
                role:'normal user',
                address:'address',
                dateOfBirth:'',},
                users:[]
        }
        this.userServiceClient=UserServiceClient.instance;
    }

    componentDidMount() {

        this.findAllUsers()
    }

    setUsers(UserList){
        console.log("users " + JSON.stringify(UserList));
        this.setState({users:UserList})
    }

    deleteUser(user){
        this.userServiceClient
            .deleteUser(user.id)
            .then(()=> {
                return(
                    alert("user Account with username " + user.username + " deleted"),
                        this.findAllUsers()
                )
                }

            )
    }
    CreateUser(){
        this.userServiceClient
            .register(this.state.currentUser)
            .then(()=> {
                    return(
                            this.findAllUsers()
                    )
                }

            )
    }
    SearchUser(){
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
            this.setUsers(user)
        }



    }

    UpdateUser(){
        this.userServiceClient
            .updateUser(this.state.currentUser.id,this.state.currentUser)
            .then((response)=> this.verifyUpdate(response)

            )
    }

    verifyUpdate(user){

        if(user ===409){

            console.log("same username used")
        }else{

            this.findAllUsers();

        }


    }

    editUser(user){

        console.log("current user  " + JSON.stringify(user))
       this.setState({currentUser:user})


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




    renderUsers(user,key){
       return(
           <tr key ={key} className="wbdv-template wbdv-user wbdv-hidden">
               <td className="wbdv-username">{user.username}</td>
               <td className="wbdv-password">*********</td>
               <td className="wbdv-first-name">{user.firstName}</td>
               <td className="wbdv-last-name">{user.lastName}</td>
               <td className="wbdv-role">{user.role}</td>
               <td className="wbdv-actions">
			   <span className="float-right" style={{whitespace: 'nowrap'}}>

			      <a id="wbdv-edit"
                     href="#"
                     style={styles.hrefstyle}
                     onClick={()=>this.editUser(user)}
                     className="fa-2x fa fa-pencil wbdv-edit"> </a>
                    <a id="wbdv-remove"
                       href="#"

                       onClick={()=>this.deleteUser(user)}
                       style={styles.hrefstyle}
                       className="fa-2x fa fa-trash-o "> </a>

           </span>
               </td>
           </tr>
       )

    }

    findAllUsers() {

        this.userServiceClient
            .findAllUsers()
            .then(response=>this.setUsers(response));

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
{/***************** Friend List*/}
                    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
                        <div className="container">
                            <Link className="navbar-brand" to={'/home'}>Fitness NetWork</Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"> </span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarResponsive">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <a className="nav-link" href="#" >Setting</a>
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
                <Parallax small filter image={require("../assets/img/bg02.jpg")} />
                {/*<div className={classNames(classes.main, classes.mainRaised)}>*/}
                    <div>
                        <div className={classes.container}>
                            <GridContainer justify="center">
                                <GridItem xs={12} sm={12} md={6}>
                                    <div className={classes.profile}>
                                        <div>
                                            <img  src={profile} alt="..." className={imageClasses} />
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
{/***************** User Admin*/}
                            <GridContainer justify="center">
                                <div className="container">


                                    <div>
                                        <h1 id="tittle">User Admin</h1>

{/***************** User table*/}
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th>Username</th>
                                                <th>Password</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Role</th>
                                                <th> </th>

                                            </tr>
                                            <tr className="wbdv-form">
                                                <td><Input id="userNameFld"

                                                           onChange={(event)=>this.updateForm({currentUser:{...this.state.currentUser,username:event.target.value}})}
                                                           value={this.state.currentUser.username}
                                                           className="form-control"
                                                           placeholder="Username"/></td>
                                                <td><Input id="passwordFld"
                                                           type="password"
                                                           onChange={(event)=>this.updateForm({currentUser:{...this.state.currentUser,password:event.target.value}})}
                                                           value={this.state.currentUser.password}
                                                           className="form-control"
                                                           placeholder="password"/></td>

                                                <td><Input id="firstNameFld"

                                                           onChange={(event)=>this.updateForm({currentUser:{...this.state.currentUser,firstName:event.target.value}})}
                                                           value={this.state.currentUser.firstName}
                                                           className="form-control"
                                                           placeholder="First Name"/></td>
                                                <td><Input id="lastNameFld"

                                                           onChange={(event)=>this.updateForm({currentUser:{...this.state.currentUser,lastName:event.target.value}})}
                                                           value={this.state.currentUser.lastName}
                                                           className="form-control"
                                                           placeholder="Last Name"/></td>
                                                <td><select id="roleFld"

                                                            onChange={(event)=>this.updateForm({currentUser:{...this.state.currentUser,role:event.target.value}})}
                                                            value={this.state.currentUser.role}
                                                            className="form-control">
                                                    <option value="normal user">normal user</option>
                                                    <option value="coach">coach</option>
                                                    <option value="admin">admin</option>

                                                </select></td>



                                                <td><span className="float-right" style={{whitespace: 'nowrap'}}>
                                                    <a id="wbdv-search"
                                                       href="#"
                                                       style={styles.hrefstyle}
                                                       onClick={()=>this.SearchUser()}
                                                       className="fa-2x fa fa-search wbdv-search"> </a>
                                                    <a id="wbdv-create"
                                                       href="#"
                                                       style={styles.hrefstyle}
                                                       onClick={()=>this.CreateUser()}
                                                       className="fa-2x fa fa-plus wbdv-create"> </a>
                                                    <a id="wbdv-update"
                                                       href="#"
                                                       style={styles.hrefstyle}
                                                       onClick={()=>this.UpdateUser()}
                                                       className="fa-2x fa fa-check wbdv-update"> </a>
                                                  </span>
                                                                                        </td>


                                            </tr>
                                            </thead>

                                            <tbody className="wbdv-tbody">
                                            {this.state.users
                                                .map((option, index) => {
                                                    return (
                                                        this.renderUsers(option, index)


                                                    )})}



                                            </tbody>
                                        </table>


                                    </div>




                                </div>

                            </GridContainer>












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
                {/*</div>*/}
                <Footer />



            </div>
        )

    }

}
export default withStyles(profilePageStyle)(admin);


const styles=({
    hrefstyle :{
    textDecoration: 'none',
    // color: 'blue'

    }



})