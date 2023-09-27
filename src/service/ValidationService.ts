import { IBook } from "../interface";

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