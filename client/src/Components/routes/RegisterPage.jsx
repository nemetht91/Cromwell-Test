import React from "react";
import InputBox from "../Form/Inputbox";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import ErrorMessages from "../ErrorMessage";


function RegisterPage(){

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "" 
    });


    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();
    const user = useContext(UserContext);

    function updateData(inputName, newValue){
        setData((preValue) =>{
            return{
                ...preValue,
                [inputName]: newValue
            }
        })
    }

    function isFieldsValid(){
        let isValid = true;
        let errorMessages = [];

        if(data.firstName == ""){
            isValid = false;
            errorMessages.push("First Name is required");
        }

        if(data.lastName == ""){
            isValid = false;
            errorMessages.push("Last Name is required");
        }

        if(!isEmailValid()){
            isValid = false;
            errorMessages.push("Invlaid Email");
        }

        if(!isPasswordValid()){
            isValid = false;
            errorMessages.push("Password must be at least 8 characther long");
        }

        if(data.password != data.confirmPassword){
            isValid = false;
            errorMessages.push("Password must match");
        }

        setErrors(errorMessages);
        return isValid;

    }

    function isEmailValid(){
        return data.email.includes('a') && data.email.includes('.');
    }

    function isPasswordValid(){
        return data.password.length >= 8;
    }

    function handleClick(event){
        const register = async () => {
            const baseURL = process.env.REACT_APP_API_SERVER_URL;
            try {
                const response = await fetch(baseURL+"/user/register?"+ new URLSearchParams({
                    email: data.email,
                    password: data.password,
                    firstName: data.firstName,
                    lastName: data.lastName
                }),{
                    method: 'POST',
    
                });
                if(response.status == 200){
                    const userData = await response.json();
                    user.logInUser(userData.email, userData.firstName, userData.lastName);
                    navigate('/landing')
                }
                else{
                    const error = await response.json();
                    setErrors([error.message]);
                }
            } catch (error) {
                setErrors(["Internal Error. Try again Later!"]);
                
            }
        }

        event.preventDefault();
        if(isFieldsValid()){
            register();
        }
        
    }


    return <div className="register page">
        {errors.length > 0 && <ErrorMessages messages={errors}/>}
        <div className="card">
            <h2>Create Acount</h2>
            <form>
                <InputBox name="firstName" label="Fisrt Name" type="text" updateField={updateData} value={data.firstName}/>
                <InputBox name="lastName" label="Last Name" type="text" updateField={updateData} value={data.lastName}/>
                <InputBox name="email" label="Email" type="text" updateField={updateData} value={data.email}/>
                <InputBox name="password" label="Password" type="password" updateField={updateData} value={data.password}/>
                <InputBox name="confirmPassword" label="Confirm Password" type="password" updateField={updateData} value={data.confirmPassword}/>
                <button onClick={handleClick} type="submit" className="btn">Register</button>
              </form>
        </div>
    </div>
}

export default RegisterPage;