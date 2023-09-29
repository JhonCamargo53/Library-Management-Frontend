import { Col, Container, Row } from "reactstrap";
import { useUserContext } from "../context/UserContext";

const Home = () => {

    const { user } = useUserContext();


    return (
        <Container className="rounded text-center" style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "#fff",
            padding: "20px",
            flexDirection: "column", // Alinea los elementos verticalmente
            justifyContent: "center", // Centra verticalmente
            marginTop: "50px",
        }}>
            <Row>
                <Col className="col-12">

                    <h1 style={{
                        fontFamily: 'sans-serif',
                        fontSize: '3.5em',
                        fontWeight: 'bold',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                    }}>
                        <b>Bienvenido a Nuestra Biblioteca</b></h1>

                    {user && <h2>{user.firstName + " " + user.lastName}</h2>}
                </Col>

                <Col>
                    <p className="lead">
                        <b>
                            Explora nuestra colección de libros para todas las edades e intereses.

                        </b>


                    </p>
                    <hr className="my-4 rounded" />
                    <p>
                        <h2 style={{
                            fontFamily: 'sans-serif',
                            fontSize: '2.5em',
                            fontWeight: 'bold',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                        }}>
                            ¿Listo para sumergirte en el mundo de la lectura?
                            <br />
                            ¡Descubre nuevos mundos ahora!
                        </h2>
                    </p>
                </Col>
            </Row>

            <hr className="my-4" />

            <Row>
                <Col>
                    <Container>
                        <Row>

                            <Col sm={12} lg={6} className='d-flex justify-content-center align-items-center'>
                                <img className="tex-center img-fluid rounded mb-2" src="https://bibliotecasvirtualesmundotecnologico.weebly.com/uploads/5/8/8/1/58813631/1173726.png?399" alt="" />
                            </Col>

                            <Col className="d-flex justify-content-center align-items-center">
                                <Container>
                                    <hr />

                                    <Row >
                                        <h2>Categorías Populares</h2>
                                        <hr />
                                        <Col >

                                            <ul>
                                                <li>Novelas</li>
                                                <li>Ciencia Ficción</li>
                                                <li>Historia</li>
                                                <li>Infantil</li>
                                            </ul>
                                        </Col>
                                    </Row>
                                    <hr />

                                </Container>

                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
