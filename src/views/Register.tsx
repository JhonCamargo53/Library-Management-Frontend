import React, { useState } from 'react'
import { Container, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap'
import { registerUser } from '../controllers/AuthController';
import { IUser } from '../interface';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { setCookieService } from '../service/CookieService';
import { COOKIE_NAME } from '../Contants';
import { genericErrorAlertService, genericSuccessAlertService } from '../service/AlertService';

const Register = () => {

  const [registerValues, setRegisterValues] = useState<IUser>({ firstName: '', lastName: '', email: '', password: '' })
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser, setToken } = useUserContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterValues({
      ...registerValues, [name]: value
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    setLoading(true);

    try {
      
      const response = await registerUser(registerValues);

      setCookieService(COOKIE_NAME, JSON.stringify(response.data), 60 * 24)

      genericSuccessAlertService("Registro exitoso", "Bienvenido " + response.data.user.firstName + " " + response.data.user.lastName)
      navigate('home');

      setToken(response.data.token);
      setUser(response.data.user);

    } catch (error) {

      genericErrorAlertService("Error al registrarse", "Intentelo nuevamente");
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
          <h2>Registro</h2>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="firstName">Nombre</Label>
              <Input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Ingrese su nombre"
                onChange={handleInputChange}
                value={registerValues.firstName}
                required
              />

            </FormGroup>
            <FormGroup>
              <Label for="lastName">Apellido</Label>
              <Input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Ingrese su apellido"
                onChange={handleInputChange}
                value={registerValues.lastName}
                required

              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Correo Electrónico</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Ingrese su correo electrónico"
                onChange={handleInputChange}
                value={registerValues.email}
                required

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
                value={registerValues.password}
                required

              />

            </FormGroup>
           
            <Button color="primary" type="submit" disabled={loading}>{loading ? "Registrando Usuario..." : "Registrar Usuario"}</Button>

          </form>
        </Col>
      </Row>
    </Container>
  )
}

export default Register