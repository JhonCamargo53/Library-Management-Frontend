import axiosInstance, { BASE_URL as mainRoute } from "../instances/axiosInstance";
import { IBook } from "../interface";

export const getBooks = async () => {

    return await axiosInstance.get(mainRoute + '/book/getBooks');
}

export const addBook = async (book: IBook) => {

    return await axiosInstance.post(mainRoute + '/book/addBook', { book });
}

export const updateBook = async (book: IBook) => {

    return await axiosInstance.put(mainRoute + '/book/updateBook', { book });
}

export const deleteBook = async (bookId: string) => {

    return await axiosInstance.delete(mainRoute + '/book/deleteBook/' + bookId);
}