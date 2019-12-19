import React, {Component} from "react";
import {FormGroup, FormControl, Button} from 'react-bootstrap';
import "../static/css/styles.scss";
import "../static/css/desctop.scss";
import "../static/css/mobile.scss";
import "./Login.scss"
import userService from "../services/userService";

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            passwort: '',
            loginSuccess: '',
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

        if (datatest.user != null) {
            localStorage.setItem('email', JSON.stringify(this.state.email));
            this.props.history.push('/');
            this.setState({loginSuccess: true})
        } else {
            this.setState({loginSuccess: false})
            console.log("no matching")
        }
    };


    render() {
        let error='';
        if (this.state.loginSuccess === false) {
            error = (<div>Username oder Passwort nicht korrekt</div>);
        }
        return (
            <div className="Login">
                <form onSubmit={this.verifyUserInput}>
                    <h3 align="center">Willkommen beim Adesso TechnologieRadar</h3>
                    <div>{error}</div>
                    <FormGroup controlId="email">
                        <input type="email" name="email" placeholder="email" onChange={this.handleEmailChanged}/>
                    </FormGroup>
                    <FormGroup controlId="passwort">
                        <FormControl type="password" name="passwort" placeholder="passwort"
                                     onChange={this.handlePasswortChanged}/>
                    </FormGroup>
                    <FormGroup controlId="submit">
                        <Button type="submit" onClick={this.verifyUserInput} bsstyle="primary">Einloggen</Button>
                    </FormGroup>
                </form>
            </div>
        );
    }

}

export default Login;