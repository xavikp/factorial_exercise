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
import EditHistoryIcon from "../EditHistoryIcon/EditHistoryIcon";

//Component that render the Contact list
const ContactList = () => {
    //used for the contact List loading
    const [contacts, setContacts] = useState([]);
    const [length, setLength] = useState(0);
    const [edits, setEdits] = useState([]);

    var header = "CONTACT LIST";
    var empty_history = false;

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

    //function that handles the selection of contact to load its edit history
    //params: id -> contact id
    //returns list of edits
    const fetchEdits = (id) =>{
        axios.get('api/v1/edits/' + id)
            .then(resp => {
                if(resp.status !== 202){
                    console.log(resp.data.data);
                    setEdits(resp.data.data);
                }else{
                    console.log(resp.status)
                    setEdits([])
                }
            })
            .catch(resp => console.log(resp))
    }

    //function to delete a contact
    //params: id -> contact_id
    //uses axios to call the api to get edits and delete them first in order to delete the contact
    function handleDelete(id){
        console.log(contacts.length)
        axios.delete('api/v1/edits/' + id)
            .then()
            .catch(console.log("Deleting edits"))
        axios.delete('api/v1/contact_list/' + id)
            .then((reponse) =>{
                setLength(length - 1)
            })
            .catch(console.log("Deleting contact"))
    }


    //hook to get the contacts every time the length changes, done for the deleting process
    useEffect(() => {
        fetchContacts()
        }, [length])

    //function that prints the contact list in screen
    const list = contacts.map(item => {
        return (
            <div key={item.attributes.email} className='col-md-auto'>
                <div className='col-md-auto'>
                    <Row>
                        <div className='col-md-4'>
                            <b>{item.attributes.first_name + " " + item.attributes.last_name}</b>
                            <EditContactIcon width={"20%"} height={"20%"} id={item.id}/> <br/>
                            Email: {item.attributes.email} <br/>
                            Phone number: {item.attributes.phone_number} <br/>
                            {item.id}
                        </div>
                        <div className='col-md-4'>
                            <a onClick={() => fetchEdits(item.id)}><EditHistoryIcon  width={"30%"} height={"30%"}/></a>
                            <a onClick={() => handleDelete(item.id)}><DeleteUserIcon  width={"30%"} height={"30%"}/></a>
                        </div>
                    </Row>
                    <br/>
                </div>
            </div>

        )
    })

    const history = edits.map(item => {
            return (
                <div key={item.id}>
                    <Row>
                        Date of edit: {item.attributes.date} <br/>
                        Previous name: {item.attributes.previous_first_name + " " + item.attributes.previous_last_name}
                        <br/>
                        Previous email: {item.attributes.previous_email} <br/>
                        Previous phone number: {item.attributes.previous_phone_number} <br/>
                    </Row>
                    <br/>
                </div>
            )
        }
    )


    return (
        <div>
            <Header text={header}/>
            <Row>
                <Col className='icon'>
                    <HomeIcon width={"30%"} height={"30%"} />
                </Col>
                <Col className='icon'>
                    <NewUserIcon width={"30%"} height={"30%"} />
                </Col>
            </Row>
            <Row>
                <div className='col-md-7'>
                    {list}
                </div>
                <div className='col-md-5'>
                    <h4>Edit history</h4>
                    {history}
                </div>
            </Row>

        </div>
    )
}

export default  ContactList