export const isFavoriteBookService = (bookId: string) => {

    const favoriteBooks: string[] = getFavoriteBooksService();
    return favoriteBooks.includes(bookId);
}

export const addBookToFavoritesService = (bookId: string) => {

    const favoriteBooks: string[] = getFavoriteBooksService();

    if (!favoriteBooks.includes(bookId)) {
        favoriteBooks.push(bookId);

        localStorage.setItem('favoriteBooks', JSON.stringify(favoriteBooks));

    }
}

export const removeBookFromFavoritesService = (bookId: string) => {

    const favoriteBooks: string[] = getFavoriteBooksService();

    const index = favoriteBooks.indexOf(bookId);

    favoriteBooks.splice(index, 1);

    localStorage.setItem('favoriteBooks', JSON.stringify(favoriteBooks));
}

export const getFavoriteBooksService = (): string[] => {
    return JSON.parse(localStorage.getItem('favoriteBooks') as string) || [];
}

