import React, { Component } from "react";
import classes from "./Login.module.css";
import { createBrowserHistory } from 'history';
import { getPath, getBrand , getBrandAndExtension} from "../../../util/getPath";
import axios from "axios";

let history = createBrowserHistory();

class Login extends Component {
    constructor() {
        super();
        this.state = {
            errorMessage: "",
            text: '',
            doubleLogin: true,
        };
    }
    handleSubmit = (e) => {
        e.preventDefault();

        //MSISDN LOGIN
        if (!this.state.doubleLogin) {
            const response = fetch(`${getPath()}login2/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state.user),
        }).then(response => response.json())
            .then(data => { 
                this.props.loggedinStatus('LOGGED_IN')
                this.props.userData({ data })
                history.push ='/'
            })
            .catch(error => { 
                console.log('user not found')
                this.setState({
                    errorMessage: this.state.text.error
                });

            });
        }else{
            
        const response = fetch(`${getPath()}login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state.user),
        }).then(response => response.json())
            .then(data => { 
                this.props.loggedinStatus('LOGGED_IN')
                this.props.userData({ data })
                history.push ='/'
            })
            .catch(error => { 
                console.log('user not found')
                this.setState({
                    errorMessage: this.state.text.error
                });

            });
        }
    };

  

    componentDidMount() {
       

        function getUrlParameter(sParam) {
            var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
        };

        let loginType = getUrlParameter('loginType');
        let languageCode = getUrlParameter('cc');
        
        var localLanguage = localStorage.getItem('localLanguage');
        var localStorageLogin = localStorage.getItem('loginType');

        console.log(localLanguage)

        if (!languageCode && !localLanguage ) {
            languageCode = ''
        } else if (!languageCode && localLanguage) {
            languageCode = localLanguage;
        } else {
            localStorage.setItem('localLanguage', languageCode);
        }

        if (loginType == 1 || localStorageLogin == 1 ) {
            localStorage.setItem('loginType', 1);
            this.setState({
                doubleLogin: false
            });
        }

        axios.get(`${getPath()}assets/brandSpecific/${getBrand()}/locale${languageCode}.json`).then((res) => {
            this.setState({
                text: res.data
            })
        });
    }

    changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

         

        this.setState({
            user: {
                ...this.state.user,
                [name]: value,
            },
        });
    };

    render() {
        var errorMessage = this.state.errorMessage;
        let loginType = this.state.doubleLogin;
        let title = this.state.text.title;
        let subtitle = this.state.text.subtitle;
        let login = this.state.text.login;
        let sign_in_text = this.state.text.sign_in_text;
        let phonenumber_text = this.state.text.phonenumber_text;
        let login_button = this.state.text.login_button;

        return (
            <div>
                {loginType ? 
            <div className = { classes.Container } style = {{
                    background: `url(${getPath()}assets/brandSpecific/${getBrand()}/bg.jpg)`
                }
            }>
                         <a className={classes.Link} href={`https://${getBrandAndExtension()}`}>
                <img
                    className={classes.Logo}
                    src={`${getPath()}assets/brandSpecific/${getBrand()}/logo.png`}
                            />
                            </a>
                <h3 className={classes.Subtitle}>{subtitle}</h3>

                <div>
                <form className={classes.Login} onSubmit={this.handleSubmit}>
                        <h1>Login</h1>
                    <p>Please sign in to continue</p>
                    <label id={'secondary-text'} >Username</label>
                        <input
                        id={'secondary-border'}
                        required
                        type="text"
                        name="username"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        value={this.state.username}
                        onChange={this.changeHandler}
                    />
                    <label id={'secondary-text'}>Password</label>
                        <input
                        id={'secondary-border'}
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.changeHandler}
                    />
                    <button  id={'primary'} type="submit">Login</button>
                </form>
                { errorMessage ? <p className={classes.ErrorMessage}>{this.state.errorMessage}</p> : null}
                </div>
                    </div>
                    : <div className = { classes.Container } style = {{
                    background: `url(${getPath()}assets/brandSpecific/${getBrand()}/bg.jpg)`
                }
            }>
                <img
                    className={classes.Logo}
                    src={`${getPath()}assets/brandSpecific/${getBrand()}/logo.png`}
                />
                <h3 className={classes.Subtitle}>{title}</h3>

                <div>
                <form className={classes.Login} onSubmit={this.handleSubmit}>
                        <h1>{login}</h1>
                    <p>{sign_in_text}</p>
                    <label id={'secondary-text'} >{phonenumber_text}</label>
                        <input
                        id={'secondary-border'}
                        required
                        type="number"
                        name="msisdn"
                        value={this.state.msisdn}
                        onChange={this.changeHandler}
                    />
                    <button  id={'primary'} type="submit">{login_button}</button>
                </form>
                { errorMessage ? <p className={classes.ErrorMessage}>{this.state.errorMessage}</p> : null}
                </div>
                    </div>}
            </div>
            
        );
    }
}
export default Login;