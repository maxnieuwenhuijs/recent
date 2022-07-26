import React, { Component } from "react";
import classes from "../navBar/navBar.module.css";
import axios from "axios";
import { getCookie } from "../../../util/getCookie";
import { createBrowserHistory } from 'history';
import { getPath, getBrand , getBrandAndExtension} from "../../../util/getPath";

let history = createBrowserHistory();

class navBar extends Component {

  Logout = () => {
    const response = fetch(`${getPath()}logout`, {
    method: "GET",
  }).then(response => {
    console.log('Logged out');
    localStorage.removeItem('paginate')
    window.location = '/'
  })
    .catch(error => {
      console.log('Logged out error')
    });
};

  render() {

    let cookieUser = getCookie('admin')

    let checkuser;

    if (cookieUser == 1) {
      checkuser = true
    } else {
      checkuser = false
    }
    let sessionID = getCookie('sessionID');

    if (!sessionID) {
        sessionID = '-'
    }

    return (
      <div id={'secondary-border'} className={classes.Navbar}>
        <a href="/">
          <img
            className={classes.Logo}
            src={`${getPath()}assets/brandSpecific/${getBrand()}/logo.png`}
          />
        </a>

        {checkuser ? <a href="/admin">Upload new course</a> : null} 
        <div className={classes.rightContainer}>
          <a className={classes.Link} href={`https://subscription.${getBrandAndExtension()}/account?sessionId=${sessionID}&cc=usen`}>My account</a>
          |
        <div id={'primary'} className={classes.Logout}>
          <a  onClick={this.Logout}>Logout</a>
        </div> 
        </div>
        
      </div>
    )
  }
}
export default navBar;
