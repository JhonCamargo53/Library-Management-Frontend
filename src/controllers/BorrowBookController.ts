import axiosInstance, { BASE_URL as mainRoute } from "../instances/axiosInstance";

export const getUserBorrows = async () => {

    return await axiosInstance.get(mainRoute + '/borrowBook/getUserBorrows');
}

export const borrowBook = async (bookId:string) => {

    return await axiosInstance.post(mainRoute + '/borrowBook/borrowBook/121/'+bookId);
}

export const returnBook = async (bookId:string) => {

    return await axiosInstance.delete(mainRoute + '/borrowBook/returnBook/'+bookId);
}




