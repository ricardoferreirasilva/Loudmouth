import React from 'react'
import {
    Button,
    Form,
    FormGroup,
    FormControl,
    Col,
    ControlLabel,
    ListGroup,
    ListGroupItem,
    Nav,
    NavItem
} from 'react-bootstrap'

import Style from '../../styles/login.module.css';

import MyChannelsComponent from './myChannelsComponent.js';
import InvitationsComponent from './invitationsComponent.js';

class ExampleComponent extends React.Component {
    constructor(props)
    {
        super();
        this.state = {
            currMenu: "MyChannels",
            activeKey: 1
        };
        this.showMyChannels = this.showMyChannels.bind(this);
        this.showInvitations = this.showInvitations.bind(this);
        this.logout = this.logout.bind(this);
    }
    logout()
    {
        this.props.loadComponent(1);
    }
    showMyChannels(event) {
        this.setState({currMenu: "MyChannels", activeKey: 1});
    }
    showInvitations(event) {
        this.setState({currMenu: "Invitations", activeKey: 2});
    }
    render() {
        let choosenMenu;
        if(this.state.currMenu == "MyChannels")
        {
          choosenMenu = (
            <MyChannelsComponent></MyChannelsComponent>
          )
        } else if (this.state.currMenu == "Invitations")
          choosenMenu = (
            <InvitationsComponent></InvitationsComponent>
          )
        return (
            <div>
                <Col md={3}></Col>
                <Col md={6}>
                    <div className = {Style.titleBox}>
                            <p> LOUDMOUTH  </p>
                    </div>
                    <Nav bsStyle="pills" activeKey={this.state.activeKey}>
                        <NavItem eventKey={1} value="true" onClick={this.showMyChannels}>My Channels</NavItem>
                        <NavItem eventKey={2} value="false" onClick={this.showInvitations} >Invitations</NavItem>
                        <NavItem eventKey={3} onClick={this.logout}>Logout</NavItem>
                        
                    </Nav>
                    {choosenMenu}
                </Col>
                <Col md={3}></Col>
            </div>
        )
    }
}
export default ExampleComponent