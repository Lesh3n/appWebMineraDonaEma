import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';



import * as ServerMinera from './serverAPI/mineraServer'

import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FloatingLabel } from 'react-bootstrap';
import { Toast } from 'react-bootstrap';

const toastIngresoExitoso = () => {
    <Toast>
        <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
  </Toast>
}
//Se recibe un props en caso de que este sea necesario, esto, sirve para poder actualizar los datos correctamente. El props se envia desde Root.jsx
export const Inventario = () => {
    const params = useParams();
    // eslint-disable-next-line

    //Se usa para obtener los datos del json que sostienen los objetos
    const [objetos, setObjetos] = useState([]);

    // eslint-disable-next-line 
    const [tiposObjeto, setTiposObjeto] = useState([]);

    const listarObjetos = async () =>{
        try {
            const res = await ServerMinera.listarObjetos();
            const datos = await res.json();
            //console.log(datos); Esto llama al json a la consola para checkear
            //Renderiza los elementos encontrados.
            setObjetos([...datos.objetos]); //aqui se utiliza el nombre que tiene el archivo json, ese mismo nombre, debe ponerse en el arreglo con setNombreVariable
            console.log(datos.objetos)
        } catch (error) {
            console.log(error);
        }
    };

    const sacarTiposObjeto = async () =>{
        try {
            const res = await ServerMinera.listarTiposObjeto();
            const datos = await res.json();
            console.log(datos); //Esto llama al json a la consola para checkear
            //Renderiza los elementos encontrados.
            setTiposObjeto([...datos.tiposObjeto]); //aqui se utiliza el nombre que tiene el archivo json, ese mismo nombre, debe ponerse en el arreglo con setNombreVariable
            console.log(datos.tiposObjeto)
        } catch (error) {
            console.log(error);
        }
    };

    //Llama a listar objetos para que pueda ser desplegado en la tabla.
    useEffect( () => {
        listarObjetos();
    },[]);

    useEffect( () => {
        sacarTiposObjeto();
    },[]);

    //Se establece el estado inicial del Objeto a la hora de querer agregarlo a la base de datos.
    const estadoObjetoInicial = {idObjeto:0,nombre:"",cantidad:1,descripcion:"",prestatario:"",id_tipo_id:""};
    
    const estadoTipoObjetoInicial = {id_tipo:0, nombre_tipo:''};

    //Hook que hace que a objeto y setObjeto tenga el estado de uso del estado inicial del objeto.
    const [objeto, setObjeto] = useState(estadoObjetoInicial);

    // eslint-disable-next-line 
    const [tipoObjeto, setTipoObjeto] = useState(estadoTipoObjetoInicial)

    //Hook que verifica si los datos dentro de las inputs han cambiado o no.
    const manejarCambiosEntrada = (e) => {
        console.log(e.target.name);
        setObjeto({ ...objeto,[e.target.name]: e.target.value });
    }

    //Hook que maneja a donde van a parar los datos al presionar el boton registrar objeto.
    const manejarSubmit = async (e) => {
        e.preventDefault()
        if(e.target[5].name === 'btnActualizar'){
            await ServerMinera.actualizarObjeto(objeto.idObjeto,objeto);
            console.log("Actualizando")
        }else{
            await ServerMinera.registrarObjeto(objeto);
            console.log("Registrando")
            
        }

        window.location.reload();
        toastIngresoExitoso()
        
    }

    const borrarRegistro = async (idObjeto) => {
        //console.log(idObjeto); Para verificar la recuperacion de la id a la hora de presionar el boton de borrado.
        //Espera a que reciba la respuesta de la api al mandarle la id del objeto, si la encuentra, borrara el dato solicitado a borrar.
        //const opcion = confirm(`Esta seguro que desea borrar el objeto de ID: ${idObjeto}?`);
        //console.log(opcion);

        await ServerMinera.borrarObjeto(idObjeto);
        //Renderiza la lista nuevamente
        listarObjetos();
    }

    const handleEditar = (objeto)=>{
        setObjeto(objeto)
    }
    
    const obtenerObjeto = async (idObjeto) => {
        try {
            const res = await ServerMinera.obtenerObjeto(idObjeto);
            const datos = await res.json();
            console.log("--------")
            console.log(datos); //Para verificar a traves de consola si se obtienen los datos del boton presionado.
            const { nombre, cantidad, descripcion, prestatario, id_tipo_id } = datos.objeto;
            setObjeto({ nombre, cantidad, descripcion, prestatario, id_tipo_id });

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if (params.id) {
            obtenerObjeto(params.id)
        }
        // eslint-disable-next-line
    }, []);

    {document.body.style = 'background: #ededeb;'};
    return (
        <>
        <br />
        <div id='tituloInventario' className='text-center'>
            {
                objeto.idObjeto>0?(
                        <h1>
                            Actualizando Objeto
                        </h1>
                    ) : (
                        <h1>
                            Agregar Objeto
                        </h1>
                )
            }
        </div>
        <br />
            <form onSubmit={manejarSubmit}>
                <div id='campoNombre'>
                    <Form.Group>
                        <FloatingLabel
                            controlId = 'floatingNombreObjeto'
                            label = "Nombre Objeto"
                            className = 'mb-3'
                        >
                            <Form.Control name='nombre' type='text' placeholder='Ej: Muelas Chancador' defaultValue={objeto.nombre} onChange={manejarCambiosEntrada}/>
                        </FloatingLabel>
                    </Form.Group>
                </div>
                <div id='campoCantidad'>
                    <Form.Group>
                        <FloatingLabel
                            controlId = 'floatingCantidad'
                            label = "Cantidad"
                            className = 'mb-3'
                        >
                            <Form.Control name='cantidad' type='number' placeholder='Ej: 2' defaultValue={objeto.cantidad} onChange={manejarCambiosEntrada}/>
                        </FloatingLabel>
                    </Form.Group>
                </div>
                <div id='campoDescripcion'>
                    <Form.Group>
                        <FloatingLabel
                            controlId = 'floatingDescripcion'
                            label = "Descripcion"
                            className = 'mb-3'
                        >
                            <Form.Control name='descripcion' type='text' placeholder='Ej: yadayadayadayadayadayada' defaultValue={objeto.descripcion} onChange={manejarCambiosEntrada}/>
                        </FloatingLabel>
                    </Form.Group>
                </div>
                <div id='campoPrestatario'>
                    <Form.Group>
                        <FloatingLabel
                            controlId = 'floatingPrestatario'
                            label = "Prestatario"
                            className = 'mb-3'
                        >
                            <Form.Control name='prestatario' type='text' placeholder='Ej: Jaimito El Cartero' defaultValue={objeto.prestatario} onChange={manejarCambiosEntrada}/>
                        </FloatingLabel>
                    </Form.Group>
                </div>
                <div id='campoIdTipoObjeto'>
                    <Form.Group>
                        {/*
                        TODO: Aca hace falta revisar para que las ID aparezcan a traves del dropdown select, se logro con la de objeto pero no tengo
                        ni la mas remota idea si es que debo sacar esos datos de la otra tabla a traves de un fetch, de ser asi el caso, como puedo hacer para
                        que esos datos se ingresen en la otra tabla? 

                        <Form.Select defaultValue={objeto.id_tipo_id} onChange={manejarCambiosEntrada}>
                            <option value="">Seleccione el tipo de objeto...</option>
                            {tiposObjeto.map(tipoObjeto => (
                                <option value={tipoObjeto.id_tipo} key={objeto.id_tipo_id}>{tipoObjeto.nombre_tipo}</option>
                            )
                            )}

                        </Form.Select>
                        */}
                        <FloatingLabel
                            controlId = 'inTipoObjeto'
                            label = "ID Tipo Objeto"
                            className = 'mb-3'
                        >
                            <Form.Control name='id_tipo_id' type='text' placeholder='Ej: 2 - Herramienta' defaultValue={objeto.id_tipo_id} onChange={manejarCambiosEntrada}/>
                        </FloatingLabel>
                    </Form.Group>
                </div>
                <div className="text-center">
                    {
                        objeto.idObjeto>0?(
                            <Button variant='primary' type='submit' name="btnActualizar">
                            ACTUALIZAR OBJETO <i class="bi bi-pencil"/>
                            </Button>

                        ) : (
                            <Button variant='success' type='submit' name="btnAgregar">
                            AGREGAR OBJETO <i className="bi bi-plus-circle-fill"/>
                            </Button>
                        )
                    }

                </div>
            </form>
            <br />
            <div id='tituloTablaInventario'>
                <h1 className='text-center'>Registros</h1>
            </div>
            <div id='tablaInventario'>
                <table className="table table-striped mt-5">
                    <thead className='bg-dark text-white' id='headerTablaObjeto'>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Cantidad</th>
                            <th>Descripcion</th>
                            <th>Prestatario</th>
                            <th>Tipo Objeto</th>
                            <th>Modificar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody id='cuerpoTablaObjeto'>
                        {objetos?.map(objeto =>
                        <tr>
                            <td>{objeto.idObjeto}</td>
                            <td>{objeto.nombre}</td>
                            <td>{objeto.cantidad}</td>
                            <td>{objeto.descripcion}</td>
                            <td>{objeto.prestatario}</td>
                            <td>{objeto.id_tipo_id}</td>
                            <td>
                                <Button variant='warning' id='btnEditarObjeto' onClick={() => handleEditar(objeto)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                    </svg>
                                </Button>
                            </td>
                            <td>
                                <Button variant='danger' id='btnBorrarObjeto' onClick={() => {if(window.confirm(`ADVERTENCIA: ¿Está seguro de eliminar el objeto seleccionado? ¡Los datos borrados NO podrán ser recuperados!`))objeto.idObjeto && borrarRegistro(objeto.idObjeto)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                    </svg>
                                </Button>
                            </td>
                        </tr>
                        )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}