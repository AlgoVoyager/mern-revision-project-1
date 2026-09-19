import React, { useEffect } from 'react'
import { useUserContext } from '../context/UserContext'
import { Navigate } from 'react-router-dom';
const defaultForm = {
    email:"",
    password:""
}

const Login = () => {
    const {user, loading, login} = useUserContext();
    const [errorMessage, setErrorMessage] = useState(null);
    if(user) Navigate('/');
    const [loginForm, setLoginForm] = useState(defaultForm)
    const handleChange = (event) => {
        const { name, value } = event.target; 
        
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleSubmit = async (event) =>{
        event.preventDefault();
        const result = await login(email, password);
        if(result.success){
            Navigate('/');
        }else{
            setErrorMessage(result.message);
        }
    }
    useEffect(()=>{
        const timeout = setTimeout(() => {
            setErrorMessage(null)
        }, 5000);
        return ()=> clearTimeout(timeout)
    },errorMessage)
  return (
    <main className='w-full flex justify-center items-center'>
        <form onSubmit={handleSubmit} className='p-5 rounded-xl border flex flex-col gap-2 '>
            <h3>Login</h3>
            <div>
                <input type="email" name='email' placeholder='Enter Email' value={loginForm.email} onClick={handleChange} required/>
            </div>
            <div>
                <input type="password" name='password' placeholder='Enter Password' value={loginForm.password} onClick={handleChange} required/>
            </div>
            <button  className={`btn ${loading&&'btn-disabled'}`}  disabled={loading}>{loading?"...":"Login"}</button>
            <div>{errorMessage&&errorMessage}</div>
        </form>
    </main>
  )
}

export default Login