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

class ChatMessagesComponent extends React.Component {
    constructor(props)
    {
        super();
         this.state = {
        };
        this.drawMessages = this.drawMessages.bind(this);
    }
    drawMessages()
    {
        var listMessages = this.props.messages.map((msg) =>
            <p>
                {msg}
            </p>);
        return (<div>{listMessages}</div>);
    }
    render() {
        const myScrollbar = {
          height: 400,
        };
        return (
            <div>
                <div>
                <Col md={3} xs={2}/>
                <Col md={6} xs={8}>
                        <ReactScrollbar style={myScrollbar}>
                                <div className="should-have-a-children scroll-me">
                                       {this.drawMessages()}
                                </div>
                        </ReactScrollbar>
                        <Form inline>
                          <FormControl type="text" placeholder="" onChange={this.props.handleMessageChange}/>
                          {' '}
                          <Button bsStyle="success" onClick={this.props.sendMessage}>Send</Button>
                        </Form>
                        <div className={Style.switchBox}></div>
                </Col>
                <Col md={3} xs={2}/>
                </div>
            </div>
        )
    }
}
export default ChatMessagesComponent
