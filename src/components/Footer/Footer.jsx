/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
import { List, ListItem, withStyles } from "../../../node_modules/@material-ui/core";

// @material-ui/icons
import Favorite from "../../../node_modules/@material-ui/icons/Favorite";

import footerStyle from "../../assets/jss/material-kit-react/components/footerStyle.jsx";

function Footer({ ...props }) {
  const { classes, whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a
                  href="https://github.com/pazsj003/final-project-react-webdev-summer2018-sijiazhu/wiki"
                className={classes.block}
                target="_blank"
              >
                Wiki Page
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://sijiazhu-homepage.herokuapp.com"
                className={classes.block}
                target="_blank"
              >
                About me
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a

                className={classes.block}
                target="_blank"
              >
                Blog
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a

                className={classes.block}
                target="_blank"
              >
                Licenses
              </a>
            </ListItem>
          </List>
        </div>
        <div className={classes.right}>
          &copy; {1900 + new Date().getYear()} , made{" "}
           by{" "}
          <a
            href="https://zhusijia.com"
            className={aClasses}
            target="_blank"
          >
             Ken Zhu
          </a>{" "}
           All Right Reserved
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  whiteFont: PropTypes.bool
};

export default withStyles(footerStyle)(Footer);
