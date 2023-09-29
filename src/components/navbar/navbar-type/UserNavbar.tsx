import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem } from "reactstrap";
import { useUserContext } from "../../../context/UserContext";
import Swal from "sweetalert2";

const UserNavbar = () => {

    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    const { logout } = useUserContext();

    const handleLogout = () => {

        Swal.fire({
            title: '¿Estas seguro de cerrar la sesión?',
            text: "Una vez cerrada, deberas iniciar sesión nuevamente",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Cerrar sesión',
            cancelButtonText: 'Cancelar'

        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Sesión terminada',
                    'Hasta pronto...',
                    'success'
                )
                logout();
            }
        })
    }

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

                    <NavLink to="/book/list" style={{ textDecoration: 'none', color: 'white' }} className="mx-1">
                    <i className="bi bi-journal-plus"></i> Libros disponibles

                    </NavLink>

                    <NavLink to="/book/borrow" style={{ textDecoration: 'none',color: 'white' }} className="mx-1">
                    <i className="bi bi-journal-check"></i>   Prestamos
                 
                    </NavLink>

                    <a onClick={handleLogout} style={{ textDecoration: 'none',color: 'white',cursor: 'pointer' }} className="mx-1"> <i className="bi bi-box-arrow-right"></i>Cerrar Sesión</a>

                </Nav>
            </Collapse>
        </Navbar>
    )
}

export default UserNavbar