import React from 'react'
import { Outlet, Link } from 'react-router-dom'

const Header = () => {
  return (
    <><header>
        <h2>User Authentication</h2>
        <ul>
            <Link key='register' to='/register'><li>Register</li></Link>
            <Link key='login' to='/login'><li>Login</li></Link>
        </ul>
    </header>
    <Outlet/>
    </>
  )
}

export default Header