import React from "react";
import edit_user from "../../../assets/images/edit_icon.svg";
import {Link} from "react-router-dom";

const EditContactIcon = ({height,width,id}) => {
    return (
        <Link to={'/edit_contact/' + id} >
            <img src={edit_user} width={width} height={height} alt={"Edit contact icon"}/>
        </Link>
    )
}

export default EditContactIcon