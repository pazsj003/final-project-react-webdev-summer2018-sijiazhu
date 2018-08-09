import React from "react";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {  Switch } from "react-router";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import GroupAdd from "../../node_modules/@material-ui/icons/GroupAdd";
// core components
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import GridContainer from "../components/Grid/GridContainer.jsx";
import GridItem from "../components/Grid/GridItem.jsx";
import Button from "../components/CustomButtons/Button.jsx";
import HeaderLinks from "../components/Header/HeaderLinks.jsx";
import Parallax from "../components/Parallax/Parallax.jsx";

import landingPageStyle from "../assets/jss/material-kit-react/views/landingPage.jsx";

// Sections for this page
// import ProductSection from "./Sections/ProductSection.jsx";
import TeamSection from "./MemberSection.jsx";
import SignUpPage from "../User/SignUpPage";
// import WorkSection from "/WorkSection.jsx";

const dashboardRoutes = [];

class LandingPage extends React.Component {

    Login(){

          this.props.history.push('/login')

          {/*<Route path="/signup"*/}
                 {/*component={SignUpPage}>*/}
          {/*</Route>*/}

    }
  render() {
    const { classes, ...rest } = this.props;
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
                                  <Link className="nav-link" to={'/signup'}>Sign Up</Link>
                              </li>
                              <li className="nav-item">
                                  <Link className="nav-link" to={'/login'}>Log In</Link>
                              </li>
                          </ul>
                      </div>
                  </div>
              </nav>
          </div>
        {/*<Header*/}
          {/*color="transparent"*/}
          {/*routes={dashboardRoutes}*/}
          {/*brand="Material Kit React"*/}
          {/*// rightLinks={<HeaderLinks />}*/}
          {/*fixed*/}
          {/*changeColorOnScroll={{*/}
            {/*height: 400,*/}
            {/*color: "white"*/}
          {/*}}*/}
          {/*{...rest}*/}
        {/*/>*/}
        <div>
        <Parallax filter image={require("../assets/img/bg01.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>Your Story Starts With Us.</h1>
                <h5>
                    We're friendly people who care about your results and your gym experience.
                    We believe happy people are the healthiest.Fitness Network is an social network  to a global
                    network of 10,000 fitness gyms. Try strength
                    training, cycling and more.
                </h5>
                <br />
                  <Button
                      color="danger"
                      size="lg"

                      onClick={()=>this.Login()}
                      target="_blank"
                      rel="noopener noreferrer"
                  >
                      <GroupAdd className={classes.inputIconsColor} />
                     Join Us
                  </Button>

              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        </div>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            {/*<ProductSection />*/}
            <TeamSection />
            {/*<WorkSection />*/}
          </div>
        </div>


        <Footer />
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(LandingPage);
