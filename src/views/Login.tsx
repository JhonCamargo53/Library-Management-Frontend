import { useState } from "react";
import { Container, Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
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

    setLoading(true);

    try {

      const response = await loginUser(loginValues.email, loginValues.password);

      setCookieService(COOKIE_NAME, JSON.stringify(response.data), 60 * 24)

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
    <Container>
      <Row className="justify-content-center">
        <Col md="6">
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="email">Correo Electrónico</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Ingrese su correo electrónico"
                onChange={handleInputChange}
                value={loginValues.email}
              />
            </FormGroup>

            <FormGroup>
              <Label for="password">Contraseña</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Ingrese su contraseña"
                onChange={handleInputChange}
                value={loginValues.password}
              />

            </FormGroup>
            <Button color="primary" type="submit" disabled={loading}>{loading ? "Iniciando Sesión..." : "Iniciar Sesión"}</Button>
          </form>
        </Col>
      </Row>
    </Container>
  );

}

export default Login