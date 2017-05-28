import React from 'react'
import {
  Button,
  Form,
  Glyphicon,
  FormControl,
  ControlLabel
} from 'react-bootstrap'

class RegisterComponent extends React.Component {
  constructor(props)
  {
    super();
  }
  render() {
    return (
      <div>
        <h2> Register </h2>
        <Form>
          <ControlLabel>Email</ControlLabel>
          <FormControl id="registerEmail" type="email" placeholder="Enter email." onChange = {this.props.handleChange}/>
          <ControlLabel>First Name</ControlLabel>
          <FormControl id="registerFirstname" type="text" placeholder="Enter your first name." onChange = {this.props.handleChange}/>
          <ControlLabel>Last name</ControlLabel>
          <FormControl id="registerLastname" type="text" placeholder="Enter your last name." onChange = {this.props.handleChange}/>
          <ControlLabel>Password</ControlLabel>
          <FormControl id="registerPassword" type="password" placeholder="Enter password" onChange = {this.props.handleChange}/>
          <Button block bsStyle="success" style={{marginTop: 1 + 'em'}} onClick={this.props.tryRegister} >Register</Button>
        </Form>
      </div>
    )
  }
}
export default RegisterComponent
