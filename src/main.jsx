import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import NouClient from './pages/NouClient';
import Clients from './pages/Clients';
import Index, { loader as clientsLoader } from './pages/Index';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/clients',
        element: <Clients />,
      },
      {
        path: '/clients/nou',
        element: <NouClient />,
      },
      {
        index: true,
        element: <Index />,
        loader: clientsLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <h1>DAW MP6 - React</h1>
  </React.StrictMode>,
);

export default main;
