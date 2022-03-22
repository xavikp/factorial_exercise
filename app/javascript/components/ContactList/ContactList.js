import React, {useEffect, useState} from "react";
import axios from 'axios'
import '../Home/Home.css';
import Header from "../Header/Header";
import {Button, Col, Container, Modal, ModalBody, Row} from "react-bootstrap";
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


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
            <div key={item.attributes.email} className='justify-content-center'>
                    <Row>
                        <div className='col-md-6'>
                            <strong>{item.attributes.first_name + " " + item.attributes.last_name}</strong>
                            <EditContactIcon width={"20%"} height={"20%"} id={item.id}/> <br/>
                            <strong>Email:</strong>  {item.attributes.email}<br/>
                            <strong>Phone number:</strong> {item.attributes.phone_number} <br/>
                        </div>
                        <div className='col-md-6'>
                            <a onClick={() => {fetchEdits(item.id); handleShow()}}><EditHistoryIcon  width={"20%"} height={"20%"}/></a>
                            <a onClick={() => handleDelete(item.id)} ><DeleteUserIcon width={"20%"} height={"20%"}/></a>
                        </div>
                    </Row>
                    <br/>
            </div>
        )
    })

    //renders the Edits in a Modal
    const history = edits.map(item => {
            return (
                <div key={item.id}>
                    <div>
                        <b>Date of edit:</b> {item.attributes.date} <br/>
                        <b>Previous name:</b> {item.attributes.previous_first_name + " " + item.attributes.previous_last_name}<br/>
                        <b>Previous email:</b> {item.attributes.previous_email} <br/>
                        <b>Previous phone number:</b> {item.attributes.previous_phone_number} <br/>
                    </div>
                    <br/>
                </div>
            )}
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
            <Container className='align-content-center'>
                <div className='col-md-12'>
                    {list}
                </div>
            </Container>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <h4>Edit history</h4>
                    </Modal.Header>
                    <ModalBody>
                        {history}
                    </ModalBody>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default  ContactList