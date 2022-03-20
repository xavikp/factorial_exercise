import React from "react";
import home_icon from "../../../assets/images/home_icon.svg";
import {Link} from "react-router-dom";

const ContactListIcon = ({height,width}) => {
    return (
        <Link to="/contacts">
            <img src={home_icon} width={width} height={height} alt={"Home Icon"}/>
        </Link>
    )
}

export default ContactListIcon