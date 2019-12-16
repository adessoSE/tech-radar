import React, {Component} from "react";
import {Row, FormGroup, FormControl, FormLabel, Button} from 'react-bootstrap';
import "../static/css/styles.scss";
import "../static/css/desctop.scss";
import "../static/css/mobile.scss";
import "./Login.scss"
import userService from "../services/userService";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            passwort: '',
            isAuthenticated: false

        }
        this.handleEmailChanged = this.handleEmailChanged.bind(this);
        this.handlePasswortChanged = this.handlePasswortChanged.bind(this);
        this.verifyUserInput = this.verifyUserInput.bind(this);


    }

    handleEmailChanged(event) {
        this.setState({email: event.target.value});


    }

    handlePasswortChanged(event) {
        this.setState({passwort: event.target.value});

    }

    verifyUserInput = async (event) => {
        event.preventDefault();
        const datatest = await userService.submitUser(this.state.email, this.state.passwort);
        console.log(datatest);
        localStorage.setItem('email', JSON.stringify(this.state.email));
        localStorage.setItem('password', JSON.stringify(this.state.password));

        if (datatest.user != null) {

            //console.log("success"),
            this.setState({isAuthenticated:true})
            console.log(this.state.isAuthenticated)
            this.props.history.push('/');
        }

        else {
            this.setState({isAuthenticated:false})
            console.log(this.state.isAuthenticated)
            console.log("not working")
        }
    };



    render() {
        return (
            <div className="Login">

                <form>
                    <h3 align="center" >Willkommen beim Adesso TechnologieRadar</h3>
                        <FormGroup controlId="email">
                            <input type="email" name="email" placeholder="Email" onChange={this.handleEmailChanged}/>
                        </FormGroup>
                        <FormGroup controlId="passwort">
                            <input type="password" name="passwort" placeholder="Passwort"
                                         onChange={this.handlePasswortChanged}/>
                        </FormGroup>
                    <FormGroup controlId="submit">
                        <Button type="submit" onClick={this.verifyUserInput} bsstyle="primary">Einloggen</Button>
                    </FormGroup>
                    </form>
                </div>

        )
    }
}


export default Login;