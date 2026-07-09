import React from 'react'
import { Link, useNavigate } from 'react-router'
import "../styles/register.scss"
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {loading, handleRegister} = useAuth();

    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();

        await handleRegister({username, email, password});

        navigate("/");
    }
  return (
    <main className='register-page'>
        <div className='form-container'>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='username'>Username</label>
                    <input value={username} onChange={(e) => {
                        setUsername(e.target.value);
                    }} type='text' id='username' name='username' placeholder='Enter your username'/>
                </div>
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
                <button className='button' type='submit'>Register</button>
            </form>
            <p>Already have an account?<Link to="/login">Login here</Link></p>
        </div>
    </main>
  )
}

export default Register
