import React from 'react'
import axios from 'axios'
import '../Home/Home.css';
import Header from "../Header/Header";
import {Card, Col, Form, Row} from "react-bootstrap";
import HomeIcon from "../HomeIcon/HomeIcon";
import ContactListIcon from "../ContactListIcon/ContactListIcon";

const NewContact = () => {
    var header = "NEW CONTACT";

    return (
        <div>
            <Header text={header}/>
            <Row>
                <Col className='icon'>
                    <HomeIcon width={"20%"} height={"20%"} />
                </Col>
                <Col className='icon'>
                    <ContactListIcon width={"20%"} height={"20%"} />
                </Col>
            </Row>
            <Form>
                Input the information of the new contact
                <Form.Group className="mb-3" controlId="first_name">
                    <Form.Control type="text" placeholder="First name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="last_name">
                    <Form.Control type="text" placeholder="Last name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Control type="number" placeholder="Phone number" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Control type="email" placeholder="Email" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default NewContact