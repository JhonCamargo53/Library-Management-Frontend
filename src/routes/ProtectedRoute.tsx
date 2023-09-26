import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Row, Col, Alert } from "reactstrap";
import { useUserContext } from "../context/UserContext";
import { AllowedRole, roleDictionary } from "../Contants";

interface Props {
    allowedRole: Array<AllowedRole>
}

const ProtectedRoute: React.FC<Props> = ({ allowedRole }) => {

    const [hasAccess, setHasAccess] = useState(false);
    const { user } = useUserContext();

    const location = useLocation();

    useEffect(() => {
        if (user) {
            const { role } = user;

            if (allowedRole.some((roleType) => roleDictionary[roleType] === role)) {
                setHasAccess(true);
            } else {
                setHasAccess(false);
            }
        }
    }, [user, allowedRole]);

    if (!user) {

        if (location.pathname === "/login" || location.pathname === "/register") {
            return <Outlet />;
        }
        
        return (
            <Row className="m-2">
                <Col className='text-center'>
                    <Alert color='danger'><Row>
                        <b>ACCESO DENEGADO... INICIAR SESIÓN</b>
                    </Row>
                        <Row >
                            <Col className="text-center">
                                <Link to="/home" className="btn btn-danger col-6">
                                    Regresar al Inicio
                                </Link>
                            </Col>
                        </Row>
                    </Alert>
                </Col>

            </Row>
        );
    } else {
        if (hasAccess) {
            return <Outlet />;
        } else {
            if (location.pathname === "/login" || location.pathname === "/register") {
                window.location.href = '/home';
                return
            } else {
                return (
                    <Row className="m-2">
                        <Col className='text-center'>
                            <Alert color='danger'>
                                <Row>
                                    <b>NO TIENE LOS PERMISOS NECESARIOS PARA ESTA VISTA</b>
                                </Row>
                                <Row className="justify-content-center">
                                    <Link to="/home" className="btn btn-danger col-6">
                                        Regresar al Inicio
                                    </Link>
                                </Row>
                            </Alert>
                        </Col>
                    </Row>
                );
            }
        }
    }
};

export default ProtectedRoute;
