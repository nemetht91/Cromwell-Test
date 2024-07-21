import React from "react";
import { UserContext } from "../UserContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage(){

    const user = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!user.isLogedIn){
            navigate('/');
        }
    }, [])

    return <div className="landing page">
        <h1>This is the Landing page</h1>
        <h2>{user.getName()}</h2>
        <h2>{user.user.email}</h2>
    </div>
}

export default LandingPage;