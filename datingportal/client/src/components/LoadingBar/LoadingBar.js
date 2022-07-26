import React from 'react';
import classes from './LoadingBar.module.css';
import Typography from '@mui/material/Typography';

const LoadingBar = (props) => {

    return (
        <div className={classes.Spinner}>            
            <img src={window.location.origin + "/loadingbar.gif"} />
        </div>
    );
};
export default LoadingBar;