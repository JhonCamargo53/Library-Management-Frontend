import React, { useEffect, useState } from 'react'
import { genericErrorAlertService } from '../../service/AlertService';
import { IBook } from '../../interface';
import { Alert, Col, Container, Row } from 'reactstrap';
import { getBooks } from '../../controllers/BookController';
import BookCard from './cards/BookCard';

interface Props {
    bookList: Array<IBook>
    setBookList: (bookList: Array<IBook>) => void;
    handleDelete?: (id: string) => void;
    handleUpdate?: (book: IBook) => void;
}

const BookReport: React.FC<Props> = ({ bookList, setBookList, handleDelete,handleUpdate }) => {

    return (
        <Row>
            <Col>
                {bookList.length === 0 ? (<Alert color='warning'>No se encontro ningun libro registrado</Alert>) : (<Row>
                    {
                        bookList.map((book, index) =>
                            <Col lg={3} sm={6} key={index}>
                                <BookCard book={book} setBookList={setBookList} handleDelete={handleDelete}  handleUpdate={handleUpdate} adminView></BookCard>
                            </Col>
                        )
                    }
                </Row>)}
            </Col>
        </Row>
    )
}

export default BookReport