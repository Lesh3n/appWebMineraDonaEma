import React from 'react'
import { GestionarCuentas } from './GestionarCuentas'
import {Header} from './Header'
import { Login } from './Login'
import { RegistroTipoObjeto } from './RegistroTipoObjeto'
import { Historico } from './Historico'
import { Inventario } from './Inventario'


import { useParams} from 'react-router-dom';

export const Root = (props) => {
    const params = useParams()

    const direccionar = ()=> {
        console.log(params)
        switch (props.ruta) {
            case "/":
                return <Login/>
            case "inventario":
                return <Inventario/>
            case "registroTipoObj":
                return <RegistroTipoObjeto/>
            case "historico":
                return <Historico/>
            case "gestionarCuentas":
                return <GestionarCuentas/>
            default:
                return <p className='text-center' color='red'>ERROR 404 - La vista solicitada no existe.</p>
        }
    }


  return (
    <>
        <Header/>
        {direccionar()}
    </>
  )
}
