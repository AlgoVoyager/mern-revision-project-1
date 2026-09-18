import { createContext, useContext, useEffect, useState } from "react";
export const UserContext = createContext();
export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    async function fetchUser(token) {
        try {
            const response = await fetch('http://127.0.0.1:3000/api/user/',{
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            })
            if(!response.ok) throw new Error("Authentiction failed")
            const userData = await response.json();
            setUser(userData.user);
        } catch (error) {
            console.error(error)
            setUser(null);
            localStorage.removeItem("token");
        } finally {
            setLoading(false);
        }
    }
    const login = async (email, password)=>{
        try {
            const response = await fetch(
                'http://127.0.0.1:3000/api/user/login',
                {
                    method: 'POST',
                    headers : {
                        'Content-Type': 'application/json'
                    },
                    body: {
                        email,
                        password
                    }
                }
            )
            if(!response.ok) {

            }
            const data = await response.json();
            const token = data.user.token;
            localStorage.setItem('token',token);
            fetchUser(token);
        } catch (error) {
            console.log(error)
        }
    }
    const userValue ={
        user,
        loading,
        login
    };
    
    useEffect(()=>{
        const token = localStorage.getItem('token');
        console.log(token);
        if(token) fetchUser(token);
        else setLoading(false);
    },[])

    
    return(
        <UserContext.Provider value={userValue} >
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider;

export const useUserContext = () =>{
    const context = useContext(UserContext);
    if(!context) throw new Error("useUserContext must be within UserProvider");
    return context;
}