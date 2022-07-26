import React from 'react';
import classes from './Footer.module.css';
import { getPath, getBrand, getBrandAndExtension } from "../../../util/getPath";
import { getCookie } from "../../../util/getCookie";

const Footer = (props) => {

    var date = new Date();
    const year = date.getFullYear();

    let sessionID = getCookie('sessionID');

    if (!sessionID) {
        sessionID = '-'
    }

    return (
        <div className={classes.Footer}>
          
            <div className={classes.FooterContent}>
                <div className={classes.LogoContainer}>
                    <img
                        className={classes.Logo}
                        src={`${getPath()}assets/brandSpecific/${getBrand()}/logo.png`}
                    /><span>{getBrand()} - {year}</span>
                </div>
                
                <div className={classes.About}>
                    <h3>About</h3>
                    <ul>
                        <li>
                            <a href={`https://${getBrandAndExtension()}/legals/terms-conditions/`}>Terms & Conditions</a>
                        </li>
                        <li>
                            <a href={`https://${getBrandAndExtension()}/legals/privacy-statement/`}>Privacy Policy</a>
                        </li>
                        <li>
                            <a href={`https://subscription.${getBrandAndExtension()}/unsubscribe?cc=usen`}>Terminate subscription</a>
                        </li>
                        <li>
                            <a href={`https://subscription.${getBrandAndExtension()}/account?sessionId=${sessionID}&cc=usen`}>My account</a>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    );
};
export default Footer;