import { useState, useEffect } from "react";
import { Container, Row, Col, Alert} from "reactstrap";
import BookReport from "../components/book-manager/BookReport";
import { IBook } from "../interface";
import { genericErrorAlertService } from "../service/AlertService";
import { getUserBorrows } from "../controllers/BorrowBookController";

const BorrowBooks = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [bookList, setBookList] = useState<Array<IBook>>([]);

  useEffect(() => {

    loadBookList();

  }, [])

  const loadBookList = async () => {

    try {

      const response = await getUserBorrows();
      setBookList(response.data);

    } catch (error) {

      console.log(error)
      genericErrorAlertService("Error al cargar los libros disponibles", "Recargue la pagina")

    } finally {

      setLoading(false);

    }

  }

  return (
    <Container fluid className='p-3 text-white rounded' style={{
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      color: "#fff"
    }}>
      <Col md={12} className='text-center rounded p-1  '>
        <b><h2>MIS PRESTAMOS</h2></b>
        <hr/>
      </Col>

      <Row>
        <Col className='p-3' >
          {loading ? (<Alert className='text-center' style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}><b className='text-white'>CARGANDO LISTADO DE LIBROS...</b></Alert>)
            :
            (<div>{bookList.length === 0 ? (<Alert className='text-center' style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}><b className='text-white'>NO TIENE REGISTRO DE NINGUN PRESTAMO.</b></Alert>) : (<BookReport bookList={bookList} setBookList={setBookList} borrowView></BookReport>)}</div>)}
        </Col>
      </Row>

    </Container>
  )

}

export default BorrowBooks