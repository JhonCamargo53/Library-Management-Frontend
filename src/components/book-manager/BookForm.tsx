import { useState } from "react";
import { IBook } from "../../interface";
import { genericErrorAlertService, genericSuccessAlertService } from "../../service/AlertService";
import { Row, Col, FormGroup, Input, Button,FormText } from "reactstrap";
import { addBook } from "../../controllers/BookController";
import { validateBookValuesService } from "../../service/ValidationService";

interface Props {
  bookList: Array<IBook>;
  setBookList: (bookList: Array<IBook>) => void;
}

const BookForm: React.FC<Props> = ({ bookList, setBookList }) => {

  const defaultBookValues: IBook = {
    title: "",
    owner: "",
    description: "",
    releaseYear: "",
    imgUrl: ""
  }

  const [bookValues, setBookValues] = useState<IBook>(defaultBookValues);

  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookValues({
      ...bookValues, [name]: value
    });
  };



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    if (!validateBookValuesService(bookValues)) {
      genericErrorAlertService("Campos Incompletos", "Completa todos los campos");
      return;
    }

    setLoading(true);

    try {

      const response = await addBook(bookValues);
      genericSuccessAlertService("Información Guardada", "Libro guardado con exito")
      setBookValues(defaultBookValues);

      console.log(response);

      setBookList([...bookList, response.data])

    } catch (error) {

      genericErrorAlertService("Error al guardar información", "Intente nuevamente guardar el libro");
      console.log(error)


    } finally {

      setLoading(false)

    }

  }

  return (

    <Row>
      <Col>

        <form onSubmit={handleSubmit}>
          <Row>
            <Col lg={3} sm={6}>
              <FormGroup>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={bookValues.title}
                  onChange={handleInputChange}
                  required
                />
                <FormText>
                  <b style={{ color: "white" }}>Título (*)</b>
                </FormText>
              </FormGroup>
            </Col>

            <Col lg={3} sm={6}>
              <FormGroup>
                <Input
                  type="text"
                  id="owner"
                  name="owner"
                  value={bookValues.owner}
                  onChange={handleInputChange}
                  required
                />
                <FormText>
                  <b style={{ color: "white" }}>Propietario (*)</b>
                </FormText>
              </FormGroup>
            </Col>

            <Col lg={3} sm={6}>
              <FormGroup>
                <Input
                  type="text"
                  id="releaseYear"
                  name="releaseYear"
                  value={bookValues.releaseYear}
                  onChange={handleInputChange}
                  required
                />
                <FormText>
                  <b style={{ color: "white" }}> Año de Publicación (*)</b>
                </FormText>
              </FormGroup>
            </Col>

            <Col lg={3} sm={6}>
              <FormGroup>
                <Input
                  type="text"
                  id="imgUrl"
                  name="imgUrl"
                  value={bookValues.imgUrl}
                  onChange={handleInputChange}
                  required
                />
                <FormText>
                  <b style={{ color: "white" }}> URL de Imagen (*)</b>
                </FormText>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <FormGroup>
                <Input
                  type="textarea"
                  id="description"
                  name="description"
                  value={bookValues.description}
                  onChange={handleInputChange}
                  required
                />
                <FormText>
                  <b style={{ color: "white" }}>  Descripción (*)</b>
                </FormText>
              </FormGroup>
            </Col>
          </Row>

          <Button style={{ background: "#3085d6" }} className="col-12" type="submit" disabled={loading}>{loading ? "Agregando Libro..." : "Agregar libro"}</Button>
          <hr />
        </form>
      </Col>
    </Row>

  )
}

export default BookForm