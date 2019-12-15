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

        return(
          <div>
              {this.isAuthenticated? <Redirect to={{pathname:'/'}}/> :
                  (

                          <form>
                              <FormGroup controlId="email">
                                  <FormLabel>E-mail</FormLabel>
                                  <input type="email" name="email" placeholder="email" onChange={this.handleEmailChanged}/>
                              </FormGroup>
                              <FormGroup controlId="passwort">
                                  <FormLabel>Passwort</FormLabel>
                                  <FormControl type="password" name="passwort" placeholder="passwort"
                                               onChange={this.handlePasswortChanged}/>
                              </FormGroup>
                              <Button type="submit" onClick={this.verifyUserInput} bsstyle="primary">Log In</Button>
                          </form>

                      )
              }
          </div>
        );
    }
}


export default Login;