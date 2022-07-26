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
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import InfoIcon from '@mui/icons-material/Info';
import ChatIcon from '@mui/icons-material/Chat';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { getUserId } from "../../util/getPath";
import Badge from '@mui/material/Badge';
import { fontStyle } from '@mui/material/node_modules/@mui/system';
import send from '../../assets/send.mp3';

export default class PersonList extends React.Component {
    state = {
        profiles: [],
        loading: true,
        empty: true
    }

    componentDidMount() {
           const user_id = getUserId();
        this.setState({
                user_id: user_id
            })
            axios.get(`https://adminportal.dating/api/getchats/${getUserId()}/`)
                .then(res => {

                    console.log(res.data)
                    const profiles = res.data;

                    if (profiles.length == 0) {
                        this.setState({
                            loading: false,
                        });
                    } else {
                        this.setState({
                            profiles: profiles,
                            loading: false,
                            empty: false
                        });
                    }
                    
                })
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


    getDate(date) {

        console.log(date)
        const dateObject = new Date(date*1)
        console.log(dateObject)
        const humanDateFormat = dateObject.toLocaleString() 
// date.toLocaleDateString("en-US")
        return (
            humanDateFormat
        )
    }

    render() {
      
        const loading = this.state.loading;
        const empty = this.state.empty;
        const user_id = this.state.user_id
        const member_id = this.state.member_id


        return (
          
            <div>
               {loading ? (
                              <LoadingBar />
                ) : (
                        <Container xs={12}  maxWidth="md">
                            <Box sx={{ marginTop: 2, height: '90vh', overflow: 'auto' }} container spacing={{ xs: 1, md: 1 }} columns={{ xs: 1, sm: 1, md: 1 }} >
                                <Card>
                                    {empty ? <div>Please start a chat with some members!</div>
                
                                        : <List sx={{ flexDirection: "column" }}>
                                            {
                                                this.state.profiles
                                                    .map(profile =>

                                                        <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={`/message/${profile.member_id}`}>
                                                            <ListItem >
                                                                <ListItemButton alignItems="flex-end">
                                                                    <ListItemAvatar>
                                                                        <Avatar src={`https://adminportal.dating/api/profile/${profile.member_id}_0.jpg`} />
                                                                    </ListItemAvatar>
                                                                    <ListItemText
                                                                        primary={
                                                                            <React.Fragment>
                                                                                {profile.full_name}
                                                                                <Typography variant="overline" display="inline-block" color="text.secondary" sx={{ marginLeft: 0.5 }}>({this.getAge(profile.birthdate)}) / {profile.gender} / {profile.city}, {profile.country}</Typography>
                                                                            </React.Fragment>}
                                                                        secondary={
                                                                            <React.Fragment>
                                                        
                                                                                
                                                                                    {profile.user_id == this.state.user_id ?
                                                                                        <Typography
                                                                                    sx={{ display: 'inline' }}
                                                                                    component="span"
                                                                                    variant="body2"
                                                                                    color="text.primary"
                                                                                >
                                                                                            {profile.content}
                                                                                        </Typography>

                                                                                        :         <Typography
                                                                                    sx={{ display: 'inline', fontStyle: "italic" }}
                                                                                    component="span"
                                                                                    variant="body2"
                                                                                    color="primary"
                                                                                >
                                                                                            {profile.content}
                                                                                       </Typography>}
                                                                                
                                                                                <Typography sx={{position: "absolute", right: 0}} variant="caption" display="inline-block" color="text.secondary" size="small">
                                                                        {this.getDate(profile.timestamp)}
                                                                                </Typography> 
                                                                            </React.Fragment>
                                                                        }
                                                                    />
                                              
                                                                </ListItemButton>
                                                            </ListItem>
                                                             <Divider light />
                                                            </Link>
                                                                      
                                                
                                                    )
                                            }

                                        </List>}
                                </Card>

                            </Box>
                            </Container>
                            )}
        </div> 

    )
    
  }
}