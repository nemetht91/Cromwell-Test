import React from "react";
import InputBox from "../Form/Inputbox";
import { useState } from "react";

function RegisterPage(){

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "" 
    });

    function updateUser(inputName, newValue){
        setUser((preValue) =>{
            return{
                ...preValue,
                [inputName]: newValue
            }
        })
    }


    return <div className="register page">
        <div className="card">
            <h2>Create Acount</h2>
            <form action="/register" method="POST">
                <InputBox name="firstName" label="Fisrt Name" type="text" updateField={updateUser} value={user.firstName}/>
                <InputBox name="lastName" label="Last Name" type="text" updateField={updateUser} value={user.lastName}/>
                <InputBox name="email" label="Email" type="text" updateField={updateUser} value={user.email}/>
                <InputBox name="password" label="Password" type="password" updateField={updateUser} value={user.password}/>
                <InputBox name="confirmPassword" label="Confirm Password" type="password" updateField={updateUser} value={user.confirmPassword}/>
                <button type="submit" className="btn">Register</button>
              </form>
        </div>
    </div>
}

export default RegisterPage;