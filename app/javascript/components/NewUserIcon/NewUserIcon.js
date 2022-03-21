import React from "react";
import new_user from "../../../assets/images/new_user_icon.svg";
import {Link} from "react-router-dom";

const NewUserIcon = ({height,width}) => {
    return (
        <Link to="/new_contact">
            <img src={new_user} width={width} height={height} alt={"New user icon"}/>
        </Link>
    )
}

export default NewUserIcon