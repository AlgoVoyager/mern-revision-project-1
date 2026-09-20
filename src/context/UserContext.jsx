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
            if(response.status===401){
                setUser(null);
                localStorage.removeItem("token");
                return false;
            }
            if(!response.ok){ 
                return null; 
            }
            const userData = (await response.json()).user;
            setUser(userData);
            return userData;
        } catch (error) {
            console.error(error);
            return null; 
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
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            )
            const data = await response.json();
            if(!response.ok) {
                setUser(null);
                console.log("login failed");
                return {
                    success: false,
                    message: data.message
                };
            }
            const token = data.token;
            localStorage.setItem('token',token);
            const result = await fetchUser(token);
            if (result === false) {
                return {
                    success: false,
                    message: "Authentication failed"
                };
            }

            if (result === null) {
                return {
                    success: false,
                    message: "Something went wrong"
                };
            }

            return { success: true };
        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: "Something went wrong"
            };
        }
    }
    const logout = async () =>{
        setUser(null)
        localStorage.removeItem('token')
        setLoading(false)
    }
    const userValue ={
        user,
        loading,
        login,
        logout
    };
    
    useEffect(()=>{
        async function initializeAuth() {
            const token = localStorage.getItem('token');
            if(token) await fetchUser(token);
            else setLoading(false);
        }
        initializeAuth();
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