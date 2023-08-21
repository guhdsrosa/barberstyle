import axios from "axios";

const api = axios.create({
    baseURL: 'http://18.230.144.135:3000/',
})

export default api;