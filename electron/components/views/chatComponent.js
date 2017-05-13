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
import Style from "../styles/login.module.css";
import io from 'socket.io-client';
class ChatComponent extends React.Component {
    constructor(props)
    {
        super();
         this.state = {
            message: '',
            messages: ['a'],
        };
        this.sendMessage = this.sendMessage.bind(this);
        this.drawMessages = this.drawMessages.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleMessages = this.handleMessages.bind(this);

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
    drawMessages()
    {
        var listMessages = this.state.messages.map((msg) =>
            <p>
                {msg}
            </p>);
        return (<div>{listMessages}</div>);
    }
    render() {
    const myScrollbar = {
      width: 500,
      height: 400,
    };
        return (
            <div>
                <div>
                <Col md={3} xs={2}/>
                <Col md={6} xs={8}>
                <div className={Style.controlBox}>
                        <Nav bsStyle="pills">
                            
                        </Nav>
                        <div className={Style.titleBox}>
                            <p> {this.props.chatName} </p>
                        </div>
                         <ReactScrollbar style={myScrollbar}>
                                <div className="should-have-a-children scroll-me">
                                       {this.drawMessages()}
                                </div>
                        </ReactScrollbar>
                          <Form inline>
                                <FormControl type="text" placeholder="" onChange={this.handleMessageChange}/>
                                {' '}
                                <Button bsStyle="success" onClick={this.sendMessage}>Send</Button>
                            </Form>
                        <div className={Style.switchBox}>
                        </div>
                    </div>
                </Col>
                <Col md={3} xs={2}/>
            </div>
            </div>
        )
    }
}
export default ChatComponent