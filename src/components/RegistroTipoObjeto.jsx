import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';



import * as ServerMinera from './serverAPI/mineraServer'

import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FloatingLabel } from 'react-bootstrap';



export const RegistroTipoObjeto = () => {
  const params = useParams();


  const [tiposObjeto, setTiposObjeto] = useState([]);

  const listarTiposObjeto = async () => {
    try {
      const res = await ServerMinera.listarTiposObjeto();
      const datos = await res.json();
      console.log(datos);
      console.log(datos.tipos_objeto); //ESTA LINEA DEPURA SI ES QUE DATOS TIENE TIPOS OBJETO
      setTiposObjeto(datos.tipos_objeto); //REVISAR LA CONSOLA Y VER COMO SE LLAMA EL JSON PARA USARLO AQUI
      console.log(tiposObjeto); //ESTA LINEA DEPURA Y REVISA SI ES QUE EL ARREGLO tiposObjeto tiene guardado el json
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listarTiposObjeto();
  } // eslint-disable-next-line
  , []);

  const estadoTipoObjetoInicial = { id_tipo: 0, nombre_tipo: "" };

  const [tipoObjeto, setTipoObjeto] = useState(estadoTipoObjetoInicial);

  const manejarCambiosEntrada = (e) => {
    setTipoObjeto({ ...tipoObjeto, [e.target.name]: e.target.value })
  }

  const manejarSubmit = async (e) => {
    e.preventDefault()
    try {
      if (e.target[1].name === 'btnActualizar') {
        await ServerMinera.actualizarTipoObjeto(tipoObjeto.id_tipo, tipoObjeto);
        console.log("Actualizando")
      } else {
        await ServerMinera.registrarTipoObjeto(tipoObjeto);
        console.log("Registrando")
      }
      window.location.reload();

    } catch (error) {
      console.log(error)
    }
  }

  const handleEditar = (tipoObjeto) => {
    setTipoObjeto(tipoObjeto)
  }

  const borrarTipoObjeto = async (id_tipo) => {
    await ServerMinera.borrarTipoObjeto(id_tipo);
    listarTiposObjeto();
  }

  //Esto quizas tendria que eliminarse por el hecho de que ya no se busca al objeto que se esta actualizando, sino, que lo agarra directamente y luego lo manda a la base de datos.
  //Lo mismo desde la linea 96 hasta la 101
  const obtenerTipoObjeto = async (id_tipo) => {
    try {
      const res = await ServerMinera.obtenerTipoObjeto(id_tipo);
      const datos = await res.json();
      console.log(datos)

      const { nombre_tipo } = datos.tipoObjeto;
      setTipoObjeto({ nombre_tipo })
      console.log(setTipoObjeto)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (params.id_tipo) {
      obtenerTipoObjeto(params.id_tipo)
    }
    // eslint-disable-next-line
  })

  {document.body.style = 'background: #ededeb;'};
  return (
    <>
    <br />
      <div className='text-center' id='tituloRegistroTipoObjeto'>
        {
          tipoObjeto.id_tipo > 0 ? (
            <h1>
              Actualizar Tipo De Objeto
            </h1>
          ) : (
            <h1>
              Agregar un Tipo de Objeto.
            </h1>
          )
        }
      </div>
      <br />
      <form onSubmit={manejarSubmit}>
        <div>
          <Form.Group>
            <FloatingLabel controlId='floatingNombreTipo' label='Nombre Tipo Objeto' className='mb-3'>
              <Form.Control name='nombre_tipo' type='text' defaultValue={tipoObjeto.nombre_tipo} onChange={manejarCambiosEntrada} />
            </FloatingLabel>
          </Form.Group>
        </div>
        <div className='text-center'>
          {
            tipoObjeto.id_tipo > 0 ? (
              <Button variant='primary' type='submit' name='btnActualizar'>
                <i class="bi bi-pencil"></i>
                ACTUALIZAR TIPO OBJETO
              </Button>
            ) : (
              <Button variant='success' type='submit' name='btnAgregar'>
                <i className="bi bi-plus-circle-fill"></i>
                AGREGAR TIPO OBJETO
              </Button>
            )
          }
        </div>
        <form>
          <br />
          <div>
            <h1 className='text-center'>Tipos de Objeto Registrados</h1>
          </div>
          <div>
            <table className='table table-striped'>
              <thead className='bg-dark text-white'>
                <tr>
                  <th>ID Tipo Objeto</th>
                  <th>Nombre Tipo Objeto</th>
                  <th>Modificar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {tiposObjeto?.map(tipoObjeto =>
                  <tr>
                    <td>{tipoObjeto.id_tipo}</td>
                    <td>{tipoObjeto.nombre_tipo}</td>
                    <td>
                      <Button variant='warning' id='btnEditarTipoObjeto' onClick={() => handleEditar(tipoObjeto)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                        </svg>
                      </Button>
                    </td>
                    <td>
                      <Button variant='danger' id='btnBorrarTipoObjeto' onClick={() => { if (window.confirm(`ADVERTENCIA: ¿Está seguro que desea eliminar el tipo de objeto seleccionado? ¡Los datos borrados NO podrán ser recuperados!`)) tipoObjeto.id_tipo && borrarTipoObjeto(tipoObjeto.id_tipo) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                          <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                        </svg>
                      </Button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </form>
      </form>

    </>
  )
}

