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
            activeComponent : 1,
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
            case 1: return (<LoginComponent loadComponent = {this.loadComponent}></LoginComponent>);
            case 2: return (<ChannelsComponent loadComponent = {this.loadComponent} loadChat = {this.loadChat}></ChannelsComponent>);
            case 3: return (<ChatComponent loadComponent = {this.loadComponent} chatName = {this.state.chat_name}></ChatComponent>);
            default: return (<LoginComponent loadComponent = {this.loadComponent}></LoginComponent>);
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
