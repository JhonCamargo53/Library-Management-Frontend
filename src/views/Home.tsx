import { Col, Container, Row } from "reactstrap";

const Home = () => {


    return (
        <div>
            {/* Sección de bienvenida */}
            <Container fluid className="rounded text-center" style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "#fff",
                padding: "20px",
                height: "90vh", // Ajusta la altura al 100% del viewport
                display: "flex", // Usa flexbox para centrar el contenido verticalmente
                flexDirection: "column", // Alinea los elementos verticalmente
                justifyContent: "center", // Centra verticalmente
            }}>
                <Row>
                    <Col className="col-12">

                        <h1 className="display-4"><b>Bienvenido a Nuestra Biblioteca</b></h1>
                    </Col>

                    <Col>
                        <p className="lead">
                            <b>
                                Explora nuestra colección de libros para todas las edades e intereses.

                            </b>


                        </p>
                        <hr className="my-4" />
                        <p>
                            ¿Listo para sumergirte en el mundo de la lectura? ¡Descubre nuevos mundos ahora!
                        </p></Col>
                </Row>

                <hr className="my-4" />

                <Row>
                    <Col>
                        <Container>
                            <Row>
                                <Col>
                                    <h2>Nuestros Libros Destacados</h2>
                                    {/* Aquí puedes mostrar algunos libros destacados */}
                                    <ul>
                                        <li>Libro 1</li>
                                        <li>Libro 2</li>
                                        <li>Libro 3</li>
                                    </ul>
                                </Col>
                                <Col>
                                    <Container>
                                        <Row>
                                            <Col>
                                                <h2>Categorías Populares</h2>
                                                {/* Aquí puedes mostrar algunas categorías populares */}
                                                <ul>
                                                    <li>Novelas</li>
                                                    <li>Ciencia Ficción</li>
                                                    <li>Historia</li>
                                                    <li>Infantil</li>
                                                </ul>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>



        </div>
    );
};

export default Home;
