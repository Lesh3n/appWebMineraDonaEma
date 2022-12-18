import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';



import * as ServerMinera from './serverAPI/mineraServer'

import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FloatingLabel } from 'react-bootstrap';
import {TODO} from 'react'




//Nota, se podria agregar un modal haciendo otro component que este dentro de appjs y que sea llamado cuando se presione el boton. Se podria usar la sgte linea de codigo
// para poder hacerla funcional y que este boton navegue hasta el component que contiene el modal para poder mostrarlo.


<TODO>
    Falta hacer que se vea bonito junto con los otros componentes disponibles, ademas, este componente
    
    FALTA ACTUALIZAR DATOS, YA QUE ESTA FUNCIONAL EN LAS OTRAS

    Ademas de hacer el login funcional pero ver una forma de recuperar los datos para poder compararlos 
    con los existentes en la base de datos ademas de hacer una navbar dependiendo de la id del tipo de usuario.

    Y DESPLEGAR LA APP EN EL SERVIDOR EN LA NUBE AWS


    SOLUCIONADO EL PROBLEMA QUE NO ME ARROJABA NULL A LA HORA DE INGRESAR LA ID DEL TIPO DE BODEGUERO, ERA UN PROBLEMA DE API.

    FALTA EL HISTORICO QUE DEBIA TENER TRIGGERS PERO SOY PENDEJO Y ME OLVIDE XDDDDDDDDD
</TODO>




export const GestionarCuentas = (props) => {
    const params = useParams();

    //Se usa para obtener los datos del json que sostienen los objetos
    const [cuentas, setcuentas] = useState([]);

    const listarCuentas = async () =>{
        try {
            const res = await ServerMinera.listarUsers();
            const datos = await res.json();
            console.log(datos); //Esto llama los arreglos a la consola para checkear y depurar.
            //Renderiza los elementos encontrados.
            setcuentas(datos.usuarios);
            console.log(cuentas)
        } catch (error) {
            console.log(error);
        }
    };

    //Llama a listar objetos para que pueda ser desplegado en la tabla.
    useEffect( () => {
        listarCuentas();
    // eslint-disable-next-line
    },[]);

    //Se establece el estado inicial del Objeto a la hora de querer agregarlo a la base de datos.
    const estadoCuentaInicial = {idUsuario:0,nombre_propietario:"",apellido_propietario:"",nombre_usuario:"",contrasena:"",idTipo_bodeguero_id:""};

    //Hook que hace que a objeto y setObjeto tenga el estado de uso del estado inicial del objeto.
    const [cuenta, setcuenta] = useState(estadoCuentaInicial);

    //Hook que verifica si los datos dentro de las inputs han cambiado o no.
    const manejarCambiosEntrada = (e) => {
        console.log(e.target.name);
        setcuenta({ ...cuenta,[e.target.name]: e.target.value });
    }

    //Hook que maneja a donde van a parar los datos al presionar el boton registrar objeto.
    const manejarSubmit = async (e) => {
        e.preventDefault()
        try {
            let res;
            if (!params.idUsuario) {
                res = await ServerMinera.registrarUser(cuenta);
                const datos = await res.json();
                console.log(datos);
                window.location.reload();
            }else{
                await ServerMinera.actualizarObjeto(params.idUsuario,cuenta)
            }

        } catch (error) {
            console.log(error);
        }
    }

    const borrarCuenta = async (idUsuario) => {
        //console.log(idObjeto); Para verificar la recuperacion de la id a la hora de presionar el boton de borrado.
        //Espera a que reciba la respuesta de la api al mandarle la id del objeto, si la encuentra, borrara el dato solicitado a borrar.
        await ServerMinera.borrarUser(idUsuario);
        //Renderiza la lista nuevamente
        listarCuentas();
    }

    const obtenerCuenta = async (idUsuario) => {
        try {
            const res = await ServerMinera.obtenerUsers(idUsuario);
            const datos = await res.json();
            //console.log(datos); Para verificar a traves de consola si se obtienen los datos del boton presionado.
            const { nombre_propietario, apellido_propietario, nombre_usuario, contrasena, idTipo_bodeguero_id } = datos.cuenta;
            setcuenta({ nombre_propietario, apellido_propietario, nombre_usuario, contrasena, idTipo_bodeguero_id });

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if (params.idUsuario) {
            obtenerCuenta(params.idUsuario)
        }
    // eslint-disable-next-line
    }, []);

    return (
        <>
        <div id='tituloInventario'>
            <h1 className='text-center'>Ingresar cuentas</h1>
        </div>
        <br />
            <form onSubmit={manejarSubmit}>
                <div id='campoNombre'>
                    <Form.Group>
                        <FloatingLabel
                            controlId = 'floatingNombreObjeto'
                            label = "Nombre Propietario"
                            className = 'mb-3'
                        >
                            <Form.Control name='nombre_propietario' type='text' placeholder='Ej: Juanr' defaultValue={cuenta.nombre_propietario} onChange={manejarCambiosEntrada}/>
                        </FloatingLabel>
                    </Form.Group>
                </div>
                <div id='campoCantidad'>
                    <Form.Group>
                        <FloatingLabel
                            controlId = 'floatingCantidad'
                            label = "Apellido Propietario"
                            className = 'mb-3'
                        >
                            <Form.Control name='apellido_propietario' type='text' placeholder='Ej: Martinez' defaultValue={cuenta.apellido_propietario} onChange={manejarCambiosEntrada}/>
                        </FloatingLabel>
                    </Form.Group>
                </div>
                <div id='campoDescripcion'>
                    <Form.Group>
                        <FloatingLabel
                            controlId = 'floatingDescripcion'
                            label = "Nombre de Usuario"
                            className = 'mb-3'
                        >
                            <Form.Control name='nombre_usuario' type='text' placeholder='Ej: jmartinez' defaultValue={cuenta.nombre_usuario} onChange={manejarCambiosEntrada}/>
                        </FloatingLabel>
                    </Form.Group>
                </div>
                <div id='campoPrestatario'>
                    <Form.Group>
                        <FloatingLabel
                            controlId = 'floatingPrestatario'
                            label = "Contraseña"
                            className = 'mb-3'
                        >
                            <Form.Control name='contrasena' type='text' placeholder='Ej: jmartinez123' defaultValue={cuenta.contrasena} onChange={manejarCambiosEntrada}/>
                        </FloatingLabel>
                    </Form.Group>
                </div>
                <div id='campoIdTipoObjeto'>
                    <Form.Group>
                        <FloatingLabel
                            controlId = 'inTipoObjeto'
                            label = "ID Tipo Bodeguero"
                            className = 'mb-3'
                        >
                            <Form.Control name='idTipo_bodeguero_id' type='text' placeholder='Ej: 2 - Jefe' defaultValue={cuenta.idTipo_bodeguero_id} onChange={manejarCambiosEntrada}/>
                        </FloatingLabel>
                    </Form.Group>
                </div>
                <div className="text-center">
                    {
                        params.idUsuario?(
                            <Button variant='primary' type='submit'>
                            <i className="bi bi-plus-circle-fill"></i>
                            ACTUALIZAR CUENTA
                            </Button>

                        ) : (
                            <Button variant='success' type='submit'>
                            <i className="bi bi-plus-circle-fill"></i>
                            AGREGAR CUENTA
                            </Button>
                        )
                    }

                </div>
            </form>
            <br />
            <div>
                <h1 className='text-center'>Cuentas Registradas</h1>
            </div>
            <div>
                <table className="table table-striped mt-5">
                    <thead className='bg-dark text-white'>
                        <tr>
                            <th>ID</th>
                            <th>Nombre Propietario</th>
                            <th>Apellido Propietario</th>
                            <th>Nombre de Usuario</th>
                            <th>Contraseña</th>
                            <th>Tipo de Bodeguero</th>
                            <th>Modificar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cuentas?.map(cuenta =>
                        <tr>
                            <td>{cuenta.idUsuario}</td>
                            <td>{cuenta.nombre_propietario}</td>
                            <td>{cuenta.apellido_propietario}</td>
                            <td>{cuenta.nombre_usuario}</td>
                            <td>{cuenta.contrasena}</td>
                            <td>{cuenta.idTipo_bodeguero_id}</td>
                            <td>
                                <Button variant='warning' id='btnEditarCuenta'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                    </svg>
                                </Button>
                            </td>
                            <td>
                                <Button variant='danger' id='btnBorrarCuenta' onClick={() => cuenta.idUsuario && borrarCuenta(cuenta.idUsuario)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                    </svg>
                                </Button>
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}
