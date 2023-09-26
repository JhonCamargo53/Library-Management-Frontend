import axiosInstance, { BASE_URL as mainRoute } from "../instances/axiosInstance";
import {IUser} from "../interface";

export const registerUser = async (user: IUser) => {

    return await axiosInstance.post(mainRoute + '/auth/registerUser', { user });
}

export const loginUser = async (email: string, password: string) => {

    return await axiosInstance.post(mainRoute + '/auth/loginUser', { email: email, password: password });
}

