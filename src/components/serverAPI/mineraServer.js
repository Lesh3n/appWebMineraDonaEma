const API_URL_OBJETO = "http://127.0.0.1:8000/api/objeto/";

const API_URL_TIPO_OBJETO = "http://127.0.0.1:8000/api/tipoObjeto/";

const API_URL_USUARIO = "http://127.0.0.1:8000/api/usuario/";
// eslint-disable-next-line
const API_URL_TIPO_BODEGUERO = "http://127.0.0.1:8000/api/tipoBodeguero/";

//API Objeto
export const listarObjetos = async () => {
    return await fetch(API_URL_OBJETO);
};

export const obtenerObjeto = async (idObjeto) => {
    return await fetch(`${API_URL_OBJETO}${idObjeto}`);
};

export const registrarObjeto = async (nuevoObjeto) =>{
    return await fetch(API_URL_OBJETO,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            "nombre":String(nuevoObjeto.nombre).trim(),
            "cantidad":parseInt(nuevoObjeto.cantidad),
            "descripcion":String(nuevoObjeto.descripcion).trim(),
            "prestatario":String(nuevoObjeto.prestatario).trim(),
            "id_tipo_id":parseInt(nuevoObjeto.id_tipo_id)
        })
    });
};

//No me actualiza los datos porque no logra recuperar la ID, como no lo logra, no puede actualizarse el objeto a través de la api
//Por ejemplo, si quiero actualizar objeto/1 donde '1' es la ID de mi objeto no lo actualizará porque se está metiendo el put en http://127.0.0.1:8000/api/objeto/

export const actualizarObjeto = async (idObjeto, objetoActualizado) =>{
    //La línea comentada abajo es la original, si se descomenta dará un error 404 debido a que no puede encontrar http://127.0.0.1:8000/api/objeto/undefined/
    //Es por eso que fue reemplazada por la que está en la línea 42. Leer líneas 34 a 35.

    return await fetch(`${API_URL_OBJETO}${idObjeto}`,{
    //return await fetch(API_URL_OBJETO, idObjeto, {
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            "nombre":String(objetoActualizado.nombre).trim(),
            "cantidad":parseInt(objetoActualizado.cantidad),
            "descripcion":String(objetoActualizado.descripcion).trim(),
            "prestatario":String(objetoActualizado.prestatario).trim(),
            "id_tipo_id":parseInt(objetoActualizado.id_tipo_id)
        })
    });
};




export const borrarObjeto = async (idObjeto) =>{
    return await fetch(`${API_URL_OBJETO}${idObjeto}`,{
        method:'DELETE',
    });
};




//Api TIPO OBJETO
export const listarTiposObjeto = async () => {
    return await fetch(API_URL_TIPO_OBJETO);
};



export const obtenerTipoObjeto = async (id_tipo) => {
    return await fetch(`${API_URL_TIPO_OBJETO}${id_tipo}`);
};



export const registrarTipoObjeto = async (nuevoTipoObjeto) =>{
    return await fetch(API_URL_TIPO_OBJETO,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            "nombre_tipo":String(nuevoTipoObjeto.nombre_tipo).trim()
        })
    });
};



export const actualizarTipoObjeto = async (id_tipo, tipoObjetoActualizado) =>{
    return await fetch(`${API_URL_TIPO_OBJETO}${id_tipo}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            "nombre_tipo":String(tipoObjetoActualizado.nombre_tipo).trim()
        })
    });
};



export const borrarTipoObjeto = async (id_tipo) =>{
    return await fetch(`${API_URL_TIPO_OBJETO}${id_tipo}`,{
        method:'DELETE'
    });
};



//API Usuarios
export const listarUsers = async () => {
    return await fetch(API_URL_USUARIO);
};

export const obtenerUsers = async (idUsuario) => {
    return await fetch(`${API_URL_USUARIO}${idUsuario}`);
};

export const registrarUser = async (nuevoUsuario) =>{
    return await fetch(API_URL_USUARIO,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            "nombre_propietario":String(nuevoUsuario.nombre_propietario).trim(),
            "apellido_propietario":String(nuevoUsuario.apellido_propietario),
            "nombre_usuario":String(nuevoUsuario.nombre_usuario).trim(),
            "contrasena":String(nuevoUsuario.contrasena).trim(),
            "idTipo_bodeguero_id":parseInt(nuevoUsuario.idTipo_bodeguero_id)
        })
    });
};

export const actualizarUser = async (idUsuario, usuarioActualizado) =>{
    return await fetch(`${API_URL_USUARIO}${idUsuario}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            "nombre_propietario":String(usuarioActualizado.nombre_propietario).trim(),
            "apellido_propietario":String(usuarioActualizado.apellido_propietario),
            "nombre_usuario":String(usuarioActualizado.nombre_usuario).trim(),
            "contrasena":String(usuarioActualizado.contrasena).trim(),
            "idTipo_bodeguero":parseInt(usuarioActualizado.idTipo_bodeguero)
        })
    });
};




export const borrarUser = async (idUsuario) =>{
    return await fetch(`${API_URL_USUARIO}${idUsuario}`,{
        method:'DELETE',
    });
};
