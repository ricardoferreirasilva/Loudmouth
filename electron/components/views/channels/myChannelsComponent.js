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

class MyChannelsComponent extends React.Component {
  constructor(props)
  {
    super();
  }
  render() {
    return (
      <div>
        <h1>My Channels</h1>
        <ListGroup>
            <ListGroupItem header="SDIS" href="#">SDIS channel</ListGroupItem>
            <ListGroupItem header="LBAW" href="#">LBAW channel</ListGroupItem>
            <ListGroupItem header="COMP" href="#">COMP channel</ListGroupItem>  
        </ListGroup>
      </div>
    )
  }
}
export default MyChannelsComponent
