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

let BASE_URL = "http://localhost:3561/"; // http://vps301278.ovh.net:3561/

class CreateChannelComponent extends React.Component {
  constructor(props)
  {
      super();
      this.state = {
          channelName: '',
      };
      this.tryCreateChannel = this.tryCreateChannel.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
  }
  handleEmailChange(e) {
   this.setState({channelName: e.target.value});
  }
  tryCreateChannel() {
    var channelData =
        {
            "channelName": this.state.channelName,
            "token": localStorage.getItem("token"),
        };
    var request = new XMLHttpRequest();
    request.open('POST', BASE_URL + 'createChannel');
    request.setRequestHeader("Content-type", "application/json");
    request.onreadystatechange = () => {
        if (request.readyState !== 4) {
            return;
        }
        if (request.status === 200) {
            alert("Channel created sucessfully.");
        } else {
            alert("Channel creation error.");
        }
    };
    request.send(JSON.stringify(channelData));
  }
  render() {
    return (
        <div>
          <h2> Create channel </h2>
          <Form>
            <ControlLabel>Name of channel</ControlLabel>
            <FormControl id="channelName" type="text" placeholder="Enter the name of channel" onChange = {this.handleEmailChange}/>
            <Button block bsStyle="success" style={{marginTop: 1 + 'em'}} onClick={this.tryCreateChannel} >Create</Button>
          </Form>
        </div>
    )
  }
}
export default CreateChannelComponent
