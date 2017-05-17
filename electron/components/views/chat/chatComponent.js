import React from 'react'
import {
    Button,
    Form,
    FormGroup,
    FormControl,
    Col,
    Nav,
    NavItem,
    ControlLabel
} from 'react-bootstrap'
import ReactScrollbar from 'react-scrollbar-js';
import Style from "../../styles/login.module.css";
import io from 'socket.io-client';

import ChatMessagesComponent from './chatMessagesComponent.js';
import InviteComponent from './inviteComponent.js';

class ChatComponent extends React.Component {
    constructor(props)
    {
        super();
        this.state = {
            message: '',
            messages: [],
            currMenu: "ChatMessages",
            activeKey: 1,
        };
        this.sendMessage = this.sendMessage.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleMessages = this.handleMessages.bind(this);
        this.exit = this.exit.bind(this);
        this.showChat = this.showChat.bind(this);
        this.showInvite = this.showInvite.bind(this);
    }
    componentDidMount()
    {
      this.socket = io('http://vps301278.ovh.net:3563/');
      this.socket.on('message',   this.handleMessages);
      this.socket.on('connect', function (m) { console.log("socket.io connection open"); });
      //this.socket.emit("join",this.props.chatName);
      this.socket.emit('create', this.props.chatName);
    }
    handleMessages(messages)
    {
         this.setState({ messages: this.state.messages.concat(messages)})
         //console.log(this.state.messages);
    }
    handleMessageChange(e)
    {
        this.setState({message: e.target.value});
    }
    sendMessage()
    {
        //alert(this.state.message);
        this.socket.emit('message', this.props.chatName,this.state.message,);
    }
    exit()
    {
        this.props.loadComponent(2);
    }
    showChat(event)
    {
        this.setState({currMenu: "ChatMessages", activeKey: 1});
    }
    showInvite(event)
    {
        this.setState({currMenu: "Invite", activeKey: 2});
    }
    render() {
        const myScrollbar = {
          width: 500,
          height: 400,
        };
        let choosenMenu;
        if(this.state.currMenu == "ChatMessages")
        {
            choosenMenu = (
            <ChatMessagesComponent sendMessage = {this.sendMessage} handleMessageChange = {this.handleMessageChange} messages = {this.state.messages}></ChatMessagesComponent>
            )
        } else if (this.state.currMenu == "Invite") {
            choosenMenu = (
            <InviteComponent chatName = {this.props.chatName} showChat = {this.showChat}></InviteComponent>
            )
        }
        return (
          <div>
              <Col md={3}></Col>
              <Col md={6}>
                  <div className = {Style.titleBox}>
                          <p> {this.props.chatName}  </p>
                  </div>
                  <Nav bsStyle="pills" activeKey={this.state.activeKey}>
                      <NavItem eventKey={1} value="true" onClick={this.showChat}>Chat</NavItem>
                      <NavItem eventKey={2} value="false" onClick={this.showInvite} >Invite</NavItem>
                      <NavItem eventKey={3} onClick={this.exit}>Exit</NavItem>
                  </Nav>
                  {choosenMenu}
              </Col>
              <Col md={3}></Col>
          </div>
        )
    }
}
export default ChatComponent
