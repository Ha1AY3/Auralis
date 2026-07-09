import React from 'react'
import { Link, useNavigate } from 'react-router'
import "../styles/login.scss"
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {loading, handleLogin} = useAuth();

    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();

        await handleLogin({email, password});

        navigate("/");

    }
  return (
    <main className='login-page'>
        <div className='form-container'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input value={email} onChange={(e) => {
                        setEmail(e.target.value);
                    }} type='email' id='email' name='email' placeholder='Enter your email'/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input value={password} onChange={(e) => {
                        setPassword(e.target.value);
                    }} type='password' name='password' id='password' placeholder='Enter your password'/>
                </div>
                <button className='button' type='submit'>Login</button>
            </form>
            <p>Don't have an account?<Link to="/register">Register here</Link></p>
        </div>
    </main>
  )
}

export default Login
