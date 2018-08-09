import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import GridContainer from "../components/Grid/GridContainer.jsx";
import GridItem from "../components/Grid/GridItem.jsx";
import Button from "../components/CustomButtons/Button.jsx";
import Card from "../components/Card/Card.jsx";
import CardBody from "../components/Card/CardBody.jsx";
import CardFooter from "../components/Card/CardFooter.jsx";

import teamStyle from "../assets/jss/material-kit-react/views/landingPageSections/teamStyle.jsx";

import user1 from "../assets/img/faces/face01.jpg";
import user2 from "../assets/img/faces/face02.jpg";
import user3 from "../assets/img/faces/face03.jpg";

class MemberSection extends React.Component {
  render() {
    const { classes } = this.props;
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRoundedCircle,
      classes.imgFluid
    );
    return (
      <div className={classes.section}>
        <h2 className={classes.title}>Here is our user</h2>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={user1} alt="..." className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                    Grace C.
                  <br />
                  <small className={classes.smallTitle}>Model</small>
                </h4>
                <CardBody>
                  <p className={classes.description}>
                      The classes are always different and effective. I'm starting to see results and it hasn't even been a full 2 weeks.
                      My mental clarity has improved. I have more energy, I sleep better, and push myself to the limit. I FEEL AMAZING!!!
                      Sign up you won't regret it, my only regret is, I wish I knew about Fitness Network SOONER!!!
                  </p>
                </CardBody>

              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={user2} alt="..." className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                    George H
                  <br />
                  <small className={classes.smallTitle}>Designer</small>
                </h4>
                <CardBody>
                  <p className={classes.description}>
                      Definitely one of the most best social Fitness website
                      regarding the network as a whole. More weight, more reps, more miles
                      - how are you going to challenge yourself this week?.
                  </p>
                </CardBody>

              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={user3} alt="..." className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                    Eric S.
                  <br />
                  <small className={classes.smallTitle}>Singer</small>
                </h4>
                <CardBody>
                  <p className={classes.description}>
                      Great coaches who care about the success of their members,
                      a supportive community, tons of fun and smiles and very friendly and welcoming.
                      I've seen young children to seniors taking class, like one big family. You have to try it
                  </p>
                </CardBody>

              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(teamStyle)(MemberSection);
