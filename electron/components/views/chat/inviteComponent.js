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
          emailOfPerson: '',
        };
        this.invite = this.invite.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
    }
    handleEmailChange(e)
    {
       console.log('email change!!!');
       this.setState({emailOfPerson: e.target.value});
    }
    invite()
    {
      console.log('send invite!!!!');
      var inviteData =
          {
              "chatName": this.props.chatName,
              "token": localStorage.getItem("token"),
              "email" : this.state.emailOfPerson,
          };
      var request = new XMLHttpRequest();
      request.open('POST', this.props.serverURL + 'createInvitation');
      request.setRequestHeader("Content-type", "application/json");
      request.onreadystatechange = () => {
          if (request.readyState !== 4) {
              return;
          }
          if (request.status === 200) {
              alert("Invitation created sucessfully.");
              this.props.showChat();
          } else {
              alert("Channel creation error.");
          }
      };
      request.send(JSON.stringify(inviteData));
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
