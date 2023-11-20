import axios from "axios"


const fetchAPi = async(url , id) =>{
    const response = await axios.get(url)
    return response.data
}


export default fetchAPi ;