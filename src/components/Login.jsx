import React from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

// TODO: Agregar GRID en todas las vistas incluyendo esta.

export const Login = () => {
  return (
    <>
      <Form>
        <div className='text-center'>
          <Form.Group controlId="formCampoUsuario">
            <Form.Label className='fs-4'>Nombre de usuario</Form.Label>
            <Form.Control type="email" placeholder="Ej: atorres" />
          </Form.Group>
          <Form.Group controlId="formCampoContrasena">
            <Form.Label className='fs-4'>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Ej: !234$6At" />
          </Form.Group>
        </div>
        <br />
        <div className='text-center'>
          <Button variant="success" type="submit">
            Ingresar <i class="bi bi-box-arrow-in-right"></i>
          </Button>
        </div>
      </Form>
    </>
  )
}
