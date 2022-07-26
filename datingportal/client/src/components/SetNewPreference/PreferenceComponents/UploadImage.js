import React, { Component } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { getUserId } from "../../../util/getPath";

class UploadImage extends Component {
  constructor() {
    super();
    this.state = {
      selectedFile: null,
        user_id: 1,
        loading_0: '',
        loading_1: '',
        loading_2: '',
        loading_3: '',
        loading_4: ''
    };
  }

  changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      formControls: {
        ...this.state.formControls,
        [name]: value,
      },
    });
  };

  onChangeHandler = (event) => {
    let file = event.target.files[0];
    console.log(file);
    this.setState({
      selectedFile: event.target.files[0],
      loaded: false,
    });
  };

    onClickHandler = (lessonID) => {
        let Loading = 'loading_' + lessonID
        this.setState({
            [Loading]: true
        });

    const data = new FormData();
    const json = JSON.stringify(this.state.formControls);
    data.append("file", this.state.selectedFile);
    axios
      .post(`https://adminportal.dating/api/postimage/${getUserId()}/${lessonID}`, data, {
        // receive two    parameter endpoint url ,form data
      })
      .then((res) => {
        axios.post(`https://adminportal.dating/api/postimage/${getUserId()}/${lessonID}`, json, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        // then print response status
        console.log(res.statusText);
          setTimeout( () => {
               this.setState({
              [Loading] : false
               })
              window.location.reload(false);
           },500)
          
      });
  };
  render() {
    let loading_0 = this.state.loading_0;
    let loading_1 = this.state.loading_1;
    let loading_2 = this.state.loading_2;
    let loading_3 = this.state.loading_3;
    let loading_4 = this.state.loading_4;

    return (
        <Grid>
            <Typography variant="subtitle1" gutterBottom component="div">Upload your pictures</Typography>
            
            <List>
                <ListItem>
                       <ListItemAvatar>
                            <Avatar alt="" src={`https://adminportal.dating/api/profile/${getUserId()}_0.jpg`} />
                        </ListItemAvatar>
        <form id="0" onSubmit={this.handleSubmit}>
          <input type="file" name="file" onChange={this.onChangeHandler} accept="image/jpeg" />
     
                {loading_0 ? 
                <LoadingButton loading>
                Submit
                </LoadingButton> :   <Button endIcon={<SendIcon />} onClick={() => this.onClickHandler(0)} size="small">
            Upload
                </Button>

                }
            </form>
                </ListItem>

                <ListItem>
                    <ListItemAvatar>
                            <Avatar alt="" src={`https://adminportal.dating/api/profile/${getUserId()}_1.jpg`} />
                        </ListItemAvatar>
              <form id="1" onSubmit={this.handleSubmit}>
          <input type="file" name="file" onChange={this.onChangeHandler} accept="image/jpeg" />
     
                {loading_1 ? 
                <LoadingButton loading>
                Submit
                </LoadingButton> :   <Button endIcon={<SendIcon />} onClick={() => this.onClickHandler(1)} size="small">
            Upload
                </Button>

                }
            </form>
                </ListItem>

                <ListItem>
                     <ListItemAvatar>
                            <Avatar alt="" src={`https://adminportal.dating/api/profile/${getUserId()}_2.jpg`} />
                        </ListItemAvatar>
              <form id="2" onSubmit={this.handleSubmit}>
          <input type="file" name="file" onChange={this.onChangeHandler} accept="image/jpeg" />
     
                {loading_2 ? 
                <LoadingButton loading >
                Submit
                </LoadingButton> :   <Button endIcon={<SendIcon />} onClick={() => this.onClickHandler(2)} size="small">
            Upload
                </Button>

                }
            </form>
                </ListItem>
                <ListItem>
                     <ListItemAvatar>
                            <Avatar alt="" src={`https://adminportal.dating/api/profile/${getUserId()}_3.jpg`} />
                        </ListItemAvatar>
                <form id="4" onSubmit={this.handleSubmit}>
          <input type="file" name="file" onChange={this.onChangeHandler} accept="image/jpeg" />
     
                {loading_3 ? 
                <LoadingButton loading>
                Submit
                </LoadingButton> :   <Button endIcon={<SendIcon />} onClick={() => this.onClickHandler(3)} size="small">
            Upload
                </Button>

                }
            </form>
                </ListItem>
                <ListItem>
                     <ListItemAvatar>
                            <Avatar alt="" src={`https://adminportal.dating/api/profile/${getUserId()}_4.jpg`} />
                        </ListItemAvatar>
                <form id="4" onSubmit={this.handleSubmit}>
          <input type="file" name="file" onChange={this.onChangeHandler} accept="image/jpeg" />
     
                {loading_4 ? 
                <LoadingButton loading>
                Submit
                </LoadingButton> :   <Button endIcon={<SendIcon />} onClick={() => this.onClickHandler(4)} size="small">
            Upload
                </Button>

                }
            </form>
        </ListItem>
            </List>
        </Grid>
    );
  }
}
export default UploadImage;