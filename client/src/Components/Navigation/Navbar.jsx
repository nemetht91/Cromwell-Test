import React from "react";
import Logo from "./logo";
import NavButton from "./NavButton";
import { useNavigate } from "react-router-dom";

function Navbar(){


    const navigate = useNavigate();

    return <div className="navbar">
        <div className="container">
            <Logo navigate={() => {navigate('/')}}/>
            <div className="buttons">
                <NavButton navigate={() => {navigate('/login')}} name="Sign In"/>
            </div>
        </div>
    </div>
}

export default Navbar;