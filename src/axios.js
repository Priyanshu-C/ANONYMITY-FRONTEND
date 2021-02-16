import axios from 'axios';

const instance = axios.create({
    baseURL: "https://anonymity-backend.herokuapp.com",
});

export default instance;