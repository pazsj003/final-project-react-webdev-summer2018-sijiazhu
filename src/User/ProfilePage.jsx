import React from "react";
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

import profile   from "../assets/img/faces/user01.png";

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {  Switch } from "react-router";


import profilePageStyle from "../assets/jss/material-kit-react/views/profilePage.jsx";
import UserServiceClient from "../Service/UserServiceClient";

const img =profile

class ProfilePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            profile:"",
            cardAnimaton: "cardHidden",
            User:{},
            name:'',
        };

        this.userServiceClient=UserServiceClient.instance;

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

    }

    backtoprofile(){

        this.props.history.push('/profile')
    }
    readProfile(){
        this.userServiceClient
            .Profile()
            .then(user=>
                this.setUser(user)
            )
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
                      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                          <span className="navbar-toggler-icon"> </span>
                      </button>
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

        <Parallax small filter image={require("../assets/img/bg01.jpg")} />
        <div className={classNames(classes.main, classes.mainRaised)}>
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
              <div className={classes.description}>
                <p>
                    {this.state.User.intro}
                </p>
              </div>
              <GridContainer justify="center">


              </GridContainer>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(profilePageStyle)(ProfilePage);
