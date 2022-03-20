import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import add_user from "../../../assets/images/new_user_icon.svg";

import Header from "../Header/Header";
import ContactListIcon from "../ContactListIcon/ContactListIcon";
import NewUserIcon from "../NewUserIcon/NewUserIcon";

const Home = () => {
    var header = "HOME"

    return (
        <div>
            <Header text={header}/>
            <Container>
                <Row>
                    <Col>
                        <NewUserIcon width={"30%"} height={"30%"}/>
                        <p>Add new user</p>
                    </Col>
                    <Col>
                        <ContactListIcon width={"30%"} height={"30%"}/>
                        <p>See your contact list</p>
                    </Col>
                </Row>
            </Container>
        </div>

    )
}

export default Home