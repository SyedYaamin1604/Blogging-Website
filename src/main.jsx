import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard'
import Profile from './Pages/Profile'
import ProtectedRoutes from './Components/ProtectedRoutes'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <Signup />
      },
      {
        path: 'dashboard',
        element: <ProtectedRoutes component={<Dashboard />}/>
      },
      {
        path: 'profile',
        element: <ProtectedRoutes component={<Profile />}/>
      },
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}></RouterProvider>
)
