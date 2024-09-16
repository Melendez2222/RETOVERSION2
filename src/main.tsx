import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProtectedRoute from './route/ProtectedRoute.tsx'
import AdmPanel from './components/BODY/AdmPanel.tsx'
import { AuthProv } from './auth/AuthProv.tsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children:[
      {
        path:"/AdmPanel",
        element:<AdmPanel/>
      }
    ]
  },
]);

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <AuthProv>
    <RouterProvider router={router} />
    </AuthProv>
  </StrictMode>

)
