import React from "react";
import {  Switch } from "react-router";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
// @material-ui/core components
import withStyles from "../../node_modules/@material-ui/core/styles/withStyles";
import InputAdornment from "../../node_modules/@material-ui/core/InputAdornment";
// @material-ui/icons
import Email from "../../node_modules/@material-ui/icons/Email";
import LockOutline from "../../node_modules/@material-ui/icons/LockOutlined";
import People from "../../node_modules/@material-ui/icons/People";
// core components
import Header from "../components/Header/Header.jsx";
import HeaderLinks from "../components/Header/HeaderLinks.jsx";
import Footer from "../components/Footer/Footer.jsx";
import GridContainer from "../components/Grid/GridContainer.jsx";
import GridItem from "../components/Grid/GridItem.jsx";
import Button from "../components/CustomButtons/Button.jsx";
import Card from "../components/Card/Card.jsx";
import CardBody from "../components/Card/CardBody.jsx";
import CardHeader from "../components/Card/CardHeader.jsx";
import CardFooter from "../components/Card/CardFooter.jsx";
import CustomInput from "../components/CustomInput/CustomInput.jsx";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";

import loginPageStyle from "../assets/jss/material-kit-react/views/loginPage.jsx";

import image from "../assets/img/bg05.jpg";
import UserServiceClient from "../Service/UserServiceClient";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered

    this.state = {
      cardAnimaton: "cardHidden",
        User:{},
        user:{}

    };
      this.userServiceClient=UserServiceClient.instance;
  }

  setUser(User){

      console.log("log in user begin " + JSON.stringify(User));
     this.setState({user:User});


      console.log("user set in2"  + JSON.stringify(this.state.user));

  }

  Login(user){
      console.log("user "  + JSON.stringify(user) );
      this.userServiceClient
          .login(user)
          .then((response)=>
              this.setUser(response)
          )

  }

    verifyLogin(response){
        if (response.ok) {

           var user = response.json();
            console.log("log in user " + JSON.stringify(user));
            this.setUser(user);

            alert("success Log In");




        }else if (response.status === 404){
            alert('username password dont match');

        }
        else {

            throw new Error('unknow error')
        }

    }
    updateRole(option){
        this.setState({role : option});
        this.setState({User:{ ...this.state.User,  role : option.value}});
    }



    updateForm(newState) {
        console.log("input " + JSON.stringify(newState))

        this.setState(newState);

    }


    componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  render() {
    const { classes, ...rest } = this.props;
    return (

      <div>
        {/*<Header*/}
          {/*absolute*/}
          {/*color="transparent"*/}
          {/*brand="Material Kit React"*/}
          {/*// rightLinks={<HeaderLinks />}*/}
          {/*{...rest}*/}
        {/*/>*/}
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader color="warning" className={classes.cardHeader}>
                      <h4>Login</h4>
                      <div className={classes.socialLine}>
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fa fa-twitter" />
                        </Button>
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fa fa-facebook" />
                        </Button>
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fa fa-google-plus" />
                        </Button>
                      </div>
                    </CardHeader>
                    <p className={classes.divider}>Or Be Classical</p>
                    <CardBody>
                        <FormControl fullWidth={true}>
                        <Input
                            placeholder="username"
                            style={{paddingTop:'20px'}}
                            onChange={text=>this.updateForm({User:{...this.state.User,username:text.target.value}})}
                            endAdornment={(
                                <InputAdornment position="end">
                                    <People className={classes.inputIconsColor} />
                                </InputAdornment>
                            )
                            }
                        />
                        <Input
                            placeholder="password"
                            style={{paddingTop:'20px'}}
                            onChange={text=>this.updateForm({User:{...this.state.User,password:text.target.value}})}
                            endAdornment={(
                                <InputAdornment position="end">
                                    <LockOutline className={classes.inputIconsColor} />
                                </InputAdornment>
                            )
                            }
                        />
                        </FormControl>


                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button
                          onClick={() => this.Login(this.state.User)}
                          simple color="primary"
                          size="lg">
                        Get started
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>




        </div>
          <Footer />
      </div>

    );
  }
}

export default withStyles(loginPageStyle)(LoginPage);
