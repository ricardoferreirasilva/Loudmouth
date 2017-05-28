import React from "react";
import {Button, ControlLabel, Form, FormControl} from "react-bootstrap";

class SigninComponent extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <h2> Login </h2>
                <Form>
                    <ControlLabel>Email</ControlLabel>
                    <FormControl id="loginEmail" type="text" placeholder="Enter email"
                                 onChange={this.props.handleChange}/>
                    <ControlLabel>Password</ControlLabel>
                    <FormControl id="loginPassword" type="password" placeholder="Enter password"
                                 onChange={this.props.handleChange}/>
                    <Button block bsStyle="success" style={{marginTop: 1 + 'em'}}
                            onClick={this.props.tryLogin}>Login</Button>
                </Form>
            </div>
        )
    }
}
export default SigninComponent
