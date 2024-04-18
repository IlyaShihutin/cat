import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import SwitchCat from './page/SwitchCat/SwitchCat';
import CatPage from './page/CatPage/CatPage';

import "./style.scss";

const root = createRoot(
  document.getElementById('root') as HTMLElement
);
const router = createBrowserRouter([
  {
    path: "/cat",
    element: <CatPage />,
  },
  {
    path: "/switch_cat",
    element: <SwitchCat />,
  },
]);
root.render(
  <RouterProvider router={router} />
);