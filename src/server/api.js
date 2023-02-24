import axios from "axios";

const api = axios.create({
    baseURL: 'http://54.94.191.4:3000/',
})

export default api;