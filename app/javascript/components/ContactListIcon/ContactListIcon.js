import React from "react";
import contacts from "../../../assets/images/contact_list_icon.svg";
import {Link} from "react-router-dom";

const ContactListIcon = ({height,width}) => {
    return (
        <Link to="/contacts">
            <img src={contacts} width={width} height={height} alt={"Contact List"}/>
        </Link>
    )
}

export default ContactListIcon