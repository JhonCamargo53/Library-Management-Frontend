import React, { useState } from 'react'
import { Container, Row, Col, FormGroup, Input, Button, FormText } from 'reactstrap'
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
    <Container className='p-3 text-white rounded' style={{
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      color: "#fff"
    }}>
      <Row>

        <Col sm={12} lg={6}>
          <Col md={12} className='text-center rounded p-1 '>
            <b><h2>REGISTRAR USUARIO</h2></b>
            <hr />
          </Col>
          <Col md={12}>

            <form onSubmit={handleSubmit} className='p-3 text-white rounded' style={{
              backgroundColor: "rgba(255, 255, 255, 0.5)",
            }}>

              <FormGroup >
              <FormText>
                  <b style={{ color: "white" }}> Nombre de usuario</b>
                </FormText>
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"

                  onChange={handleInputChange}
                  value={registerValues.firstName}
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormText>
                  <b style={{ color: "white" }}>  Apellido de usuario</b>
                </FormText>
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  onChange={handleInputChange}
                  value={registerValues.lastName}
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormText>
                  <b style={{ color: "white" }}> Correo Electrónico</b>
                </FormText>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleInputChange}
                  value={registerValues.email}
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
                  value={registerValues.password}
                  required
                />
              </FormGroup>

              <Button className='col-12' color="success" type="submit" disabled={loading}><b>{loading ? "Registrando Usuario..." : "Registrar Usuario"}</b></Button>
              <Button className='col-12 mt-1' color="primary" type="button" onClick={() => navigate('/login')} ><b>Ya tengo cuenta</b></Button>

            </form>
          </Col>
        </Col>
        <Col sm={12} lg={6} className='d-flex justify-content-center align-items-center'>
          <img className="tex-center img-fluid rounded mb-2" src="https://png.pngtree.com/png-clipart/20230825/original/pngtree-virtual-library-online-book-club-picture-image_8477314.png" alt="" />
        </Col>
      </Row>

    </Container>
  )
}

export default Register