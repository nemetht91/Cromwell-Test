import React from "react";
import InputBox from "../Form/Inputbox";

function RegisterPage(){

    return <div className="register page">
        <div className="card">
            <h2>Create Acount</h2>
            <form action="/register" method="POST">
                <InputBox name="firstName" label="Fisrt Name"/>
                <InputBox name="lastName" label="Last Name"/>
                <InputBox name="email" label="Email"/>
                <InputBox name="password" label="Password"/>
                <InputBox name="confirmPassword" label="Confirm Password"/>
                <button type="submit" className="btn">Register</button>
              </form>
        </div>
    </div>
}

export default RegisterPage;