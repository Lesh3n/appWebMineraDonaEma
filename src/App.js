//import logo from './logo.svg';
import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {Root} from './components/Root';



//TODO: Llenar las interfaces de ingresar tipo objeto, cuentas, historico y hacer todo mas estetico.



function App() {
  return (
    <>
      <BrowserRouter>


        <Routes>

          <Route exact path='/' element={<Root ruta="/"/>} />
          <Route exact path='/inventario' element={<Root ruta="inventario"/>}/>
          <Route exact path='/registroTipoObj' element={<Root ruta="registroTipoObj"/>}/>
          <Route exact path='/historico' element={<Root ruta="historico"/>}/>
          <Route exact path='/gestionarCuentas' element={<Root ruta="gestionarCuentas"/>}/>


        </Routes>


      </BrowserRouter>
    </>
  );
}

export default App;
