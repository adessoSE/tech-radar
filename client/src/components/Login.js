import React, { Component } from "react";
import { Row, FormGroup, FormControl, FormLabel, Button} from 'react-bootstrap';
import "../static/css/styles.scss";
import "../static/css/desctop.scss";
import "../static/css/mobile.scss";
import "./Login.scss"


class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            formData: {},
            errors: {},
            formSubmitted: false,

        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let { formData } = this.state;
        formData[name] = value;

        this.setState({
            formData: formData
        });
    }

    render() {

        return (
            <div className="Login">
                <Row>
            <form onSubmit={this.login}>
    <FormGroup controlId="email">
            <FormLabel>E-mail</FormLabel>
            <FormControl type="email" name="E-mail" placeholder="Enter your e-mail" onChange={this.handleInputChange} />
    </FormGroup>
        <FormGroup controlId="password" >
            <FormLabel>Password</FormLabel>
            <FormControl type="password" name="password" placeholder="Enter your password" onChange={this.handleInputChange} />
    </FormGroup>
        <Button type="submit" bsStyle="primary">Log In</Button>
        </form>
        </Row>
        </div>
    )
    }
}

export default Login;
