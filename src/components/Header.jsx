import React from 'react'
import { Container } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from './../assets/img/logo.png'

export const Header = () => {
  return (
    <Navbar bg="warning">
      <Container>
        <Navbar.Brand href="#home">
          <img 
          src={logo} 
          alt="Logo empresa" 
          width={"120"}
          height={"35"}
          />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="opciones-navbar">
          <Nav className='me-auto'>
            <Nav.Link>
              <NavLink to={"/inventario"}>Inventario</NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink to={"/registroTipoObj"}>Registrar Tipo Objeto</NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink to={"/historico"}>Historico</NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink to={"/gestionarCuentas"}>Gestionar Cuentas</NavLink>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <strong> aibanez (Andrés Ibáñez) </strong>
          </Navbar.Text>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Nav.Link>
            <NavLink to={"/"}>Cerrar Sesión <i class="bi bi-box-arrow-left"/> </NavLink>
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}