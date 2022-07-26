import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/style.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { getPath, getBrand } from "./util/getPath";
import axios from "axios";

(function () {

    axios.get(`${getPath()}assets/brandSpecific/${getBrand()}/locale.json`).then((res) => {
       
        const portalData = res.data;
        document.title = portalData.title;
        document.getElementById("meta-description").setAttribute("content", portalData.subtitle);
    }); 

    let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = `${getPath()}assets/brandSpecific/${getBrand()}/favicon.png`;

    var style = document.createElement('link');
    style.rel  = 'stylesheet';
    style.type = 'text/css';
    style.href = `${getPath()}assets/brandSpecific/${getBrand()}/style.css`;

    document.getElementsByTagName('head')[0].appendChild(link);
    document.getElementsByTagName('head')[0].appendChild(style);   
})();

ReactDOM.render( <
    React.StrictMode >
    <App / >
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();