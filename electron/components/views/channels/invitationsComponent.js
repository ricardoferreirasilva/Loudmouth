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

class InvitationsComponent extends React.Component {
  constructor(props)
  {
    super();
  }
  render() {
    return (
      <div>
        <h1>Invitations</h1>
        <ListGroup>
            <ListGroupItem header="LOUDMOUTH" href="#">Hey! Join us!</ListGroupItem>
            <ListGroupItem header="LOUDMOUTH" href="#">Hey! Join us!</ListGroupItem>
            <ListGroupItem header="LOUDMOUTH" href="#">Hey! Join us!</ListGroupItem>  
        </ListGroup>
      </div>
    )
  }
}
export default InvitationsComponent
