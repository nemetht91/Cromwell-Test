import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({
    user: {},
    isLogedIn: Boolean,
    getName: () => {},
    logInUser: () => {},
    logOutUser: () => {},
});

export function UserProvider({children}){

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [isLogedIn, setIsLogedIn] = useState(JSON.parse(localStorage.getItem("isLogedIn")));

    useEffect(() => {
        localStorage.setItem("isLogedIn", JSON.stringify(false));
    },[])

   function getName(){
        if(user["firstName"] == undefined || user["lastName"] == undefined){
            return null;
        }
        return user["firstName"] + " " + user["lastName"];
   }

   function logInUser(email, firstName, lastName){
        const newUser = {
            email: email,
            firstName: firstName,
            lastName: lastName
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