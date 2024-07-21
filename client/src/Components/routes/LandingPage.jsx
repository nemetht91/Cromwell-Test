import React from "react";
import { UserContext } from "../UserContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function LandingPage(){

    const user = useContext(UserContext);
    const navigate = useNavigate();
    const [name, setName] = useState("");

    useEffect(() => {
        if(!user.isLogedIn){
            navigate('/');
        }else{
            const fetchName = async () => {
                const newName = await user.getName()
                setName(newName);
            }
            fetchName();
        }
    }, [])



    return <div className="landing page">
        <h1>Welcome!</h1>
        <h2>{name}</h2>
    </div>
}

export default LandingPage;