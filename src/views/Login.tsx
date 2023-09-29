import { useState } from "react";
import { Container, Row, Col, FormGroup, Input, Button, FormText } from "reactstrap";
import { genericErrorAlertService, genericSuccessAlertService } from "../service/AlertService";
import { loginUser } from "../controllers/AuthController";
import { setCookieService } from "../service/CookieService";
import { COOKIE_NAME } from "../Contants";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [loginValues, setLoginValues] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser, setToken } = useUserContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginValues({
      ...loginValues, [name]: value
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    if (loginValues.email.trim() === "" || loginValues.password.trim() == "") {
      genericErrorAlertService("Completa todos los campos", "Es necesario completar toda la información para realizar el registro")
      return
    }

    setLoading(true);

    try {

      const response = await loginUser(loginValues.email, loginValues.password);

      setCookieService(COOKIE_NAME, JSON.stringify(response.data), 60 * 60 * 24)

      genericSuccessAlertService("Sesión iniciada", "Bienvenido " + response.data.user.firstName + " " + response.data.user.lastName)

      navigate('home');

      setToken(response.data.token);
      setUser(response.data.user);

    } catch (error) {

      genericErrorAlertService("Error al iniciar sesión", "Credenciales Invalidas");
      console.log(error + " ")

      setToken(null);
      setUser(null);

    } finally {

      setLoading(false)

    }

  }

  return (

    <Container className='p-3 text-white rounded' style={{
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      color: "#fff",
      marginTop: "50px",
    }}>
      <Row className="d-flex justify-content-center">

        <Col sm={12} lg={6} className="d-flex justify-content-center align-items-center">

          <Col md={12}>
            <Col md={12} className='text-center rounded p-1  '>
              <b><h2>INICIAR SESIÓN</h2></b>
              <hr />
            </Col>
            <form onSubmit={handleSubmit} className='p-3 text-white rounded' style={{
              backgroundColor: "rgba(255, 255, 255, 0.5)",
            }}>


              <FormGroup>
                <FormText>
                  <b style={{ color: "white" }}> Correo Electrónico</b>
                </FormText>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleInputChange}
                  value={loginValues.email}
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormText>
                  <b style={{ color: "white" }}>Contraseña</b>
                </FormText>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleInputChange}
                  value={loginValues.password}
                  required
                />
              </FormGroup>
              <hr />

              <Button className='col-12' color="success" type="submit" disabled={loading}><b>{loading ? "Iniciando sesión..." : "Iniciar Sesión"}</b></Button>
              <Button className='col-12 mt-1' color="primary" type="button" onClick={() => navigate('/register')} ><b>No tengo cuenta</b></Button>
              <hr />

            </form>
          </Col>
        </Col>
        <Col sm={12} lg={6} className='d-flex justify-content-center align-items-center'>
          <img className="tex-center img-fluid rounded mb-2" src="https://png.pngtree.com/png-clipart/20230825/original/pngtree-virtual-library-online-book-club-picture-image_8477314.png" alt="" />
        </Col>

      </Row>

    </Container>


  );

}

export default Login