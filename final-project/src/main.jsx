import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from './AppRouter.jsx'
import {RouterProvider} from "react-router";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={AppRouter} />
  </StrictMode>,
)
