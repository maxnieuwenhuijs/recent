import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import LoadingBar from "../LoadingBar/LoadingBar";    
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import DatePicker from './PreferenceComponents/DatePicker';
import Gender from './PreferenceComponents/Gender';
import LookingForFriendship from './PreferenceComponents/LookingForFriendship';
import Language from './PreferenceComponents/Language';
import Race from './PreferenceComponents/Race';
import Religion from './PreferenceComponents/Religion';
import MartialStatus from './PreferenceComponents/MartialStatus';
import Smoke from './PreferenceComponents/Smoke';
import Drink from './PreferenceComponents/Drink';
import Name from './PreferenceComponents/Name';
import Headline from './PreferenceComponents/Headline';
import Description from './PreferenceComponents/Description';
import OtherInfo from './PreferenceComponents/OtherInfo';
import UploadImage from './PreferenceComponents/UploadImage'
import Button from '@mui/material/Button';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SaveIcon from '@mui/icons-material/Save';
import axios from "axios";
import Alert from '@mui/material/Alert';
import Country from './PreferenceComponents/Country';
import State from './PreferenceComponents/State';
import City from './PreferenceComponents/City';
import Zip from './PreferenceComponents/Zip';
import SexualOrientation from './PreferenceComponents/SexualOrientation';
import SeekAge from './PreferenceComponents/SeekAge';
import Divider from '@mui/material/Divider';
import { getUserId } from "../../util/getPath";

export default class PersonList extends React.Component {
    state = {
        loading: true,
        saved: false,
        full_name: '',
        headline: '',
        description: '',
        birthdate: '',
        gender: '',
        marital_status: '',
        looking_for: '',
        language: '',
        race: '',
        religion: '',
        drink: '',
        smoke: '',
        other_info: '',
        reload: false
    }

    componentDidMount() {
  
                              
               const userProfileState =
                {
                    "full_name": ``,
                    "headline": ``,
                    "description": ``,
                    "birthdate": ``,
                    "gender": ``,
                    "marital_status": ``,
                    "looking_for": ``,
                    "language": ``,
                    "race": ``,
                    "religion": ``,
                    "drink": ``,
                    "smoke": ``,
                    "other_info": ``,
                    "country": ``,
                    "state": ``,
                    "city": ``,
                    "zip": 0,
                    "age_to": 65,
                    "age_from": 18,
                    "seek_gender": ``,
                };

               
                var user = JSON.stringify(userProfileState)
                localStorage.setItem(`userProfile`, user);


            this.setState({
                loading: false
            })
        //    })   
    }

    upLoadProfile() {
        const profileInStorage = localStorage.getItem(`userProfile`);
        const data = JSON.parse(profileInStorage)

        console.log(data)
        axios.get(`https://adminportal.dating/api/postnew/${getUserId()}/`)
            .then(res => {
                axios
                    .post(`https://adminportal.dating/api/post/${getUserId()}/`, data)
                    .then(
                        console.log('Profile Saved'),
        
                        this.setState({
                            saved: true
                        }),

                        setTimeout(() => {
                            this.setState({
                                saved: false
                            })
                            window.location.reload();
                        }, 1200)
                    )
            })

    }

    render() {

        const loading = this.state.loading;
        const saved = this.state.saved
        return (
          
            <div>
               
               {loading ? (
                              <LoadingBar />
                ) : (
                        <Container xs={12}  maxWidth="md">
                            <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
      
                                  <Container sx={{ marginBottom: 2}} xs={12} maxWidth="md">
                                        {saved ?   <Alert severity="success">Profile has been saved</Alert> : ''}
                                       
                                        <Box sx={{ marginTop: 2 ,}} container  >
                                            
                                            <Card sx={{ position: "relative" , padding: 2}}>
                                           
                                                 <Button variant="contained" style={{position: "absolute", right: 5, top: 5}} size="small" disableElevation startIcon={<SaveIcon />} onClick={() => {
                                                this.upLoadProfile()
                                            } }>Save profile</Button>
                                                <Typography sx={{marginTop: 2}} variant="h5" gutterBottom component="div">
                                                    Please fill in your profile  
                                                    </Typography>
                                                                                            <Typography variant="subtitle1" gutterBottom  component="div">
                                                    The more you fill in, the more your chances of meeting the one will increase!
                                                </Typography>
                                                    <Divider />
                                                <Grid item xs={8} sm={8} md={12} sx={{ marginTop: 2, marginBottom: 2}} >
                                                        
                                                        
                                                        <SexualOrientation />  
                                                       
                                                            <SeekAge/>
                                                </Grid>
                                                <Divider />
                                                <Grid sx={{marginTop: 2}} container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }} >
                                                     
                                                    <Grid item xs={4} sm={4} md={6}>
                                                        <Name />
                                                        <Headline />
                                                        <Description />
                                                        <DatePicker />  
                                                        <OtherInfo />
                                                   
                                                    </Grid>

                                              
                                                    
                                                    <Grid item xs={4} sm={8} md={12}>
                                                         <Divider />
                                                    </Grid>
                                                
                                                <Grid item xs={4} sm={4} md={6}>
                                                
                                                        <Gender/>                                                                                          
                                                        <Language />
                                                         <Country />
                                                        <State />
                                                      
                                                    </Grid>
                                                    <Grid item xs={4} sm={4} md={6}>
                                                          <MartialStatus/>                                            
                                                        <LookingForFriendship />    
                                                        <Race />                         
                                                        <Religion/>                                            
                                                        <Drink/>                         
                                                        <Smoke />
                                                       
                                                    </Grid>
                                                  
                                                    
                                                      
                                                                             
                                                </Grid>
                                                   
                                            </Card>
                                               
                                    </Box>
                                    
                                </Container>

                                </div>
                                
    </Box>

                            </Container>
                            )}
        </div> 

    )
    
  }
}