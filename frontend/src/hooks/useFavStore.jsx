import useAuthContext from "./useAuthContext"

const useFavStore = async()=>{
    const {user} = useAuthContext()
    const addData = async(data)=>{
        try {
            const response = await fetch('http://localhost:4000/api/user/fav',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    Authorization: `Bearer ${user.token}`          
            },
                body:JSON.stringify({
                    command:'add',
                    data:data
                })
            })
    
            const json = await response.json()
    
            console.log(json)
        } catch (error) {
            console.log(error)
        }
    }
    const favS = async(id)=>{
        
        try {
           
    
            const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`)
            const json = await response.json()
    
            if (response.ok) {
               await addData(json)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return {favS}
   
}

export default useFavStore