import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css'
export default Home;
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import PageNotFound from './pages/PageNotFound/PageNotFound';
import Home from './pages/Home/Home';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <PageNotFound />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
