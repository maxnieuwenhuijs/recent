import React from 'react';
import classes from './LoadingSpinner.module.css';

const LoadingSpinner = (props) => {

    return (
        <div className={classes.Spinner}>
            <img src={window.location.origin + "/loader.gif"} />
        </div>
    );
};
export default LoadingSpinner;