import React from "react";
import {Col, Nav, NavItem} from "react-bootstrap";

import SigninComponent from "./signinComponent.js";
import RegisterComponent from "./registerComponent.js";

import Style from "../styles/login.module.css";
class LoginComponent extends React.Component {
    constructor(props) {
        super();
        this.state = {
            onRegister: "true",
            onLogin: "true",
            loginEmail: '',
            loginPassword: '',
            registerEmail: '',
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

    componentDidMount() {

    }

    handleChange(event) {
        switch (event.target.id) {
            case "loginEmail" :
                this.setState({loginEmail: event.target.value});
                break;
            case "loginPassword" :
                this.setState({loginPassword: event.target.value});
                break;
            case "registerEmail" :
                this.setState({registerEmail: event.target.value});
                break;
            case "registerFirstname" :
                this.setState({registerFirstname: event.target.value});
                break;
            case "registerLastname" :
                this.setState({registerLastname: event.target.value});
                break;
            case "registerPassword" :
                this.setState({registerPassword: event.target.value});
                break;
        }
    }

    setOnLogin() {
        this.setState({onLogin: "true"});
        console.log(this.state.onLogin);
    }

    setOffLogin() {
        this.setState({onLogin: "false"});
        console.log(this.state.onLogin);
    }

    tryRegister() {
        var loginData =
            {
                "email": this.state.registerEmail,
                "firstname": this.state.registerFirstname,
                "lastname": this.state.registerLastname,
                "password": this.state.registerPassword,
            };
        var request = new XMLHttpRequest();
        request.open('POST', 'http://vps301278.ovh.net:3561/register');
        request.setRequestHeader("Content-type", "application/json");
        request.onreadystatechange = () => {
            if (request.readyState !== 4) {
                return;
            }
            if (request.status === 200) {
                localStorage.setItem("username", this.state.registerEmail);
                alert("Register Sucessfull");
                this.setState({onLogin: "true"});
            } else {
                alert("Register error.");
                this.setState({onLogin: "true"});
            }
        };
        request.send(JSON.stringify(loginData));
    }

    tryLogin() {
        var loginData =
            {
                "email": this.state.loginEmail,
                "password": this.state.loginPassword,
            };
        var request = new XMLHttpRequest();
        request.open('POST', 'http://vps301278.ovh.net:3561/login');
        request.setRequestHeader("Content-type", "application/json");
        request.onreadystatechange = () => {
            if (request.readyState !== 4) {
                return;
            }
            if (request.status === 200) {
                localStorage.setItem("email", this.state.loginEmail);
                var res = JSON.parse(request.responseText);
                localStorage.setItem("token", res.token);
                //console.log(localStorage.getItem("email"));
                alert("Login Sucessfull. Token: "+localStorage.getItem("token"));
                this.props.loadComponent(2);
            } else {
                console.warn('error');
            }
        };
        request.send(JSON.stringify(loginData));
    }

    render() {
        let choosenForm;
        if (this.state.onLogin === "true") {
            choosenForm = (
                <SigninComponent handleChange={this.handleChange} tryLogin={this.tryLogin}/>
            )
        } else
            choosenForm = (
                <RegisterComponent handleChange={this.handleChange} tryRegister={this.tryRegister}/>
            );
        return (
            <div>
                <Col md={4} xs={2}/>
                <Col md={4} xs={8}>
                    <div className={Style.controlBox}>
                        <Nav bsStyle="pills">
                            <NavItem value="true" onClick={this.setOnLogin}>Login</NavItem>
                            <NavItem value="false" onClick={this.setOffLogin}>Register</NavItem>
                        </Nav>
                        <div className={Style.titleBox}>
                            <p> LOUDMOUTH </p>
                        </div>
                        {choosenForm}
                        <div className={Style.switchBox}>
                        </div>
                    </div>
                </Col>
                <Col md={4} xs={2}/>
            </div>
        )
    }
}
export default LoginComponent
