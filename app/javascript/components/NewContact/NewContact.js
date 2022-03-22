import React, {useState} from 'react'
import axios from 'axios'
import '../Home/Home.css';
import Header from "../Header/Header";
import {Card, Col, Form, Row, Button} from "react-bootstrap";
import HomeIcon from "../HomeIcon/HomeIcon";
import ContactListIcon from "../ContactListIcon/ContactListIcon";

const NewContact = () => {
    var header = "NEW CONTACT";

    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone_number, setPhoneNumber] = useState("")


    //regex function for email validation
    function emailValidation(email){
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!email || regex.test(email) === false){
            alert("Email not valid")
            return false;
        }
        return true;
    }

    const postData = () => {
        const user = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone_number: phone_number
        }
        if (first_name.length < 2 || last_name.length < 2 || phone_number.length < 5 || phone_number.length >= 12 || !emailValidation(email))
        {
            alert("Please check your contact values! Remember to fill every field")
        }else{
            axios.post('api/v1/contact_list',{ ...user })
                .then(res => {
                    console.log(res)
                    alert("Contact is now in the list!")
                })
                .catch(res => {
                    alert("This email is already used in another contact!")
                })
        }
    }

    return (
        <div>
            <Header text={header}/>
            <Row>
                <Col className='icon'>
                    <HomeIcon width={"30%"} height={"30%"} />
                </Col>
                <Col className='icon'>
                    <ContactListIcon width={"30%"} height={"30%"} />
                </Col>
            </Row>
            <Row>

                <div className='col-md-4'> </div>
                <div className='col-md-4'>
                    <Form >
                        <h4>Input the information of the new contact</h4>
                        <input
                            className="mb-3 form-control"
                            value={first_name}
                            onChange={(e) => setFirstName(e.target.value)}
                            type="text"
                            placeholder="First name (minimum 2 chars)"
                            required={true}
                        />
                        <input
                            className="mb-3 form-control"
                            value={last_name}
                            onChange={(e) => setLastName(e.target.value)}
                            type="text"
                            placeholder="Last name (minimum 2 chars)"
                            required={true}
                        />
                        <input
                            className="mb-3 form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            placeholder="Email"
                            required={true}
                        />
                        <input
                            className="mb-3 form-control"
                            value={phone_number}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            type="number"
                            placeholder="Phone number (5 to 12 numbers)"
                            required={true}
                        />
                        <Button variant="primary" onClick={postData}>
                            Submit
                        </Button>
                    </Form>
                </div>
                <div className='col-md-4'> </div>
            </Row>

        </div>
    )
}

export default NewContact