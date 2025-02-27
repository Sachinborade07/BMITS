import axios from 'axios'

export const login = async (credentials: { username: string; password: string }) => {
    const response = await axios.post('https://fakestoreapi.com/auth/login', credentials)
    return response.data
}