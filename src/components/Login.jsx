import React from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

export const Login = () => {
  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nombre de usuario</Form.Label>
          <Form.Control type="email" placeholder="Ej: atorres" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Ej: !234$6At" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Ingresar
        </Button>
      </Form>
    </>
  )
}
