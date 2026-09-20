import React, { useEffect, useState } from 'react'
import { useUserContext } from '../context/UserContext'
import {  Navigate, useNavigate } from 'react-router-dom';
const defaultForm = {
    email:"",
    password:""
}

const Login = () => {
    const navigate = useNavigate()
    const {user, loading, login} = useUserContext();
    const [loginLoading, setLoginLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loginForm, setLoginForm] = useState(defaultForm)
    const handleChange = (event) => {
        const { name, value } = event.target; 
        
        setLoginForm((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleSubmit = async (event) =>{
        event.preventDefault();
        const result = await login(loginForm.email, loginForm.password);
        if(result.success){
             return <Navigate to="/" replace />
        }else{
            setErrorMessage(result.message);
        }
    }
    useEffect(()=>{
        if (!errorMessage) return;
        const timeout = setTimeout(() => {
            setErrorMessage(null)
        }, 5000);
        return ()=> clearTimeout(timeout)
    },[errorMessage])
    if (user) return <Navigate to="/" replace />;
    return (
    <main className='w-full flex justify-center items-center'>
        <form onSubmit={handleSubmit} className='p-5 rounded-xl border flex flex-col gap-2 '>
            <h3>Login</h3>
            <div>
                <input type="email" name='email' placeholder='Enter Email' value={loginForm.email} onChange={handleChange} required/>
            </div>
            <div>
                <input type="password" name='password' placeholder='Enter Password' value={loginForm.password} onChange={handleChange} required/>
            </div>
            <button  className={`btn ${loginLoading&&'btn-disabled'}`}  disabled={loginLoading}>{loginLoading?"...":"Login"}</button>
            <div>{errorMessage&&errorMessage}</div>
        </form>
    </main>
  )
}

export default Login