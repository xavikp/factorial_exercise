import React from "react";
import edit_user from "../../../assets/images/edit_icon.svg";
import {Link} from "react-router-dom";

const NewUserIcon = ({height,width,id}) => {


    return (
        <Link to={'/edit_user/'+id}>
            <img src={edit_user} width={width} height={height} alt={"Edit user icon"}/>
        </Link>
    )
}

export default NewUserIcon