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

class InviteComponent extends React.Component {
    constructor(props)
    {
        super();
        this.state = {

        };
        this.invite = this.invite.bind(this);
    }
    invite()
    {
      console.log('send invite!!!!');
    }
    render() {
        const myScrollbar = {
          width: 500,
          height: 400,
        };
        return (
          <div>
            <h2> Invite </h2>
            <Form>
              <ControlLabel>Person email</ControlLabel>
              <FormControl id="channelName" type="text" placeholder="Enter the email here..." onChange = {this.handleEmailChange}/>
              <Button block bsStyle="success" style={{marginTop: 1 + 'em'}} onClick={this.invite} >Invite</Button>
            </Form>
          </div>
        )
    }
}
export default InviteComponent
