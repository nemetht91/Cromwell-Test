import React from "react";
import InputBox from "../Form/Inputbox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LogInPage(){

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    function updateUser(inputName, newValue){
        setUser((preValue) =>{
            return{
                ...preValue,
                [inputName]: newValue
            }
        })
    }

    return <div className="login page">
        <div className="card">
            <h2>Create Acount</h2>
            <form >
                <InputBox name="email" label="Email" type="text" updateField={updateUser} value={user.email}/>
                <InputBox name="password" label="Password" type="password" updateField={updateUser} value={user.password}/>
                <button type="submit" className="btn">Sign In</button>
                <div class="divider">
                    <p >or</p>
                </div>
                <button onClick={() => navigate('/register')} className="btn">Create an Account</button>
              </form>
        </div>
    </div>
}

export default LogInPage;

