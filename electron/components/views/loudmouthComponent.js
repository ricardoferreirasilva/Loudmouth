import React from 'react'
import {
    Button,
    Form,
    FormGroup,
    FormControl,
    Col,
    ControlLabel
} from 'react-bootstrap'

import LoginComponent from './loginComponent.js';
import ChatComponent from './chat/chatComponent.js';
import ChannelsComponent from './channels/channelsComponent.js';
class LoudmouthComponent extends React.Component {
    constructor(props)
    {
        super();
        /*
            1 -> Authentication Component
            2 -> Chatlist Component
            3 -> Chat Component
        */
        this.state = {
            chat_name: "",
            activeComponent: 1,
            serverURL: "http://localhost:3561/", // https://vps301278.ovh.net:3562/
            serverSocketURL: "http://localhost:3563/", // 'http://vps301278.ovh.net:3563/
        }
        this.loadComponent = this.loadComponent.bind(this);
        this.loadChat = this.loadChat.bind(this);
        this.getComponent = this.getComponent.bind(this);
    }
    loadComponent(i)
    {
        console.log("Changing component.");
        this.setState({activeComponent: i});
    }
    loadChat(chatname)
    {
        this.setState({chat_name: chatname});
        this.loadComponent(3);
    }
    getComponent()
    {
        console.log(this.state.activeComponent);
        switch(this.state.activeComponent)
        {
            case 1: return (<LoginComponent loadComponent = {this.loadComponent} serverURL = {this.state.serverURL}></LoginComponent>);
            case 2: return (<ChannelsComponent loadComponent = {this.loadComponent} loadChat = {this.loadChat} serverURL = {this.state.serverURL}></ChannelsComponent>);
            case 3: return (<ChatComponent loadComponent = {this.loadComponent} chatName = {this.state.chat_name} serverURL = {this.state.serverURL} serverSocketURL = {this.state.serverSocketURL}></ChatComponent>);
            default: return (<LoginComponent loadComponent = {this.loadComponent} serverURL = {this.state.serverURL}></LoginComponent>);
        }
    }
    render() {
        return (
            <div>
                {this.getComponent()}
            </div>
        )
    }
}
export default LoudmouthComponent
