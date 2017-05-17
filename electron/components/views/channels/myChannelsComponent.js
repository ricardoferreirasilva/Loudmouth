import React from "react";
import {Button, ListGroup, ListGroupItem} from "react-bootstrap";

//let BASE_URL = "http://localhost:3561/"; // http://vps301278.ovh.net:3561/
let BASE_URL = "https://vps301278.ovh.net:3562/";
class elsComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            chats: []
        };
        this.getChats = this.getChats.bind(this);
        this.selectChat = this.selectChat.bind(this);
        this.inviteToChat = this.inviteToChat.bind(this);
        this.leaveChat = this.leaveChat.bind(this);

    }

    componentDidMount() {
        this.getChats();
    }

    selectChat(event) {
        const chatname = event.target.value;
        this.props.loadChat(chatname);
    }

    getChats() {
        console.log("Getting chats.");
        let data = {
            "token": localStorage.getItem("token"),
        };
        let request = new XMLHttpRequest();
        request.open('POST', BASE_URL + 'getChats');
        request.setRequestHeader("Content-type", "application/json");
        request.onreadystatechange = () => {
            if (request.readyState !== 4) {
                return;
            }
            if (request.status === 200) {
                const res = JSON.parse(request.responseText);
                this.setState({chats: res});
                console.log(this.state.chats);
            } else {
                console.warn('error');
            }
        };
        request.send(JSON.stringify(data));
    }

    inviteToChat(event) {//TODO: Apenas tem um botão. Vai ter que ter uma caixa de texto para escrever o nome do user a convidar
        const data = {
            "token": localStorage.getItem("token"),
            "chatToLeave": event.target.value,
            "userToInvite": "user to invite"
        };
    }

    leaveChat(event) {
        console.log("Leaving chat.");
        const data = {
            "token": localStorage.getItem("token"),
            "chatToLeave": event.target.value
        };
        let request = new XMLHttpRequest();
        request.open('POST', BASE_URL + 'leaveChat');
        request.setRequestHeader("Content-type", "application/json");
        request.onreadystatechange = () => {
            if (request.readyState !== 4) {
                return;
            }
            if (request.status === 200) {
                let res = JSON.parse(request.responseText);
                this.setState({chats: res});
                console.log(this.state.chats);
            } else {
                console.warn('error');
            }
        };
        request.send(JSON.stringify(data));
    }

    drawChats() {
        let listChats = this.state.chats.map((chat) =>
            <ListGroupItem header={chat.chat_name} key={chat.id}>
                <Button bsStyle="success" value={chat.chat_name} onClick={this.selectChat}>Join</Button>
                <Button bsStyle="success" value={chat.chat_name} onClick={this.inviteToChat}>Invite</Button>
                <Button bsStyle="success" value={chat.chat_name} onClick={this.leaveChat}>Leave</Button>
            </ListGroupItem>);
        return (<ListGroup>{listChats}</ListGroup>);
    }

    render() {
        return (
            <div>
                <h1>My Channels</h1>
                <ListGroup>
                    {this.drawChats()}
                </ListGroup>
            </div>
        )
    }
}
export default elsComponent
