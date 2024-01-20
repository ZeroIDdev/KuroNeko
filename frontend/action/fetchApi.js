const fetchApi = async (url,opt)=>{
    try {
        const response = await fetch(url,opt)
        const json = await response.json()
        if (!response.ok) {
            throw Error(json)
        }
        return json
    } catch (error) {
        throw Error(error)
    }
}

export default fetchApi