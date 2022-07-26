import React from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import LoadingBar from "../LoadingBar/LoadingBar";    
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Chip from '@mui/material/Chip';
import { getUserId } from "../../util/getPath";
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Send from '../../assets/send.mp3';

export default class PersonList extends React.Component {
    state = {
        loading: true,
        message: '',
    }

    componentDidMount() {
        const user_id = getUserId();
        this.setState({
                user_id: user_id
            })

           const str = document.URL;
         const afterLastSlash = str.substring(str.lastIndexOf('/') + 1);
            axios.get(`https://adminportal.dating/api/getchatid/${getUserId()}/${afterLastSlash}`)
                .then(res => {
                 
                    this.setState({
                        member_id: afterLastSlash,
                        chatId: res.data[0].id,
                    })
                
                    const chatId = res.data[0].id
                    if (chatId) {
                        this.GetChatMessages()
                    } else {
                        console.log('no id')
                    }
                    
                 


                    
                })
    }

    changeMessage = () =>{
        let text = document.getElementById('textField').value;
        this.setState({
            message: text
        })
    }

    GetChatMessages() {

        const str = document.URL;
         const afterLastSlash = str.substring(str.lastIndexOf('/') + 1);
        axios.get(`https://adminportal.dating/api/getmessages/${this.state.chatId}/`)
                        .then(res => {
                            const chats = res.data;
                            
                            console.log(chats)

                            if (chats[0] == '') {
                                console.log('no chats')
                            } else {
                                console.log('chats')
                        this.setState({
                            chats: chats,
                        });   
                                
                                setTimeout( () =>
                                {
                                    this.setState({
                                        loading: false,   
                                    })
                                },500 )
                            }
                            
                        },
                            
                            
            axios.get(`https://adminportal.dating/api/getprofile/${getUserId()}/${afterLastSlash}`)
            .then(res => {
                const profile = res.data;
                this.setState({
                    profile: profile,
                    member_id: afterLastSlash,
                    full_name: profile[0].full_name
                });                
            }))
    }
    
    playSend = () => {
    new Audio(`http://64.227.29.172/static/media/send.8846771b50fcc1c84711.mp3`).play();
  }
    sendMessage() {

         const timestamp = new Date().getTime();
        let data = {
            chat_id: this.state.chatId,
            content: this.state.message,
            user_id: this.state.user_id,
            timestamp: timestamp
        }
        
        axios.post(`https://adminportal.dating/api/message/${getUserId()}/`, data)
            .then(res => {

                console.log('Message SEND!');
                const message = this.state.chats
                message.push(data)

                console.log(message)

               
                        this.setState({
                            message: ''
                        })
                this.playSend()
              
            }
                    )
    }

        getDate(date) {
            const dateObject = new Date(date*1)
            const humanDateFormat = dateObject.toLocaleString() 
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
                        <Container xs={12} maxWidth="md">
                            <AppBar position="static">
                                <Toolbar>
                                    <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={`/profile/${this.state.member_id}`}>
                                        <Avatar alt="" src={`https://adminportal.dating/api/profile/${this.state.member_id}_0.jpg`} />
                                    </Link>
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        component="div"
                                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, marginLeft: 2 }}
                                    >{this.state.full_name}
                                        
          </Typography>
                                </Toolbar>
                            </AppBar>

                           
                            <Box sx={{ marginTop: 2, overflow: 'auto' }} container spacing={{ xs: 1, md: 1 }} columns={{ xs: 1, sm: 1, md: 1 }} >
                                     <List sx={{ flexDirection: "column", height: '60vh' }}>
                                            {
                                                this.state.chats
                                                    .map(chat =>
                                                        <div>{chat.user_id == this.state.user_id ?
                                                            <ListItem sx={{justifyContent: "flex-end"}}>
                                                                <Chip color="primary" label={chat.content} />
                                                                <Typography sx={{ position: "absolute",bottom: "-8px", fontSize:"8px" }} variant="caption" display="block" gutterBottom>
                                                                {this.getDate(chat.timestamp)}
                                                                </Typography>
                                                            </ListItem>
                                                            : <ListItem >
                                                              <Chip label={chat.content} />
                                                                <Typography sx={{ position: "absolute",bottom: "-8px", fontSize:"8px" }} variant="caption" display="block" gutterBottom>
                                                                {this.getDate(chat.timestamp)}
                                                                </Typography>
                                                            </ListItem>
                                                        }
                                                            
                                                        </div>
                                                
                                                    )
                                            }

                                        </List>

                            </Box> 
                            <Divider sx={{ marginBottom: 2 }} />
                                <Grid  container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                 >
                                 
                                <TextField onChange={() => this.changeMessage()} multiline id="textField" sx={{ width: "77%" }} type="text" label="Your Message" rows={1} value={this.state.message}  onKeyPress={(e) => {
    if (e.key === 'Enter') {
     this.sendMessage()
    }
  }}/>
                                <Button sx={{ width: "20%", marginLeft: 0.5 }} size="large" variant="contained" endIcon={<SendIcon />} onClick={ () => this.sendMessage() }>Send</Button>
                                </Grid>
    
                            </Container>
                            )}
        </div> 

    )
    
  }
}