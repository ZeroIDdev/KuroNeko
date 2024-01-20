/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext()
const reducer = (state,action) =>{
    switch (action.type) {
        case 'LOGIN':
            return {
                user:action.payload
            }
        case 'LOGOUT':
            return {
                user:null
            }
        default:
            break;
    }
}

const AuthContextProvider = ({children}) => {

    const [state,dispatch] = useReducer(reducer,{
        user:null
    })
    useEffect(()=>{
      const user = localStorage.getItem('user')
      if(user)dispatch({type:'LOGIN',payload:JSON.parse(user)})
      console.log(user)
    },[])
  return (
    <AuthContext.Provider value={{dispatch,...state}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider