import React from "react";
import Logo from "./logo";
import NavButton from "./NavButton";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { useState, useEffect } from "react";


function Navbar(){

    const navigate = useNavigate();
    const user = useContext(UserContext);
    const [name, setName] = useState("");


    useEffect(() => {
        const fetchName = async () => {
            const newName = await user.getName()
            setName(newName);
        }
        if(user.isLogedIn){
            fetchName();
        }
    }, [user.isLogedIn])

    function logOut(){
        user.logOutUser();
        navigate('/');
    }

 

    return <div className="navbar">
        <div className="container">
            <Logo navigate={() => {navigate('/')}}/>
            <div className="buttons">
                {user.isLogedIn && <NavButton navigate={() => {navigate('/landing')}} name={name}/>}
                {user.isLogedIn?
                <NavButton navigate={logOut} name="Log Out"/>:
                <NavButton navigate={() => {navigate('/login')}} name="Sign In"/>}                
            </div>
        </div>
    </div>
}

export default Navbar;