import { IBook, IUser } from "../interface";

export const validateBookValuesService = (book: IBook): boolean => {

  if (
    book.title.trim() === "" ||
    book.owner.trim() === "" ||
    book.description.trim() === "" ||
    book.releaseYear.trim() === "" ||
    book.imgUrl.trim() === ""
  ) {
    return false;
  }

  return true;
}

export const validateUserValuesService = (user: IUser): boolean => {

  if (
    user.firstName.trim() === "" ||
    user.lastName.trim() === "" ||
    user.email.trim() === "" ||
    user.password?.trim() === ""
  ) {
    return false;
  }

  return true;
}