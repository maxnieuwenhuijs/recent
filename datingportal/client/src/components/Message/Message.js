import * as React from 'react';

import MessageCenter from '../MessageCenter/MessageCenter'
import { Button, CardActionArea, CardActions } from '@mui/material';
import ResponsiveAppBar from '../ResponsiveAppBar/ResponsiveAppBar'

const peopleLiked = () => {
  
    return (
        <div>
            <ResponsiveAppBar />
            <MessageCenter />
        </div>
  );
};
export default peopleLiked;