/* eslint-disable no-unused-vars */
import { useState } from "react";
import { host } from "../utils";
import useAuthContext from "./useAuthContext";
const useLogin = () => {
    const {dispatch} = useAuthContext()
    const [error,setError] =useState(null)
    const [loading,setLoading] = useState(null)
  const login = async (email, password) => {
    setLoading(true)
    setError(null)
    const response = await fetch(host + "/login", {
      method: "POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const json = await response.json();
    if (!response.ok) {
        setError(json.error)
        setLoading(false)
    }
    if(response.ok){
        setError(null)
        setLoading(false)
        dispatch({type:'LOGIN',payload:json})
        localStorage.setItem('user',JSON.stringify(json))
    }

  };
  return {loading,error,login}
};

export default useLogin;
