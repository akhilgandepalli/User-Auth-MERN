import { createContext, useState } from 'react'
import './AppCss.css'
import Header from './components/Header'
import Main from './components/Main'
import Register from './components/Register'
import Login from './components/Login'
import Myprofile from './components/Myprofile'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

export const store = createContext();

function App() {
  const [token, setToken] = useState(null)

  const router = createBrowserRouter([
    {
      path: '/',
      element:<Header/>,
      children:[
        {
          path:'/',
          element:<Main/>
        },
        {
          path:'/register',
          element:<Register/>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'/myprofile',
          element:<Myprofile/>
        }
      ]
    }
  ])

  return (
    <>
    <store.Provider value={[token,setToken]}>
    <RouterProvider router={router}/>
    </store.Provider>
    
    </>
  )
}

export default App
