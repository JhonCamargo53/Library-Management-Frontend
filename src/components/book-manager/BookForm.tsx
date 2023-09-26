import { useState } from "react";
import { IBook } from "../../interface";
import { genericErrorAlertService, genericSuccessAlertService } from "../../service/AlertService";
import { Container, Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
import { addBook } from "../../controllers/BookController";

const BookForm = () => {

  const defaultBookValues:IBook = {
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

    setLoading(true);

    try {

      await addBook(bookValues);
      genericSuccessAlertService("Información Guardada", "Libro guardado con exito")
      setBookValues(defaultBookValues);

    } catch (error) {

      genericErrorAlertService("Error al guardar información", "Intente nuevamente guardar el libro");
      console.log(error )


    } finally {

      setLoading(false)

    }

  }

  return (
    <Container>
      <Row>
        <Col>
          <h2>Formulario de Libro</h2>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="title">Título</Label>
              <Input
                type="text"
                id="title"
                name="title"
                value={bookValues.title}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="owner">Propietario</Label>
              <Input
                type="text"
                id="owner"
                name="owner"
                value={bookValues.owner}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Descripción</Label>
              <Input
                type="textarea"
                id="description"
                name="description"
                value={bookValues.description}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="releaseYear">Año de Publicación</Label>
              <Input
                type="text"
                id="releaseYear"
                name="releaseYear"
                value={bookValues.releaseYear}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="imgUrl">URL de Imagen</Label>
              <Input
                type="text"
                id="imgUrl"
                name="imgUrl"
                value={bookValues.imgUrl}
                onChange={handleInputChange}
              />
            </FormGroup>
            <Button color="primary" type="submit" disabled={loading}>{loading ? "Agregando Libro..." : "Agregar libro"}</Button>
          </form>
        </Col>
      </Row>
    </Container>
  )
}

export default BookForm