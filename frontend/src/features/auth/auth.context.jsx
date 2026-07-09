import { useState } from "react";
import { getMe, login, logout, register } from "./services/auth.api";

import { createContext } from "react";
import { useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function handleRegister({username, email, password}){
        setLoading(true);

        try{
            const data = await register({username, email, password});
            setUser(data.registerUser);
            return data;
        }catch(err){
            throw err;
        }finally{
            setLoading(false);
        }
    }

    async function handleLogin({username, email, password}){
        setLoading(true);

        try{
            const data = await login({username, email, password});
            setUser(data.user);
            return data;
        }catch(err){
            throw err;
        }finally{
            setLoading(false);
        }
    }

    async function handleGetMe(){
        setLoading(true);

        try{
            const data = await getMe();
            setUser(data.user);
            return data;
        }catch(err){
            throw err;
        }finally{
            setLoading(false);
        }
    }

    async function handleLogout(){
        setLoading(true);

        try{
            const data = await logout();
            setUser(null);
            return data;
        }catch(err){
            throw err;
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        handleGetMe();
    },[]);

    return(
        <AuthContext.Provider value={{user, loading, handleRegister, handleLogin, handleGetMe, handleLogout}}>
            {children}
        </AuthContext.Provider>
    )
}