import React,{useState} from 'react';
import axios from 'axios'


const Register = () => {
    const [data,setData] = useState({
        username:'',
        email:'',
        password:'',
        confirmpassword:''
    })
    const changeHandler = e =>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const submitHandler = e =>{
        e.preventDefault();
        axios.post('http://localhost:4000/register',data).then(
            res => {alert(res.data);setData({
                username:'',
                email:'',
                password:'',
                confirmpassword:''
            })}
        ).catch((err)=>alert("Email is already taken"))

    }
    return (
        <div className='register'>    
            <form onSubmit={submitHandler}>
                <h3>Register</h3>
                <input type="text" onChange={changeHandler} name="username" value={data.username} placeholder="User Name" />
                <input type="email" onChange={changeHandler} name="email" value={data.email} placeholder="Email" />
                <input type="password" onChange={changeHandler} name="password" value={data.password} placeholder="Password" />
                <input type="password" onChange={changeHandler} name="confirmpassword" value={data.confirmpassword} placeholder="Confirm Password" />
                <button type='submit' className='submit'>Register</button>
            </form>
        </div>
    )
}

export default Register