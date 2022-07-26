import * as React from 'react';

import ChatMessages from '../ChatMessages/ChatMessages'
import { Button, CardActionArea, CardActions } from '@mui/material';
import ResponsiveAppBar from '../ResponsiveAppBar/ResponsiveAppBar'

const peopleLiked = () => {
  
    return (
        <div>
            <ResponsiveAppBar />
            <ChatMessages />
        </div>
  );
};
export default peopleLiked;