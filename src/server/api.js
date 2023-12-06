import axios from "axios";

const api = axios.create({
    baseURL: 'http://18.228.117.142:3000/',
})

export default api;