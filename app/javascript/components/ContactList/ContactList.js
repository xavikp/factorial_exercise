import ReactDOM from "react-dom";
import App from "../App";
import React, {useEffect, useState} from "react";
import axios from 'axios'
import '../Home/Home.css';
import Header from "../Header/Header";
import {Card, Col, Row} from "react-bootstrap";
import HomeIcon from "../HomeIcon/HomeIcon";
import NewUserIcon from "../NewUserIcon/NewUserIcon";
import EditContactIcon from "../EditContactIcon/EditContactIcon";
import DeleteUserIcon from "../DeleteUserIcon/DeleteUserIcon";

//Component that render the Contact list
const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [length, setLength] = useState(0);
    var header = "CONTACT LIST";

    //function to get the contacts that are in the DB
    //uses axios to call the API and get the info
    const fetchContacts = () => {
        axios.get('api/v1/contact_list.json')
            .then( resp => {
                setContacts(resp.data.data);
                console.log(resp)
                setLength(contacts.length)
            })
            .catch(resp => console.log(resp))
    }

    //function to delete a contact
    //uses axios to call the api to get edits and delete them first in order to delete the contact
    function handleDelete(id){
        console.log(contacts.length)
        axios.delete('api/v1/edits/' + id)
            .then()
            .catch(console.log("Error while deleting edits"))
        axios.delete('api/v1/contact_list/' + id)
            .then((reponse) =>{
                setLength(length - 1)
            })
            .catch(console.log("Error while deleting contact"))
    }

    //hook to get the contacts every time the length changes, done for the deleting process
    useEffect(() => {
        fetchContacts()
        }, [length])


    const list = contacts.map(item => {
        return (
            <div key={item.attributes.email} className='col-md-5'>

                    <div className='col-md-3'>
                        <b>{item.attributes.first_name + " " + item.attributes.last_name}</b> <br/>
                        {item.attributes.email} <br/>
                        {item.attributes.phone_number} <br/>
                        {item.id}
                    </div>
                    <div className='col-md-2'>
                        <EditContactIcon width={"20%"} height={"20%"} id={item.id}/>
                        <p onClick={() => handleDelete(item.id)}><DeleteUserIcon  width={"20%"} height={"20%"}/></p>
                    </div>
            </div>
        )
    })

    return (
        <div>
            <Header text={header}/>
            <Row>
                <Col className='icon'>
                    <HomeIcon width={"20%"} height={"20%"} />
                </Col>
                <Col className='icon'>
                    <NewUserIcon width={"20%"} height={"20%"} />
                </Col>
            </Row>
            <Row>
                <Col>
                    {list}
                </Col>
            </Row>

        </div>
    )
}

export default  ContactList