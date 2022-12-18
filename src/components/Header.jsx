import React from 'react'
import { Container } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
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
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text>
          <Nav.Link>
            Cerrar Sesion
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}