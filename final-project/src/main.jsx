import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from './AppRouter.jsx'
import {RouterProvider} from "react-router";
import {Provider} from "react-redux";
import { store } from './store/index';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
      <RouterProvider router={AppRouter} />
      </Provider>
  </StrictMode>,
)
