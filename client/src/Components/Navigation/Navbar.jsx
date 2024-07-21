import React from "react";
import Logo from "./logo";
import NavButton from "./NavButton";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";

function Navbar(){

    const navigate = useNavigate();
    const user = useContext(UserContext);

    function logOut(){
        user.logOutUser();
        navigate('/');
    }

    return <div className="navbar">
        <div className="container">
            <Logo navigate={() => {navigate('/')}}/>
            <div className="buttons">
                {user.isLogedIn && <NavButton navigate={() => {navigate('/landing')}} name={user.getName()}/>}
                {user.isLogedIn?
                <NavButton navigate={logOut} name="Log Out"/>:
                <NavButton navigate={() => {navigate('/login')}} name="Sign In"/>}                
            </div>
        </div>
    </div>
}

export default Navbar;