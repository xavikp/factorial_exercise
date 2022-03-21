import React from "react";
import delete_icon from "../../../assets/images/delete_icon.svg";

const DeleteUserIcon = ({height,width}) => {
    return (
        <img src={delete_icon} width={width} height={height} alt={"Delete user icon"}/>
    )
}

export default DeleteUserIcon