import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost/ci_auth_project/public/api",
});

// Attach token automatically
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");

    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
});

export default API;