import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem } from 'reactstrap';

const GuestNavbar = () => {

    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    return (

        <Navbar className='navbar mb-4  navbar-dark bg-dark' expand="md">
            <NavbarBrand className='text-white'><b>Library - Management</b></NavbarBrand>
            <NavbarToggler onClick={toggleNavbar} />
            <Collapse isOpen={collapsed} navbar>
                <Nav className='mr-auto mb-2 mb-lg-0 fw-bold' navbar>
                    <NavItem>
                        <NavLink to="/home" style={{ textDecoration: 'none', color: 'white' }} className="mx-1">
                            <i className="bi bi-house-door-fill"></i> Inicio
                        </NavLink>
                    </NavItem>
                    <NavLink to="/register" style={{ textDecoration: 'none', color: 'white' }} className="mx-1">
                        <i className="bi bi-person-circle"></i> Registrarse
                    </NavLink>
                    <NavLink to="/login"style={{ textDecoration: 'none', color: 'white' }} className="mx-1">
                        <i className="bi bi-door-open-fill"></i>  Iniciar Sesión
                    </NavLink>

                </Nav>
            </Collapse>
        </Navbar>

    );

}

export default GuestNavbar