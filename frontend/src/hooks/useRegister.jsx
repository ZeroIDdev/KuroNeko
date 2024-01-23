/* eslint-disable no-unused-vars */
import { useState } from "react";
import { host } from "../utils";
import useAuthContext from "./useAuthContext";
const useRegister = () => {
    const {dispatch} = useAuthContext()
    const [error,setError] =useState(null)
    const [loading,setLoading] = useState(null)
  const register = async (email, password) => {
    setLoading(true)
    setError(null)
    const response = await fetch(host + "/register", {
      method: "POST",
      headers:{'Content-Type':'application/json'},
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
    }

  };
  return {loading,error,register}
};

export default useRegister;
