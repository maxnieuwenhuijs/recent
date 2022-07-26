import * as React from 'react';

import Overview from '../getProfiles/getProfiles'
import { Button, CardActionArea, CardActions } from '@mui/material';
import ResponsiveAppBar from '../ResponsiveAppBar/ResponsiveAppBar'

const dashBoard = () => {
  
    return (
        <div>
            
            <ResponsiveAppBar />
            <Overview />
        </div>
  );
};
export default dashBoard;