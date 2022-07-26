import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory} from "react-router-dom";
import axios from "axios";
import Login from "./components/container/Login/Login";
import CoursesOverview from "./components/container/CourseOverview/CoursesOverview";
import UploadNewCourse from "./components/container/UploadNewCourse/UploadNewCourse";
import ProtectedRoute from "./ProtectedRoute";
import Footer from "./components/container/Footer/Footer";

import { getCookie } from "./util/getCookie";
import { getPath, getBrand } from "./util/getPath";
import { createBrowserHistory } from 'history';
let history = createBrowserHistory();

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedinStatus: "LOGGED_OUT",
      user: "",
      loading: true
    };
  }

  componentDidMount() {
    this.checkLoginStatus();
  }
  
  checkLoginStatus() {
    let cookieUser = getCookie('userStatus')

  var brandID = getBrand();
        
    console.log(brandID);
    
    function getUrlParameter(sParam) {
            var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
        };


        let languageCode = getUrlParameter('cc');
        
        var localLanguage = localStorage.getItem('localLanguage');


        console.log(localLanguage)

        if (!languageCode && !localLanguage ) {
            languageCode = ''
        } else if (!languageCode && localLanguage) {
            languageCode = localLanguage;
        } else {
            localStorage.setItem('localLanguage', languageCode);
        }

    
    if (cookieUser == "LOGGED_IN" && this.state.loggedinStatus == "LOGGED_OUT") {
      this.setState({
        loggedinStatus: "LOGGED_IN",
        loading: false
      });
      
      console.log('User is LOGGED_IN VIA COOKIE')
      
    } else if (brandID == 'mycoursey' && languageCode == 'fr') {
           this.setState({
        loggedinStatus: "LOGGED_IN",
        loading: false
      });
      
      console.log('User is LOGGED_IN VIA mycoursey FR')
    }
    else {
      this.setState({
        loggedinStatus: "LOGGED_OUT",
        loading: false
      });
      console.log('User is NOT LOGGED_IN')
      history.replace('/');
    }
  }

  checkLoggedInStatus = (data) => {
    console.log('Success :' + data)
    this.setState({
      loggedinStatus: data,
    });
  }

    setUserStatus = (data) => {
    console.log(data)
    this.setState({
      user: data,
    });

      // console.log(this.state.user.data[0].email)
  }

  render() {
    
    if (this.state.loggedinStatus == "LOGGED_OUT") {
      
      return (
        <Login loggedinStatus={this.checkLoggedInStatus} userData={this.setUserStatus} />
      )
    } else {
      return (
        <Router>
          <Switch>
            <ProtectedRoute  path="/" component={CoursesOverview} isAuthenticated={this.state.loggedinStatus} />
            </Switch>
            <Footer />
        </Router>
      );
    }
    
  }
}

export default App;
