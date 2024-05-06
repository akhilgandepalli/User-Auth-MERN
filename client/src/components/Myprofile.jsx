import React,{useContext,useState,useEffect} from 'react'
import {store} from '/src/App';
import { Navigate} from 'react-router-dom';
import axios from 'axios';
import avatar from '/public/profile-image.png';

const Myprofile = () => {
    const [token,setToken] = useContext(store);
    const [data,setData] = useState(true);
    useEffect(() =>{
        axios.get('http://localhost:4000/myprofile',{
            headers: {
                'x-token' : token
            }
        }).then(res => setData(res.data)).catch((err) => console.log(err))
    },[])
    if(!token){
        return <Navigate to='/login' />
    }
    return (
        <div className='profile'>
            {
                data &&
            <center>
                <br />
                <div className="card">
                <img className="card-img" src={avatar} alt="Card image cap" />
                <div className="card-body">
                    <h4 className="card-title">Name : {data.username}</h4>
                    <button className="card-btn" onClick={() => setToken(null)}>Logout</button>
                </div>
                </div>
            </center>
        }
        </div>
    )
}

export default Myprofile