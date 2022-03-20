import React from 'react'
import{BrowserRouter,Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./Home/Home";
import ContactList from "./ContactList/ContactList";
import ContactInfo from "./ContactInfo/ContactInfo";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/contacts" element={<ContactList/>}/>
                <Route exact path="/contact/:id" element={<ContactInfo/>}/>
            </Routes>

        </BrowserRouter>
    )
}

export default App