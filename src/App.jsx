import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import React from 'react';
import './App.css';
import Menu from './componentes/Menu';
import Home from './componentes/Home';
import Sobre from './componentes/Sobre';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Categoria from "./componentes/telas/categoria/Categoria";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/sobre",
        element: <Sobre />,
      }     
      ,
      {
        path: "/categorias",
        element: <Categoria />,
      }         
    ]
  }

]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
