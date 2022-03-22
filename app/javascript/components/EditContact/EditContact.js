import React, {useEffect, useState} from 'react'
import axios from 'axios'
import '../Home/Home.css';
import Header from "../Header/Header";
import {Col, Form, Row, Button} from "react-bootstrap";
import HomeIcon from "../HomeIcon/HomeIcon";
import ContactListIcon from "../ContactListIcon/ContactListIcon";
import moment from "moment";
import {useParams} from "react-router";



const EditContact = () => {
    var header = "EDIT CONTACT INFO";

    //var to get the userId from URL
    const userId = useParams();
    //contact information
    const [contact, setContact] = useState([]);

    //contact edit form vars
    const [new_first_name, setFirstName] = useInput({ type: "text" });
    const [new_last_name, setLastName] = useInput({ type: "text" });
    const [new_email, setEmail] = useInput({ type: "text" });
    const [new_phone_number, setPhoneNumber] = useInput({ type: "number" });

    //function to render inputs in a way that useEffect doesn't render new inputs
    //params: type -> type of input ;
    //returns value of input and the input tag
    function useInput({ type /*...*/ }) {
        const [value, setValue] = useState("");
        const input = <input
            value={value}
            className="mb-3 form-control"
            onChange={e => setValue(e.target.value)} type={type} />;
        return [value, input];
    }

    //uses axios to get a certain user
    const fetchContactInfo = () =>{
        axios.get('/api/v1/contact_list/' + userId.id + '.json')
            .then( resp => {
                console.log(resp.data.data)
                setContact(resp.data.data);
            })
            .catch(resp => console.log(resp))
    }

    useEffect(() => {
        fetchContactInfo()
    }, [])

    //regex function for email validation
    function emailValidation(email){
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!email || regex.test(email) === false){
            alert("Email not valid")
            return false;
        }
        return true;
    }

    //function to call the API so the changes are saved in the DB and the edits DB is populated with those changes
    const postEdit = () => {
        //local vars for the API call
        let name = new_first_name;
        let last = new_last_name;
        let eM = new_email;
        let phone = new_phone_number;
        //checks if each field is null so that all fields send some information
        if (new_first_name.length < 2)
        {
            name=contact[0].attributes.first_name
        }
        if (new_last_name.length < 2)
        {
            last=contact[0].attributes.last_name
        }
        if(new_email.length < 3)
        {
            eM=contact[0].attributes.email
        }
        if(new_phone_number.length < 5 || new_phone_number.length >= 12)
        {
            phone=contact[0].attributes.phone_number
        }
        //object that carries the updated data of the contact
        const edited_contact = {
            first_name: name,
            last_name: last,
            email: eM,
            new_phone_number: phone,
            id: contact[0].id
        }
        //object that carries the data of the edit
        const edit_data = {
            date: moment().format("MMM Do YY"),
            previous_first_name: contact[0].attributes.first_name,
            previous_last_name: contact[0].attributes.last_name,
            previous_email: contact[0].attributes.email,
            previous_phone_number: contact[0].attributes.phone_number,
            contact_id: contact[0].id
        }
        //api call to make the changes if the email is valid
        if (emailValidation(eM))
        {
            axios.put('/api/v1/contact_list/' + contact[0].id, {...edited_contact})
                .then(res => {
                    //api call to add the edit entry on the EDITS Table
                    axios.post('/api/v1/edits', {...edit_data}).
                    then (resp => {
                        alert("Contact edited!")
                    })
                })
                .catch(res=> {
                        //This alert happens when the API returns status 405
                        alert("Email binded to another contact!")
                    }
                )
        }else{
            alert("Email not valid")
        }

    }

    const form = contact.map(item => {
        return(
            <Form id="form-edit-contact">
                <h4>Input the new information of the contact </h4><br/><br/>
                Current First Name: <b>{item.attributes.first_name}</b><br/>
                {setFirstName}<br/>
                Current Last Name: <b>{item.attributes.last_name}</b><br/>
                {setLastName} <br/>
                Current Email: <b>{item.attributes.email}</b><br/>
                {setEmail}<br/>
                Current Phone Number: <b>{item.attributes.phone_number} </b><br/>
                {setPhoneNumber}<br/>
                <Button variant="primary" onClick={postEdit}>
                    Submit
                </Button>
            </Form>
        )
    })
    return(
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
                    {form}
                </div>
                <div className='col-md-4'> </div>
            </Row>
        </div>
    )
}

export default EditContact