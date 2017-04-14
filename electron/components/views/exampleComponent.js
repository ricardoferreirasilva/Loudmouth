import React from 'react'
import {
    Button,
    Form,
    FormGroup,
    FormControl,
    Col,
    ControlLabel
} from 'react-bootstrap'


class ExampleComponent extends React.Component {
    constructor(props)
    {
        super();
    }
    render() {
        return (
            <div>
                <Col md={3}></Col>
                <Col md={6}>
                   <p> Hello World </p>
                </Col>
                <Col md={3}></Col>
            </div>
            
        )
    }
}
export default ExampleComponent