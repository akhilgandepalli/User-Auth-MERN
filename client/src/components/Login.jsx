import React,{useState,useContext} from 'react'
import axios from 'axios';
import {store} from '/src/App';
import { Navigate } from 'react-router-dom';

const Login = () => {
    const [token,setToken] = useContext(store)
    const [data,setData] = useState({
        email:'',
        password:'',
    })
    const changeHandler = e =>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const submitHandler = e =>{
        e.preventDefault();
        axios.post('http://localhost:4000/login',data).then(
            res => {setToken(res.data.token);setData({email:'',password:''})}
        ).catch((err)=>alert('Invalid Email or Password'));
    }
    if(token){
       return <Navigate to='/myprofile' />
    }
    return (
        <div className='login'>
            <form onSubmit={submitHandler}>
                <h3>Login</h3>
                <input type="email" onChange={changeHandler} name="email" value={data.email} placeholder="Email" />
                <input type="password" onChange={changeHandler} name="password" value={data.password} placeholder="Password" />
                <button type="submit" className='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login