/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer } from "react";

export const FavContex = createContext()
const reducer = (state,action) =>{
    switch (action.type) {
        case 'ADD':
            return {
                fav:[action.payload,...state.fav]
            }
        case 'DELETE':
            return {
                fav: state.fav.filter((w)=>w._id !== action.payload.id)
            }
        default:
            break;
    }
}

const FavContexProvider = ({children}) => {

    const [state,dispatch] = useReducer(reducer,{
        fav:null
    })
  return (
    <FavContex.Provider value={{dispatch,...state}}>
        {children}
    </FavContex.Provider>
  )
}

export default FavContexProvider