import axios from "axios";
import { COOKIE_NAME } from "../Contants";
import { getCookieValueService } from "../service/CookieService";

export const BASE_URL = import.meta.env.VITE_URL_BACKEND || "http://localhost:3000";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/',
});

export const setAuthorizationHeader = (token: string | null) => {
    if (token) {
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common["Authorization"];
    }
};

const cookie = getCookieValueService(COOKIE_NAME);

if (cookie) {
    const token = cookie.token;
    setAuthorizationHeader(token);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

axiosInstance.interceptors.request.use(
    (config) => {

        const cookie = getCookieValueService(COOKIE_NAME);

        if (cookie) {
            const token = cookie.token;
            setAuthorizationHeader(token);
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
