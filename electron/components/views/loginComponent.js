import React from 'react'
import {
    Button,
    Form,
    Nav,
    NavItem,
    FormGroup,
    Glyphicon,
    FormControl,
    Col,
    HelpBlock,
    ButtonGroup,
    ButtonToolbar,
    ControlLabel,
    Grid, 
    Row
} from 'react-bootstrap'

import SigninComponent from './signinComponent.js';
import RegisterComponent from './registerComponent.js';

import FacebookProvider, { Login } from 'react-facebook';

import Style from '../styles/login.module.css';
class LoginComponent extends React.Component {
    constructor(props)
    {
        super();
        this.state = {
            onRegister: "true",
            onLogin: "true",
            loginEmail : '',
            loginPassword: '',
            registerEmail : '',
            registerFirstname: '',
            registerLastname: '',
            registerPassword: '',
        };
        this.setOnLogin = this.setOnLogin.bind(this);
        this.setOffLogin = this.setOffLogin.bind(this);
        this.tryLogin = this.tryLogin.bind(this);
        this.tryRegister = this.tryRegister.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount(){

    }
    handleChange(event) {
        switch(event.target.id)
        {
            case "loginEmail" :this.setState({loginEmail: event.target.value});
            case "loginPassword" :this.setState({loginPassword: event.target.value});
            case "registerEmail" :this.setState({registerEmail: event.target.value});
            case "registerFirstname" :this.setState({registerFirstname: event.target.value});
            case "registerLastname" :this.setState({registerLastname: event.target.value});
            case "registerPassword" :this.setState({registerPassword: event.target.value});
        }
    }
    setOnLogin(event) {
        this.setState({onLogin: "true"})
        console.log(this.state.onLogin);
    }
    setOffLogin(event) {
        this.setState({onLogin: "false"})
        console.log(this.state.onLogin);
    }
    tryRegister()
    {
        var loginData =
        {
            "email" : this.state.registerEmail,
            "firstname" : this.state.registerFirstname,
            "lastname" : this.state.registerLastname,
            "password" : this.state.registerPassword,
        }
        var request = new XMLHttpRequest();
        request.open('POST', 'http://vps301278.ovh.net:3561/register');
        request.setRequestHeader("Content-type", "application/json");
        request.onreadystatechange = (e) => {
            if (request.readyState !== 4) {
                return;
            }
            if (request.status === 200) {
                localStorage.setItem("username", this.state.registerEmail);
                alert("Register Sucessfull");
                this.setState({onLogin: "true"});
            } else {
                alert("Register error.")
                this.setState({onLogin: "true"});
            }
        };
        request.send(JSON.stringify(loginData));
    }
    tryLogin()
    {
        var loginData =
        {
            "email" : this.state.loginEmail,
            "password" : this.state.loginPassword,
        }
        var request = new XMLHttpRequest();
        request.open('POST', 'http://vps301278.ovh.net:3561/login');
        request.setRequestHeader("Content-type", "application/json");
        request.onreadystatechange = (e) => {
            if (request.readyState !== 4) {
                return;
            }
            if (request.status === 200) {
                localStorage.setItem("email", this.state.loginEmail);
                console.log(request.responseText);
                console.log(localStorage.getItem("email"));
            } else {
                console.warn('error');
            }
        };
        request.send(JSON.stringify(loginData));
    }
    render()
    {
        let choosenForm;
        if(this.state.onLogin == "true")
        {
          choosenForm = (
            <SigninComponent handleChange={this.handleChange} tryLogin={this.tryLogin}></SigninComponent>
          )
        } else
          choosenForm = (
            <RegisterComponent handleChange={this.handleChange} tryRegister={this.tryRegister}></RegisterComponent>
          )
        return (
            <div>
                <Col md={4} xs={2}></Col>
                <Col md={4} xs={8}>
                    <div className={Style.controlBox}>
                        <Nav bsStyle="pills" >
                            <NavItem value="true" onClick={this.setOnLogin}>Login</NavItem>
                            <NavItem value="false" onClick={this.setOffLogin} >Register</NavItem>
                        </Nav>
                        <div className = {Style.titleBox}>
                            <p> LOUDMOUTH </p>
                        </div>
                        {choosenForm}
                        <div className = {Style.switchBox}>
                        </div>
                    </div>
                </Col>
                <Col md={4} xs={2}></Col>
            </div>
        )
    }
}
export default LoginComponent
