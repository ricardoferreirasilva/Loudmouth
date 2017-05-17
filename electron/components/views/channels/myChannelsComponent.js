import React from 'react'
import {
  Button,
  Form,
  Glyphicon,
  FormControl,
  ControlLabel,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap'

class elsComponent extends React.Component {
  constructor(props)
  {
      super();
      this.state =
      {
          chats: []
      }
      this.getChats = this.getChats.bind(this);
       this.selectChat = this.selectChat.bind(this);

  }
  componentDidMount() {
      this.getChats();
  }
  selectChat(event)
  {
    var chatname = event.target.value;
    this.props.loadChat(chatname);
  }
  getChats()
  {
      console.log("Getting chats.");
      var data =
      {
              "token": localStorage.getItem("token"),
      };
      var request = new XMLHttpRequest();
      request.open('POST', this.props.serverURL + 'getChats');
      request.setRequestHeader("Content-type", "application/json");
      request.onreadystatechange = () => {
          if (request.readyState !== 4) {
              return;
          }
          if (request.status === 200) {
              var res = JSON.parse(request.responseText);
              this.setState({chats:res});
              console.log(this.state.chats);
          } else {
              console.warn('error');
          }
      };
      request.send(JSON.stringify(data));
  }
  drawChats()
  {
    var listChats = this.state.chats.map((chat) =>
        <ListGroupItem header={chat.chat_name} key={chat.id}>
            <Button bsStyle="success" value={chat.chat_name}  onClick={this.selectChat}>Join</Button>
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
