import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import React from 'react';
import './App.css';
import Menu from './components/Menu';
import Home from './components/Home';
import Sobre from './components/Sobre';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu />,
    children : [
      {
        index : true,
        element: <Home />},
      {
        path : '/sobre',
        element: <Sobre />
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
