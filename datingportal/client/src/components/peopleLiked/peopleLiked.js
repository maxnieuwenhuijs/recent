import * as React from 'react';

import LikedList from '../LikedList/LikedList'
import { Button, CardActionArea, CardActions } from '@mui/material';
import ResponsiveAppBar from '../ResponsiveAppBar/ResponsiveAppBar'

const peopleLiked = () => {
  
    return (
        <div>
            <ResponsiveAppBar />
            <LikedList />
        </div>
  );
};
export default peopleLiked;