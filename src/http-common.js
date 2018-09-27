import axios from 'axios';

export const http = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL
});

http.interceptors.request.use(function (config) {
    document.getElementById('overlay').classList.add("overlay-active");
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
http.interceptors.response.use(function (response) {
    document.getElementById('overlay').classList.remove("overlay-active");
    return response;
}, function (error) {
    return Promise.reject(error);
});