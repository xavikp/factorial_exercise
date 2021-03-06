import React from 'react'
import{BrowserRouter,Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./Home/Home";
import ContactList from "./ContactList/ContactList";
import ContactInfo from "./ContactInfo/ContactInfo";
import NewContact from "./NewContact/NewContact";
import EditContact from "./EditContact/EditContact";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/contacts" element={<ContactList/>}/>
                <Route exact path="/contact/:id" element={<ContactInfo/>}/>
                <Route exact path="/new_contact" element={<NewContact/>}/>
                <Route exact path="/edit_contact/:id" element={<EditContact/>}/>
            </Routes>

        </BrowserRouter>
    )
}

export default App