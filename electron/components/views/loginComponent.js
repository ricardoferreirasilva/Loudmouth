import React from 'react'
import {
    Button,
    Form,
    FormGroup,
    FormControl,
    Col,
    HelpBlock,
    ButtonGroup,
    ButtonToolbar,
    ControlLabel
} from 'react-bootstrap'
import FacebookProvider, { Login } from 'react-facebook';
import Style from '../styles/login.module.css'
class LoginComponent extends React.Component {
    constructor(props)
    {
        super();
        this.state = {
            onLogin: "true",
        };
        this.setOnLogin = this.setOnLogin.bind(this)
    }
    setOnLogin(event) {
        this.setState({onLogin: event.target.value})
        console.log(this.state.onLogin);
    }
    render() 
    {
        let choosenForm;
        if(this.state.onLogin == "true")
        {
            choosenForm = (
                <Form>
                    <ControlLabel>Email</ControlLabel>
                    <FormControl type="text" placeholder="Enter text"/>
                        <ControlLabel>Password</ControlLabel>
                    <FormControl type="password" placeholder="Enter text"/>
                        <Button bsStyle="primary" type="submit">
                    Submit
                    </Button>
                </Form>)
        }
        else choosenForm = (
            <Form>
                <ControlLabel>Email</ControlLabel>
                <FormControl type="text" placeholder="Enter text"/>
                <ControlLabel>Password</ControlLabel>
                <FormControl type="password" placeholder="Enter text"/>
                <ControlLabel>Repeat Password</ControlLabel>
                <FormControl type="password" placeholder="Enter text"/>
                <Button bsStyle="primary" type="submit">
                Submit
                </Button>
            </Form>
        )
        return (
            <div>
                <Col md={4}></Col>
                <Col md={4}>
                    <div className={Style.controlBox}>
                        <div className = {Style.titleBox}>
                            <p> LOUDMOUTH </p>
                        </div>
                        {choosenForm}
                        <div className = {Style.switchBox}>
                            <Button block bsStyle="success" value="true" onClick={this.setOnLogin}>Login</Button>
                            <Button block bsStyle="success" value="false" onClick={this.setOnLogin} >Register</Button>
                        </div>
                    </div>
                </Col>
                <Col md={4}></Col>
            </div>
            
        )
    }
}
export default LoginComponent