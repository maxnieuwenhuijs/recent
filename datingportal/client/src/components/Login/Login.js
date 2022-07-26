import React, { Component } from "react";
// import classes from "./Login.module.css";
import { getPath, getBrand } from "../../util/getPath";
import axios from "axios";
import { createBrowserHistory } from 'history';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Formlabel from "@material-ui/core/FormLabel";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Grid';
import Container from  '@mui/material/Container';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import { getUserId } from "../../util/getPath";

let history = createBrowserHistory();

class Login extends Component {
    constructor() {
        super();
        this.state = {
            errorMessage: "",
            text: '',
            log_in: false
        };
    }
    handleSubmit = (e) => {
        this.setState({
            log_in: true
        })

        e.preventDefault();
        const response = fetch(`https://adminportal.dating/api/login/`, {
        // const response = fetch(`http://localhost:8080/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state.user),
        }).then(response => response.json())
            .then(data => { 
               

                let user = JSON.stringify(data)

                console.log(data)
                localStorage.setItem('user', user);

                console.log(data[0].new)

                if (data[0].new == 1) {
                    console.log('NEW_USER')
                    this.props.loggedinStatus('NEW_USER');
                } else if (data[0].status == 1) { 
                    console.log('subscribed user');
                     this.props.loggedinStatus('NEW_USER');
                }else {


        axios.get(`https://adminportal.dating/api/getprofile/${getUserId()}/${getUserId()}`)
            .then(res => {
                const profile = res.data;
                this.setState({
                    profile: profile,
                    full_name: profile[0].full_name,
                    headline: profile[0].headline,
                    description: profile[0].description,
                    birthdate: profile[0].birthdate,
                    gender: profile[0].gender,
                    marital_status: profile[0].marital_status,
                    looking_for: profile[0].looking_for,
                    language: profile[0].language,
                    race: profile[0].race,
                    religion: profile[0].religion,
                    drink: profile[0].drink,
                    smoke: profile[0].smoke,
                    other_info: profile[0].other_info,
                    country: profile[0].country,
                    state: profile[0].state,
                    city: profile[0].city,
                    zip: profile[0].zip,
                    age_to: profile[0].age_to,
                    age_from: profile[0].age_from,
                    seek_gender: profile[0].seek_gender,
                })
                

               const userProfileState =
                {
                    "full_name": `${this.state.full_name}`,
                    "headline": `${this.state.headline}`,
                    "description": `${this.state.description}`,
                    "birthdate": `${this.state.birthdate}`,
                    "gender": `${this.state.gender}`,
                    "marital_status": `${this.state.marital_status}`,
                    "looking_for": `${this.state.looking_for}`,
                    "language": `${this.state.language}`,
                    "race": `${this.state.race}`,
                    "religion": `${this.state.religion}`,
                    "drink": `${this.state.drink}`,
                    "smoke": `${this.state.smoke}`,
                    "other_info": `${this.state.other_info}`,
                    "country": `${this.state.country}`,
                    "state": `${this.state.state}`,
                    "city": `${this.state.city}`,
                    "zip": `${this.state.zip}`,
                    "age_to": `${this.state.age_to}`,
                    "age_from": `${this.state.age_from}`,
                    "seek_gender": `${this.state.seek_gender}`,
                };

               
                var user = JSON.stringify(userProfileState)
                localStorage.setItem(`userProfile`, user);

                this.props.loggedinStatus('LOGGED_IN')
                this.props.userData({ data })
                history.push ='/'
            })

                    
                }
            })
            .catch(error => { 
                console.log('user not found')
                this.setState({
                    errorMessage: 'Please fill in the correct credentials.',
                    log_in: false
                });

            });
    };

    componentDidMount() {
        axios.get(`${getPath()}brandSpecific/${getBrand()}/locale.json`).then((res) => {
            this.setState({
                text: res.data
            })
        });
    }

    changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            user: {
                ...this.state.user,
                [name]: value,
            },
        });
    };

    render() {


        var errorMessage = this.state.errorMessage;
        let subtitle = this.state.text.subtitle;
        const log_in = this.state.log_in

        return (
           

                    <Card sx={{ minWidth: 275 }} style={{
                background: `url(${getPath()}brandSpecific/${getBrand()}/bg.jpg)`, backgroundSize: "cover", minHeight: "100vh" }}>
                        <CardContent>
                        <Grid container spacing={1} justifyContent="center" spacing={1}>
                            <Grid item >
          
                    <img style={{width: "200px"}} src={`${getPath()}brandSpecific/${getBrand()}/logo.png`}/>
                    <h3>{subtitle}</h3>
            
                    <form onSubmit={this.handleSubmit}>
                    <FormControl >
        <Typography variant="subtitle1" gutterBottom component="div">                          
     Please sign in to continue     </Typography>  
                        <Formlabel>Login
          </Formlabel>
                              <TextField  sx={{marginTop: 2}} required id="outlined-basic" type="text"  name="username" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" label="Username" variant="outlined" value={this.state.username} onChange={this.changeHandler}/>
                            <TextField sx={{marginTop: 2}} required id="outlined-basic" type="password" name="password" label="Password" variant="outlined" value={this.state.password} onChange={this.changeHandler}/>

                                                    {!log_in ? 
                        <Button size="large" sx={{marginTop: 2}} id={'primary'} variant="contained" color="primary" type="submit" >Login</Button>
                   :  <LoadingButton sx={{marginTop: 2}} size="large"
        loading
        loadingPosition="end"
        variant="outlined"
      >
        Logging in...
      </LoadingButton>}
                        </FormControl>
                    </form>
                
                                          
       <Grid item >
          
                        {errorMessage ?
                                                 <Alert sx={{marginTop: 2, maxWidth:200}} severity="error">{this.state.errorMessage}</Alert>
                                                 : null}
                            </Grid>
                        </Grid>
                         
                              </Grid>
                        </CardContent>
                    </Card>
    


        );
    }
}
export default Login;