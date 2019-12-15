import React, {Component} from "react";
import {Row, FormGroup, FormControl, FormLabel, Button} from 'react-bootstrap';
import "../static/css/styles.scss";
import "../static/css/desctop.scss";
import "../static/css/mobile.scss";
import "./Login.scss"
import userService from "../services/userService";


class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            errors: {},
            formSubmitted: false,
            email: '',
            passwort: '',

        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.verifyUserInput = this.verifyUserInput.bind(this);
    }

    handleInputChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]: value});
        //console.log(this.state.email);
        //console.log(this.state.passwort);
    }



    verifyUserInput = async (event) => {
        console.log(this.state.email);
        console.log(this.state.passwort);
        event.preventDefault();
        const datatest = await userService.submitUser(this.state.email, this.state.passwort);
        if(datatest===[]) {

        }
        console.log(datatest);
    };

    render() {
        return (
            <div className="Login">
                <Row>
                    <form onSubmit={this.login}>
                        <FormGroup controlId="email">
                            <FormLabel>E-mail</FormLabel>
                            <input type="email" name="email" placeholder="email" onChange={this.handleInputChange}/>
                        </FormGroup>
                        <FormGroup controlId="passwort">
                            <FormLabel>Passwort</FormLabel>
                            <FormControl type="password" name="passwort" placeholder="passwort"
                                         onChange={this.handleInputChange}/>
                        </FormGroup>
                        <Button type="submit" onClick={this.verifyUserInput} bsstyle="primary">Log In</Button>
                    </form>
                </Row>
            </div>
        )
    }
}

export default Login;