import React from 'react'
import { IBook } from '../../interface';
import { Col, Row } from 'reactstrap';
import BookCard from './cards/BookCard';

interface Props {
    bookList: Array<IBook>;
    setBookList: (bookList: Array<IBook>) => void;
    handleDelete?: (id: string) => void;
    handleUpdate?: (book: IBook) => void;
    adminView?: boolean;
    borrowView?: boolean;
}

const BookReport: React.FC<Props> = ({ bookList, setBookList, handleDelete, handleUpdate, adminView = false, borrowView = false }) => {

    return (
        <Row>
            {
                bookList.map((book, index) =>
                    <Col lg={3} sm={6} key={index}>
                        <BookCard book={book} bookList={bookList} setBookList={setBookList} handleDelete={handleDelete} handleUpdate={handleUpdate} adminView={adminView} borrowView={borrowView}></BookCard>
                    </Col>
                )
            }
        </Row>
    )
}

export default BookReport