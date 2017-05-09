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
            activeComponent : 1,
        }
        this.loadComponent = this.loadComponent.bind(this);
    }
    loadComponent()
    {
        console.log("Changing component.");
        this.setState({activeComponent: 2});
    }
    render() {
        let activeComponent;
        switch(this.state.activeComponent)
        {
            case 1: activeComponent = (<LoginComponent loadComponent = {this.loadComponent}></LoginComponent>);
            case 2: activeComponent = (<ChannelsComponent loadComponent = {this.loadComponent}></ChannelsComponent>);
        }
        return (
            <div>
                {activeComponent}
            </div>
        )
    }
}
export default LoudmouthComponent