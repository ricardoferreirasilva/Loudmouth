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
    }
    loadComponent()
    {
        var i = 1;
        this.setState({activeComponent: i});
    }
    render() {
        let activeComponent;
        switch(this.state.activeComponent)
        {
            case 1: activeComponent = (<LoginComponent></LoginComponent>);
        }
        return (
            <div>
                {activeComponent}
            </div>
        )
    }
}
export default LoudmouthComponent