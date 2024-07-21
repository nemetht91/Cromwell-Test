import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({
    user: {},
    isLogedIn: Boolean,
    getName: async () => {},
    logInUser: () => {},
    logOutUser: () => {},
});

export function UserProvider({children}){

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [isLogedIn, setIsLogedIn] = useState(JSON.parse(localStorage.getItem("isLogedIn")));

    useEffect(() => {
        localStorage.setItem("isLogedIn", JSON.stringify(false));
    },[])

   async function getName(){

    var name = "";

        try {
            const baseURL = process.env.REACT_APP_API_SERVER_URL;
            const response = await fetch(baseURL+"/user?"+ new URLSearchParams({
                email: user.email
            }),{
                method: 'GET',
                headers: {
                    Authorization: "Bearer " + user.token  
                }
            });
            if(response.status == 200){
                const userData = await response.json();
                name = userData.firstName + " " + userData.lastName;

            }
           return name;
        } catch (error) {
            return ""; 
        }
}
   

   function logInUser(email, token){
        const newUser = {
            email: email,
            token: token
        }
        setUser(newUser);
        setIsLogedIn(true);
        localStorage.setItem("user", JSON.stringify(newUser));
        localStorage.setItem("isLogedIn", JSON.stringify(true));

   }

   function logOutUser(){
        setUser({});
        setIsLogedIn(false);
        localStorage.setItem("user", JSON.stringify({}));
        localStorage.setItem("isLogedIn", JSON.stringify(false));
   }

   const contextValue ={
        user: user,
        isLogedIn: isLogedIn,
        getName,
        logInUser,
        logOutUser
   }

   return (
    <UserContext.Provider value={contextValue}>
        {children}
    </UserContext.Provider>
)

}

export default UserProvider;