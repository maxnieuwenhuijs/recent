import React from 'react';
import classes from './LoadingSpinner.module.css';
import Typography from '@mui/material/Typography';

const LoadingSpinner = (props) => {

    return (
        <div className={classes.Spinner}>            
            <img src={window.location.origin + "/loader.gif"} />
            <Typography variant="h6" component="div">
                Fetching profiles based on your interests...
            </Typography>
        </div>
    );
};
export default LoadingSpinner;