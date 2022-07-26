import * as React from 'react';

import SetPreference from '../SetPreference/SetPreference'
import { Button, CardActionArea, CardActions } from '@mui/material';
import ResponsiveAppBar from '../ResponsiveAppBar/ResponsiveAppBar'

const UserProfile = () => {
  
    return (
        <div>
            <ResponsiveAppBar />
            <SetPreference />
        </div>
  );
};
export default UserProfile;