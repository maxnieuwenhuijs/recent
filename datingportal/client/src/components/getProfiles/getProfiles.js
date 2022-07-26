import React from 'react';
import axios from 'axios';

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
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Chip from '@mui/material/Chip';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import pop from '../../assets/pop.mp3';
import ding from '../../assets/ding.mp3';
import popper from '../../assets/popper.mp3';
import SearchIcon from '@mui/icons-material/Search';
import { getUserId } from "../../util/getPath";


export default class PersonList extends React.Component {
    state = {
        profiles: [],
        loading: true,

    }

    componentDidMount() {     
        const profilesInStorage = localStorage.getItem(`profiles`);
        const filter = localStorage.getItem(`userProfile`);
        const profile = JSON.parse(filter)
        
        if (!profilesInStorage) {
          
            
        axios.get(`https://adminportal.dating/api/get/${getUserId()}/${profile.age_from}/${profile.age_to}/${profile.seek_gender}/hetero`)
            .then(res => {
                const profiles = res.data;           
                const string = JSON.stringify(profiles)
                
               
                localStorage.setItem(`profiles`, string);
                    this.setState({
                        profiles: profiles,
                        loading: false
                    });
            })
                } else {
                    this.setState({
                        profiles: eval(profilesInStorage),
                        loading: false
                    });
                }   
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

    getNewProfiles() {
        const filter = localStorage.getItem(`userProfile`);
        const profile = JSON.parse(filter)
        this.setState({ loading: true });
        axios.get(`https://adminportal.dating/api/get/${getUserId()}/${profile.age_from}/${profile.age_to}/${profile.seek_gender}/hetero`)
            .then(res => {
                const profiles = res.data;           
                const string = JSON.stringify(profiles)
               
                localStorage.setItem(`profiles`, string);
                    this.setState({
                        profiles: profiles,
                        loading: false
                    });
            }) 
    }

    blockProfile(member_id) {
        const state = this.state.profiles;
        const user_id = getUserId();

        axios.get(`https://adminportal.dating/api/match/${user_id}/${member_id}/7`)
            .then(res => {
        // removing object with id
        for (let i = 0; i < state.length; i++) {
            if (state[i].member_id === member_id) {
                state.splice(i, 1);
                   this.setState({
                        profiles: state
                   })
                    const string = JSON.stringify(state)
                    localStorage.setItem(`profiles`, string);
                break;
                }
            }
            }) ;

 
    }

        likeProfile(member_id) {
        const state = this.state.profiles;
        const user_id = getUserId();
        axios.get(`https://adminportal.dating/api/match/${user_id}/${member_id}/0`)
            .then(res => {
        // removing object with id
        for (let i = 0; i < state.length; i++) {
            if (state[i].member_id === member_id) {
                state.splice(i, 1);
                   this.setState({
                        profiles: state
                   })
                    const string = JSON.stringify(state)
                    localStorage.setItem(`profiles`, string);
                break;
                }
            }
            }) ;

        // removing object with id
        for (let i = 0; i < state.length; i++) {
            if (state[i].member_id === member_id) {
                state.splice(i, 1);
                   this.setState({
                        profiles: state
                   })
                    const string = JSON.stringify(state)
                    localStorage.setItem(`profiles`, string);
                break;
                }
            }
    }

    playPop = () => {
    new Audio(pop).play();
    }
    
       playDing = () => {
    new Audio(ding).play();
    }
    
playPopper= () => {
    new Audio(popper).play();
    }


    render() {
      
        const loading = this.state.loading;
        return (
          
            <div style={{textAlign: "center"}}>
                
                <Button sx={{marginTop: 2, marginBottom: 2}}variant="contained" onClick={() => {
                    this.playPopper()
                    this.getNewProfiles();
            }} startIcon={<SearchIcon />}>I want to see different profiles!</Button>

               {loading ? (
                              <LoadingSpinner />
                ) : (
                        
                        <Container xs={12}>
                            
                          
                            <Grid container spacing={1} columns={{ xs: 4, sm: 8, md: 12 }}>
                                    {
                                        this.state.profiles
                                            .map(profile =>
                                                <Grid item xs={4} sm={4} md={3} key={profile.member_id}>

                                                    <Card id={ profile.member_id} variant="outlined" sx={{ maxWidth: 400 }}>
                                                        
                                                        <CardActionArea>
                                                            <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={`/profile/${profile.member_id}`}>
                                                            <CardMedia
                                                                component="img"
                                                                height="300"
                                                                image={`https://adminportal.dating/api/profile/${profile.member_id}_0.jpg`}
                                                                alt={profile.username}
                                                                onError={({ currentTarget }) => {
                                                                    currentTarget.onerror = null; // prevents looping
                                                                    currentTarget.src = "https://adminportal.dating/api/profile/noprofile.png";
                                                                }}
                                                            />
                                                            <CardContent>
                                                                <Typography variant="h5" component="div">
                                                                    {profile.full_name} <Typography variant="overline" display="inline-block" color="text.secondary">({this.getAge(profile.birthdate)})</Typography>
                                                                </Typography>
                                                                <Typography noWrap sx={{ mb: 1.5 }} color="text.secondary">
                                                                    {profile.headline}
                                                                    </Typography>
                                                                    <Typography noWrap sx={{ mb: 1.5 }} color="text.secondary">
                                                                      {profile.city}, {profile.state}
                                                                    </Typography>
                                                                     <Typography noWrap sx={{ mb: 1.5 }} color="text.secondary">
                                    
                                                                        <Chip label={profile.looking_for} />
                                                                </Typography>

                                                            </CardContent>
                                                        </Link>
                                                        </CardActionArea>
                                                        <CardActions>
                                                            <Grid spacing={1} container direction="row" justifyContent="space-between" alignItems="center">

                                                            <Grid>
                                                                <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={`/profile/${profile.member_id}`}>
                                                                    <Button size="small" disableElevation startIcon={<ContactPageIcon />}>View profile</Button>
                                                                </Link>
                                                                </Grid>
                                                                <Grid>
                                                                    <Tooltip title="Favorite this profile">
                                                                        <IconButton onClick={() => {
                                                                          this.playPop()   
                                                                            this.likeProfile(profile.member_id)
                                                                        }
                                                                        }>
                                                                            <FavoriteIcon sx={{ color: '#ffc5c1' }} />
                                                                        </IconButton>
                                                                    </Tooltip>

                                                                    <Tooltip title="Block this profile" >
                                                                        <IconButton onClick={() => {
                                                                            this.playDing()
                                                                            this.blockProfile(profile.member_id)
                                                                        }
                                                                        }>
                                                                            <BlockIcon />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </Grid>
                                                            </Grid>
                                                        </CardActions>
                                                    </Card>
                                                </Grid >
                                            )
                                    }

                            </Grid >

                            </Container>)}
        </div> 

    )
    
  }
}