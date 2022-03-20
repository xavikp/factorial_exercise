import ReactDOM from "react-dom";
import App from "../App";
import React, {useEffect, useState} from "react";
import axios from 'axios'
import Header from "../Header/Header";

const ContactList = () => {
    const [contacts, setContacts] = useState([])
    var header = "CONTACT LIST";

    useEffect(() => {
        axios.get('api/v1/contact_list.json')
            .then( resp => {
                setContacts(resp.data.data)
            })
            .catch(resp => console.log(resp))
        }, [contacts.length])

    const list = contacts.map(item => {
        return (
            <div key={item.attributes.email}>
                <p>
                    <b>{item.attributes.first_name + " " + item.attributes.last_name}</b> <br/>
                    {item.attributes.email} <br/>
                    {item.attributes.phone_number}
                </p>
            </div>
        )
    })

    return (
        <div>
            <Header text={header}/>
            <div>
                {list}
            </div>
        </div>
    )
}

export default  ContactList