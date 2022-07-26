import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import Login from "./components/Login/Login";
import Dashboard from './components/dashBoard/dashBoard'
import PeopleLiked from './components/peopleLiked/peopleLiked'
import Profile from './components/getSingleProfile/getSingleProfile'
import UserProfile from './components/UserProfile/UserProfile'
import NewProfile from './components/NewProfile/NewProfile'
import ChatList from './components/ChatList/ChatList'
import Message from './components/Message/Message'
import { getCookie } from "./util/getCookie";
import { getPath, getBrand } from "./util/getPath";
import { getUserId } from "./util/getPath";
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

    document.title = "Find your next date with us!"
 


    let setUser = localStorage.getItem('user')

    if (setUser) {

      let setdatauser = JSON.parse(setUser)

      this.setState({
         user:  setdatauser,
        })
    }     

    this.checkLoginStatus();
    
  }
  
  checkLoginStatus() {
    let localUser = localStorage.getItem('userStatus');
       
    if (localUser == "LOGGED_IN" && this.state.loggedinStatus == "LOGGED_OUT") {
      localStorage.setItem('userStatus', 'LOGGED_IN')
      this.setState({
        loggedinStatus: "LOGGED_IN",
        loading: false
      });
      
      console.log('User is LOGGED_IN STORAGE')
      
    } else {
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

    localStorage.setItem('userStatus', 'LOGGED_IN')
    
  }

    setUserStatus = (data) => {
    this.setState({
      user: data,
    });

      console.log(this.state.user.data[0].email)
  }

  render() {

    
    if (this.state.loggedinStatus == "LOGGED_OUT") {
      
      return (
        <Login loggedinStatus={this.checkLoggedInStatus} userData={this.setUserStatus} />
      )
    } if (this.state.loggedinStatus == "NEW_USER" ) { 
      return (
        
        <Router>
          <Routes>
            <Route path="/" element={<NewProfile />} />
          </Routes>
      </Router>
      )
    }else {
      return (
       <Router history={history}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile/:user" element={<Profile />} />
          <Route path="/likes" element={<PeopleLiked />} />
          <Route path="/messages" element={<ChatList />} />
          <Route path="/message/:user" element={<Message />} />
          <Route path="/account-profile" element={<UserProfile />} />
          <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      );
    }
    
  }
}

export default App;
