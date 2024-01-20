import useAuthContext from './useAuthContext'

const useLogout = () => {
    const {dispatch} = useAuthContext()
    const logout = ()=>{
        dispatch({type:'LOGOUT'})
        localStorage.removeItem('user')

    }
  return {logout}
}

export default useLogout