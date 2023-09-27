import { useEffect, useState } from 'react'
import BookForm from './BookForm'
import { Alert, Col, Container, Row } from 'reactstrap'
import BookReport from './BookReport'
import { deleteBook, getBooks, updateBook } from '../../controllers/BookController'
import { IBook } from '../../interface'
import { genericErrorAlertService, genericSuccessAlertService } from '../../service/AlertService'
import Swal from 'sweetalert2'

const BookManager = () => {

  const [loading, setLoading] = useState<boolean>(true);
  const [bookList, setBookList] = useState<Array<IBook>>([]);

  useEffect(() => {

    loadBookList();

  }, [])

  const loadBookList = async () => {

    try {

      const response = await getBooks();
      setBookList(response.data);

    } catch (error) {

      console.log(error)
      genericErrorAlertService("Error al cargar listado de libros", "Recargue la pagina")

    } finally {

      setLoading(false);

    }

  }

  const handleDelete = async (id: string) => {

    try {

      Swal.fire({
        title: '¿Estas seguro de eliminar este libro?',
        text: "Una vez eliminado, no podra recuperarse.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'

      }).then(async (result) => {

        if (result.isConfirmed) {
          await deleteBook(id);
          setBookList(bookList.filter(book => book.id !== id))
          Swal.fire(
            'Acción realizada',
            'El libro fue eliminado...',
            'success'
          )
        }
      })

    } catch (error) {

      console.log(error);
      genericErrorAlertService("Error al eliminar el libro", "Intentelo nuevamente")

    }

  }

  const handleUpdate = async (book: IBook) => {

    try {

      await updateBook(book);

      const bookIndex = bookList.findIndex(currentBook => currentBook.id === book.id);

      const updatedBookList = [...bookList];
      updatedBookList[bookIndex] = book;

      setBookList(updatedBookList);

      genericSuccessAlertService("Acción realizada", "El libro fue actualizado correctamente")

    } catch (error) {

      console.log(error);
      genericErrorAlertService("Error al actualizar libro", "Intentelo Nuevamente")

    }

  }

  return (
    <Container fluid>
      <Row>
        <Col lg={12}>
          <BookForm bookList={bookList} setBookList={setBookList}></BookForm>
        </Col>
        <Col className='p-3' >
          {loading ? (<Alert color='warning' className='text-center'><b>Cargando listado de libros...</b></Alert>) :
            (<div>{bookList.length === 0 ? (<Alert color='warning' className='text-center'><b>No hay libros registrados</b></Alert>) : (<BookReport bookList={bookList} setBookList={setBookList} handleDelete={handleDelete} handleUpdate={handleUpdate} adminView></BookReport>)}</div>)}
        </Col>
      </Row>
    </Container>
  )
}

export default BookManager