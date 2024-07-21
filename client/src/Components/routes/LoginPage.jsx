import React from "react";
import InputBox from "../Form/Inputbox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import ErrorMessages from "../ErrorMessage";

function LogInPage(){

    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();
    const user = useContext(UserContext);

    function updateUser(inputName, newValue){
        setData((preValue) =>{
            return{
                ...preValue,
                [inputName]: newValue
            }
        })
    }

    function handleClick(event){
        const logIn = async () => {
            const baseURL = process.env.REACT_APP_API_SERVER_URL;
            try {
                const response = await fetch(baseURL+"/user/login?"+ new URLSearchParams({
                    email: data.email,
                    password: data.password
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
        logIn();
    }



    return <div className="login page">
        {errors.length > 0 && <ErrorMessages messages={errors}/>}
        <div className="card">
            <h2>Create Acount</h2>
            <form >
                <InputBox name="email" label="Email" type="text" updateField={updateUser} value={data.email}/>
                <InputBox name="password" label="Password" type="password" updateField={updateUser} value={data.password}/>
                <button onClick={handleClick} type="submit" className="btn">Sign In</button>
                <div class="divider">
                    <p >or</p>
                </div>
                <button onClick={() => navigate('/register')} className="btn">Create an Account</button>
              </form>
        </div>
    </div>
}

export default LogInPage;

