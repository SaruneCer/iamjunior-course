import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from './pages/Home.jsx';
import { AboutUs } from './pages/AboutUs.jsx';
import { Services } from './pages/Services.jsx';
import { ROUTES } from './router/pageRoutes.js';
import { Error } from './pages/Error.jsx';
import ReactDOM from "react-dom/client";
import App from './App.jsx'
import './index.css'

const router = createBrowserRouter([{
  path: "/",
  element: <App />,
  errorElement : <Error/>,
  children: [
    {
    path : ROUTES.HOME,
      element: <Home/>
    },
    {
      path: ROUTES.ABOUT_US,
      element : <AboutUs/>
    },
    {
      path: ROUTES.SERVICES,
      element: <Services/>
    }
  ]
}])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
