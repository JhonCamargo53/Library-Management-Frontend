import { Button, Col, Container, Row } from "reactstrap"
import { useUserContext } from "../context/UserContext"

const Home = () => {

    const a = useUserContext();

    return (
        <div>

            <Container>
                <h1 className="display-4">Bienvenido a Nuestra Librería</h1>
                <p className="lead">
                    Descubre una amplia variedad de libros para todas las edades e intereses.
                </p>
                <hr className="my-4" />
                <p>
                    ¿Listo para sumergirte en el mundo de la lectura? ¡Explora nuestros libros ahora!
                </p>
                <p className="lead">
                    <Button color="primary">Explorar Libros</Button>
                </p>
            </Container>


            <Container>
                <Row>
                    <Col>
                        <h2>Nuestros Destacados</h2>
                        {/* Aquí podrías mostrar algunos libros destacados */}
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h2>Categorías Populares</h2>
                        {/* Aquí podrías mostrar algunas categorías populares */}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home