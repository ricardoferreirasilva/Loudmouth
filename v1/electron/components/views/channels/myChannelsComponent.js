import React from "react";
import {Button, ListGroup, ListGroupItem} from "react-bootstrap";

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
        request.open('POST', this.props.serverURL + 'getChats');
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
        const data = {
            "token": localStorage.getItem("token"),
            "chatToLeave": event.target.value
        };
        var chatName = event.target.value;
        let request = new XMLHttpRequest();
        request.open('POST', this.props.serverURL + 'leaveChat');
        request.setRequestHeader("Content-type", "application/json");
        request.onreadystatechange = () => {
            if (request.readyState !== 4) {
                return;
            }
            if (request.status === 200) {

                //let res = JSON.parse(request.responseText);
                //this.setState({chats: res});
                //console.log(this.state.chats);
                 console.log("Left chat");
                 var index;
                 for(var i=0;i<this.state.chats.length;i++)
                 {
                     if(this.state.chats[i].chat_name == chatName)
                     {
                        index = i;
                        break;
                     }
                 }
                 var newChats = [];
                 newChats = this.state.chats;
                 newChats.splice(index,1);
                 console.log(newChats);
                 this.setState({chats: newChats});
            } else {
                console.warn('error');
            }
        };
        request.send(JSON.stringify(data));
    }

    drawChats() {
        if (this.state.chats.length == 0) {
            return (<p> You are not on any channel. </p>) 
        }

        let listChats = this.state.chats.map((chat) =>
            <ListGroupItem header={chat.chat_name} key={chat.id}>
                <Button bsStyle="success" value={chat.chat_name} onClick={this.selectChat}>Join</Button>
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
