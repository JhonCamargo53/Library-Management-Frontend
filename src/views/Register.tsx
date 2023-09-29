import React, { useState } from 'react'
import { Container, Row, Col, FormGroup, Label, Input, Button, CardHeader, CardBody, Card } from 'reactstrap'
import { registerUser } from '../controllers/AuthController';
import { IUser } from '../interface';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { setCookieService } from '../service/CookieService';
import { COOKIE_NAME } from '../Contants';
import { genericErrorAlertService, genericSuccessAlertService } from '../service/AlertService';
import { validateUserValuesService } from '../service/ValidationService';

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

    if (!validateUserValuesService(registerValues)) {
      genericErrorAlertService("Completa todos los campos", "Es necesario completar toda la información para realizar el registro")
      return
    }

    if ((registerValues.password as string).length < 8) {
      genericErrorAlertService("Error con la contraseña", "La contraseña debe tener al menos 8 caracteres")
      return
    }

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
    <Container className=''>
      <Row className="d-flex justify-content-center">
        <Col>
          <Card>
            <CardHeader className='text-center'>
              <b> <h2>Registro de Usuarios</h2></b>
            </CardHeader>

            <CardBody>
              <Row>
                <Col md="12">

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

                    <Button className='col-12' color="success" type="submit" disabled={loading}><b>{loading ? "Registrando Usuario..." : "Registrar Usuario"}</b></Button>
                    <Button className='col-12 mt-1' color="primary" type="button" ><b>No tengo cuenta</b></Button>

                  </form>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Register