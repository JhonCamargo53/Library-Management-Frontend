import { Card, CardBody, CardTitle, CardHeader, Badge, Col, Row, CardFooter, Button, Input} from "reactstrap"
import { IBook } from "../../../interface";
import { useState } from "react";
import { validateBookValuesService } from "../../../service/ValidationService";
import { genericErrorAlertService } from "../../../service/AlertService";
import Swal from "sweetalert2";

interface Props {
  book: IBook;
  adminView?: boolean
  handleDelete?: (id: string) => void;
  setBookList: (bookList: Array<IBook>) => void;
  handleUpdate?: (book: IBook) => void;
}

const BookCard: React.FC<Props> = ({ book, adminView = false, handleDelete = (id: string) => { return id }, handleUpdate = (book: IBook) => { return book } }) => {

  const [editMode, setEditMode] = useState(false);

  const [updatedBook, setUpdatedBook] = useState<IBook>(book);

  const handleUpdateCard = async () => {


    Swal.fire({
      title: '¿Estas seguro de realizar la modificación?',
      text: "Una vez modificado, se perdera la información anterior",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Modificar',
      cancelButtonText: 'Cancelar'

    }).then(async (result) => {

      if (result.isConfirmed) {

        if (!validateBookValuesService(updatedBook)) {
          genericErrorAlertService("Campos Incompletos", "Completa todos los campos para realizar la edición.");
          return;
        }

        try {

          handleUpdate(updatedBook);
          setEditMode(!editMode);

        } catch (error) {
          console.log(error);

        }
      }
    })

  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedBook({
      ...updatedBook, [name]: value
    });
  };


  const handleEdit = () => {

    setEditMode(!editMode);
    setUpdatedBook(book);

  }

  return (
    <Card className="justify-content-center my-1 "
      style={{
        maxHeight: '40rem',
        minHeight: '40rem'
      }}
    >
      <CardHeader className="text-center" style={{ background: "rgb(32,178,170)" }}>
        {editMode ? (<Input
          type="text"
          id="title"
          name="title"
          placeholder="Titulo"
          value={updatedBook.title}
          onChange={handleInputChange}
          required
        />) : (<b>{book.title}</b>)}
      </CardHeader>

      <CardBody className="text-center" style={{ background: "rgb(245,245,245)" }} >
        <Row >
          <Col >

            <Row>
              <Col>
                <Badge pill color={book.availability ? "success" : "danger"} className="my-2">
                  {book.availability ? "Disponible" : "No disponible"}
                </Badge>
              </Col>
            </Row>

            <Row>
              <Col>

                {editMode ? (<Input
                  type="text"
                  id="releaseYear"
                  name="releaseYear"
                  placeholder="Año"
                  value={updatedBook.releaseYear}
                  onChange={handleInputChange}
                  className="mb-1"
                  required
                />) : (<b>{book.releaseYear}</b>)}

              </Col>
            </Row>

            <Row>
              <Col>

                <CardTitle tag="h5">

                  {editMode ? (<Input
                    type="text"
                    id="owner"
                    name="owner"
                    placeholder="Autor"
                    value={updatedBook.owner}
                    onChange={handleInputChange}
                    required
                  />) : (<b>{book.owner}</b>)}
                </CardTitle>

              </Col>
            </Row>

            <Row>
              <Col>

                {editMode ? (<div>
                  <img
                  alt="Card"
                  src={updatedBook.imgUrl}
                  className="tex-center img-fluid rounded mb-2"
                  style={{
                    maxHeight: '15rem',
                    minHeight: '15rem'

                  }}
                />
                  <Input
                    type="text"
                    id="imgUrl"
                    name="imgUrl"
                    placeholder="URL de Imagen"
                    value={updatedBook.imgUrl}
                    onChange={handleInputChange}
                    className="mb-1"
                    required
                  />
                </div>) : (<img
                  alt="Card"
                  src={book.imgUrl}
                  className="tex-center img-fluid rounded"
                  style={{
                    maxHeight: '20rem',
                    minHeight: '20rem'

                  }}
                />)}


              </Col>
            </Row>

            <Row>
              <Col>

                <CardTitle >
                  {editMode ? (<Input
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Descripción"
                    value={updatedBook.description}
                    onChange={handleInputChange}
                    required
                  />) : (<b>{book.description}</b>)}

                </CardTitle>

              </Col>
            </Row>

            <Row >
              <Col>

                {(book.availability && !adminView) ? (
                  <Button color="success" className="col-12">

                    <b>PRESTAR LIBRO</b>

                  </Button>) :
                  (null)}



                {(adminView && book.availability) ? (
                  <div>

                    {!editMode ? (<Button color="danger" className="col-12" onClick={() => handleDelete(book.id as string)}>

                      <b>ELIMINAR</b>

                    </Button>) : (<Button color="success" className="col-12" onClick={() => handleUpdateCard()}>

                      <b>GUARDAR EDICIÓN</b>

                    </Button>)}

                    <Button color="warning" className="col-12 mt-1" onClick={() => handleEdit()}>

                      <b>{editMode ? ("CANCELAR EDICIÓN") : ("EDITAR")}</b>

                    </Button>

                  </div>) :
                  (<Button color="info" className="col-12"><b>LIBRO ACTUALMENTE EN USO</b></Button>)}

              </Col>
            </Row>
          </Col>
        </Row>


      </CardBody>

      <CardFooter style={{ background: "rgb(32,178,170)" }}>

      </CardFooter>

    </Card>
  )

}

export default BookCard
