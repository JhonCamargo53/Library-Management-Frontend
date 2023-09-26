import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem } from 'reactstrap';

const GuestNavbar = () => {

    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    return (

        <Navbar color='info' className='navbar' expand="lg">
            <NavbarBrand>Library - Management - Guest</NavbarBrand>
            <NavbarToggler onClick={toggleNavbar} />
            <Collapse isOpen={collapsed} navbar>
                <Nav className='mr-auto mb-2 mb-lg-0 fw-bold' navbar>
                    <NavItem>
                        <NavLink to="/home" style={{ textDecoration: 'none',color: 'black' }} className="mx-1">
                            Inicio
                        </NavLink>
                    </NavItem>
                    <NavLink to="/register" style={{ textDecoration: 'none',color: 'black' }} className="mx-1">
                        Registrarse
                    </NavLink>
                    <NavLink to="/login" style={{ textDecoration: 'none',color: 'black' }} className="mx-1">
                        Iniciar Sesión
                    </NavLink>

                </Nav>
            </Collapse>
        </Navbar>

    );

}

export default GuestNavbar