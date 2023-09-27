import  { useEffect, useState } from 'react'
import { getAvailableBooks } from '../controllers/BookController';
import { IBook } from '../interface';
import { genericErrorAlertService } from '../service/AlertService';
import { Container, Row, Col, Alert } from 'reactstrap';
import BookReport from '../components/book-manager/BookReport';

const AvailableBooks = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [bookList, setBookList] = useState<Array<IBook>>([]);

    useEffect(() => {

        loadBookList();

    }, [])

    const loadBookList = async () => {

        try {

            const response = await getAvailableBooks();
            setBookList(response.data);

        } catch (error) {

            console.log(error)
            genericErrorAlertService("Error al cargar los libros disponibles", "Recargue la pagina")

        } finally {

            setLoading(false);

        }

    }

    return (
        <Container fluid>
            <Row>
                <Col className='p-3' >
                    {loading ? (<Alert color='warning' className='text-center'><b>Cargando listado de libros...</b></Alert>)
                        :
                        (<div>{bookList.length === 0 ? (<Alert color='warning' className='text-center'><b>No hay ningun libro disponible</b></Alert>) : (<BookReport bookList={bookList} setBookList={setBookList}></BookReport>)}</div>)}
                </Col>
            </Row>
        </Container>
    )
}

export default AvailableBooks