import React from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BlockIcon from '@mui/icons-material/Block';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import LoadingBar from "../LoadingBar/LoadingBar";    
import ResponsiveAppBar from '../ResponsiveAppBar/ResponsiveAppBar'
import styled, { createGlobalStyle } from 'styled-components'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Stack from '@mui/material/Stack';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import InfoIcon from '@mui/icons-material/Info';
import ChatIcon from '@mui/icons-material/Chat';
import './getSingleProfile.css';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ping from '../../assets/ping.mp3';
import pop from '../../assets/pop.mp3';
import { getUserId, } from "../../util/getPath";
export default class PersonList extends React.Component {
    state = {
        profile: [],
        loading: true,
        imageUrls: [],
        matched: false,
        pinged: false,
    }

    componentDidMount() {
        const str = document.URL;
         const afterLastSlash = str.substring(str.lastIndexOf('/') + 1);
Promise.all([
          
        axios.get(`https://adminportal.dating/api/getprofile/${getUserId()}/${afterLastSlash}`)
            .then(res => {
                const profile = res.data;
                this.setState({
                    profile: profile,
                    member_id: afterLastSlash,
                    loading: false,
                });                
            }),
]).then(() => {
                 console.log(this.state.profile[0].status)    
                if (this.state.profile[0].status == null) {
                     console.log('null')
                } else if (this.state.profile[0].status == 0) {
                    this.setState({
                        matched: true
                    })
                }else if (this.state.profile[0].status == 3) {
                    this.setState({
                        matched: true,
                        pinged: true
                     })    
                }else if (this.state.profile[0].status == 4) {
                    this.setState({
                         pinged: true
                     })    
                }     
    });
  
    }

    getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

       interactWithProfile(member_id) {
           const user_id = getUserId();                 
           
           console.log('matched: ' + this.state.matched, 'pinged: ' +this.state.pinged)

            let status = 0;
            //Define status
            //0 = user liked profile
            //1 = profile liked user
            //2 = user & profile are matched
            //3 = user liked & pinged profile
            //4 = user Pinged profile
            //5 = profile pinged user
            //6 = profile liked and pinged user
            //7 = user blocked profile
            //8 = profile blocked user
           
           if (this.state.matched == true && this.state.pinged == false) {
               status = 0;
           } else if (this.state.matched == false && this.state.pinged == true) {
               status = 4;
           } else if (this.state.matched == true && this.state.pinged == true) {
               status = 3;
           }

           console.log(status)
        axios.get(`https://adminportal.dating/api/match/${user_id}/${member_id}/${status}`)
            .then(res => {
                
            }) ;
    }

    
    startChat(member_id) {
           const user_id = getUserId();                 
            axios.get(`https://adminportal.dating/api/startchat/${user_id}/${member_id}`)
            .then(res => {
                document.location = `/message/${member_id}`;
            }) ;
    }

playPing = () => {
    new Audio(`http://64.227.29.172/static/media/ping.a8c25648df1b6ae5dd91.mp3`).play();
    }
    
    playPop = () => {
    new Audio(`http://64.227.29.172/static/media/pop.a8aa2417b23c19076b9e.mp3`).play();
  }


    getImageCarousel(value) {
        let count = parseInt(value);
        if (count !== count) {
            return(
           <Carousel emulateTouch showIndicators={false} showArrows={false} showThumbs={false} axis={'vertical'} autoPlay >                                       
                    <img style={{width: 500}} src={`https://adminportal.dating/api/profile/${this.state.member_id}_0.jpg`} />                                                          
                </Carousel>
                                                                       
            )
        }

        else if (count == 1) {
            return(
            <Carousel emulateTouch showIndicators={false} showThumbs={false} axis={'vertical'} autoPlay autoPlay>
                <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_0.jpg`} />                                
            </Carousel>
                    )
        } if (count == 2) {
            return (
                <Carousel emulateTouch swipeable infiniteLoop showArrows={false} showThumbs={false} axis={'vertical'} autoPlay>
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_0.jpg`} />
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_1.jpg`} />
                </Carousel>
            )
        } else if (count == 3) {
            return (
                <Carousel emulateTouch swipeable infiniteLoop showArrows={false} showThumbs={false} axis={'vertical'} autoPlay axis={'vertical'} autoPlay>
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_0.jpg`} />
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_1.jpg`} />
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_2.jpg`} />
                </Carousel>
            )
        }else if (count == 4) {
            return (
                <Carousel emulateTouch swipeable infiniteLoop showArrows={false} showThumbs={false} axis={'vertical'} autoPlay>
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_0.jpg`} />
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_1.jpg`} />
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_2.jpg`} />
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_3.jpg`} />
                </Carousel>
            )
        }else if (count == 5) {
            return (
                <Carousel emulateTouch swipeable infiniteLoop showArrows={false} showThumbs={false} axis={'vertical'} autoPlay axis={'vertical'} autoPlay>
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_0.jpg`} />
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_1.jpg`} />
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_2.jpg`} />
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_3.jpg`} />
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_4.jpg`} />
                </Carousel>
            )
        }else if (count == 6) {
            return (
                <Carousel emulateTouch swipeable infiniteLoop showArrows={false} showThumbs={false} axis={'vertical'} autoPlay> 
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_0.jpg`} />
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_1.jpg`} />
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_2.jpg`} />
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_3.jpg`} />
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_4.jpg`} />
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_5.jpg`} />
                </Carousel>
            )
        }

        else if (count == 7) {
            return (
                <Carousel emulateTouch swipeable infiniteLoop showThumbs={false} showArrows={false} axis={'vertical'} autoPlay >
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_0.jpg`} />
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_1.jpg`} />
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_2.jpg`} />
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_3.jpg`} />
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_4.jpg`} />
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_5.jpg`} />
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_6.jpg`} />
                </Carousel>
            )
        }else if (count == 8) {
            return (
                <Carousel emulateTouch  swipeable infiniteLoop showThumbs={false} showArrows={false} axis={'vertical'} autoPlay >
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_0.jpg`} />
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_1.jpg`} />
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_2.jpg`} />
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_3.jpg`} />
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_4.jpg`} />
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_5.jpg`} />
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_6.jpg`} />
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_7.jpg`} />
                </Carousel>
            )
        }else if (count > 8) {
            return (
                <Carousel emulateTouch swipeable infiniteLoop showThumbs={false} showArrows={false} axis={'vertical'} autoPlay>
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_0.jpg`} />
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_1.jpg`} />
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_2.jpg`} />
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_3.jpg`} />
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_4.jpg`} />
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_5.jpg`} onError={({ currentTarget }) => {
                                                                    currentTarget.onerror = null; // prevents looping
                                                                    currentTarget.src = "https://adminportal.dating/api/profile/removed.png";
                                                                }}/>
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_6.jpg`} onError={({ currentTarget }) => {
                                                                    currentTarget.onerror = null; // prevents looping
                                                                    currentTarget.src = "https://adminportal.dating/api/profile/removed.png";
                                                                }}/>
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_7.jpg`} onError={({ currentTarget }) => {
                                                                    currentTarget.onerror = null; // prevents looping
                                                                    currentTarget.src = "https://adminportal.dating/api/profile/removed.png";
                                                                }}/>
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_8.jpg`} onError={({ currentTarget }) => {
                                                                    currentTarget.onerror = null; // prevents looping
                                                                    currentTarget.src = "https://adminportal.dating/api/profile/removed.png";
                                                                }}/>
                    <img src={`https://adminportal.dating/api/profile/${this.state.member_id}_9.jpg`} onError={({ currentTarget }) => {
                                                                    currentTarget.onerror = null; // prevents looping
                                                                    currentTarget.src = "https://adminportal.dating/api/profile/removed.png";
                                                                }}/>
                </Carousel>
            )
        }
     

    }

    render() {
      
        const loading = this.state.loading;
        const matched = this.state.matched;
        const pinged = this.state.pinged;
        
        return (
          
            <div>
                <ResponsiveAppBar />
               {loading ? (
                              <LoadingBar />
                        ) : (
                        <Container xs={12}  maxWidth="md">
                                <Box sx={{marginTop: 2}} container spacing={{ xs: 1, md: 1 }} columns={{ xs: 1, sm: 1, md: 1 }} >
                                    {
                                        this.state.profile
                                            .map(profile =>
                                                <Box sx={{ textAlign: 'left' }}>
                                                    <Card>
                                                        <Grid container spacing={2} direction="row" justifyContent="flex-start" alignItems="" >
                                                            <Grid item xs={5} sx={{width: 350, height: 500,}}>
                                                                {this.getImageCarousel(profile.photo_count)}
                                                            </Grid>
                                                            <Grid item xs={5}>
                                                               <Typography variant="h4" component="div">
                                                                    {profile.full_name} 
                                                                </Typography>
                                                                  
                                                            <Typography variant="overline" display="inline-block" color="text.secondary">({this.getAge(profile.birthdate)}) / {profile.gender} / {profile.city}, {profile.country}</Typography>
                                                                     <Divider />    
                                                              <Typography  variant="subtitle1" gutterBottom component="div">
                                                                    {profile.headline}
                                                                </Typography>

                                                              <List
                                                    sx={{
                                                    width: '100%',
                                                    maxWidth: 360,
                                                    bgcolor: 'background.paper',
                                                    }}
                                                    >
                                                    <ListItem disablePadding>
                                                    <ListItemAvatar>
                                                        <Avatar sx={{ width: 32, height: 32 }}>
                                                        <FavoriteIcon />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                            <ListItemText primary="Marital Status" secondary={profile.marital_status} />
                                                    </ListItem>
                                                    <ListItem disablePadding>
                                                    <ListItemAvatar>
                                                        <Avatar sx={{ width: 32, height: 32 }}>
                                                        <PersonSearchIcon />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                                        <ListItemText primary="Looking for" secondary={profile.looking_for + ", " + profile.seek_gender}   />
                                                    </ListItem>
                                                    <ListItem disablePadding>
                                                    <ListItemAvatar >
                                                        <Avatar sx={{ width: 32, height: 32 }}>
                                                        <BeachAccessIcon  />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                            <ListItemText primary="Drinking" secondary={profile.drink ? profile.drink : "-"} />
                                                            <ListItemText primary="Smoke" secondary={profile.smoke ? profile.smoke : "-"} />
                                                            <ListItemText primary="Religion" secondary={profile.religion ? profile.religion : "-"} />
                                                    </ListItem>
                                                    </List>    
                                                                    <Stack  align="center" direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />}>
                                                                    
                                                                    {!matched ? 
                                                                    <Button disableElevation sx={{ background: '#ffc5c1' }} size="medium" variant="contained" startIcon={<FavoriteIcon />} onClick={() => {
                                                                            this.playPop()
                                                                            this.setState({
                                                                                matched: true
                                                                            }, function () {this.interactWithProfile(this.state.member_id) })
                                                                            
                                                                        }}>Favorite</Button>
                                                                    : <Button disableElevation sx={{ background: '#ffc5c1' }} size="medium" variant="contained" startIcon={<FavoriteIcon />} disabled>ADDED</Button>}
                                                              
                                                                    <Button sx={{ color: '#ffc5c1', borderColor: '#ffc5c1' }} size="medium" variant="outlined" startIcon={<ChatIcon />} onClick={() => {
                                                                        this.startChat(this.state.member_id)
                                                                        }}>Message</Button>
                                                                 
                                                                    {!pinged ? 
                                                                        <Button color="secondary" size="medium" startIcon={<NotificationsNoneIcon />} onClick={() => {
                                                                            this.playPing()
                                                                            this.setState({
                                                                                pinged: true
                                                                            }, function () { this.interactWithProfile(this.state.member_id) })
                                                                        
                                                                        }}>Ping!</Button>
                                                                    : <Button size="medium" startIcon={<NotificationsActiveIcon  /> } disabled>PINGED!</Button>}
                                                                    </Stack>
                                                            
                                                 
                                                            </Grid>

                                                       
                                                            
                                                </Grid>                                                    
                                                        <Grid sx={{ padding: 5}} >
                                                            <Typography sx={{ display: 'inline' }} variant="h6" component="div">
                                                                 <InfoIcon  /> About me
                                                                </Typography>
                                                            <Typography  sx={{ mb: 1.5 }} color="text.secondary">
                                                                    {profile.description}
                                                            </Typography>
                                                                    <Divider />                                                 
                                                                <List>
                                                                    <ListItem>
                                                                    <ListItemText primary="I Speak" secondary={profile.language ? profile.language : "-"} />
                                                                    </ListItem>

                                                                    <ListItem>
                                                                         <ListItemText primary="Race" secondary={profile.race ? profile.race : "-"} />
                                                                    </ListItem>
                                                                    <ListItem>
                                                                         <ListItemText primary="Other info about me" secondary={profile.other_info? profile.other_info : "-"} />
                                                                    </ListItem>
                                
                                                                </List>
                                                       
                                                    </Grid>
                                                    </Card>
                                                    </Box>
                                                
                                            )
                                    }

                            </Box >

                            </Container>)}
        </div> 

    )
    
  }
}