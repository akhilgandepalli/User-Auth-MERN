const express = require('express');
const mongoose = require("mongoose");
const UserRegister = require("./model");
const jwt = require('jsonwebtoken');
const middleware = require('./middleware')
const cors = require('cors')
const app = express();

mongoose.connect('mongodb+srv://User_Auth:Users@cluster0.svnt8ku.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{}).then(
    ()=>console.log('DB Connected!')
)
app.use(express.json());

app.use(cors({origin:"*"}))

app.post('/register',async(req,res)=>{
    try{
        const {username, email, password, confirmpassword} = req.body;
        let exist = await UserRegister.findOne({email});
        if(exist){
            return res.status(400).send("User already Exist!");
        }
        if(password != confirmpassword){
            return res.status(400).send("Passwords not Matching!");
        }
        let newUser = new UserRegister({
            username, 
            email, 
            password, 
            confirmpassword
        })
        await newUser.save();
        res.status(200).send("Registered Successfully!")

    }catch(err){
        console.log(err)
        return res.status(500).send("internal server error");
    }
})

app.post('/login', async (req, res)=>{
    try {
        const {email, password} = req.body;
        let exist = await UserRegister.findOne({email});
        if(!exist){
            return res.status(400).send("User not found!");
        }
        if(exist.password !== password){
            return res.status(400).send("Password Invalid!");
        }
        let payload = {
            user:{
                id : exist.id
            }
        }
        jwt.sign(payload,'jwttoken',{expiresIn: 3600000},(err, token)=>{
            if(err) throw err;
            return res.json({token})
        })
        
    }catch(err){
        console.log(err)
        return res.status(500).send("internal server error");
    }
})

app.get('/myprofile', middleware, async(req, res)=>{
    try{
        let exist = await UserRegister.findById(req.user.id);
        if(!exist){
            return res.status(400).send("User not found")
        }
        res.json(exist);
    }catch(err){
        console.log(err)
        return res.status(500).send("Server error");
    }

})

app.listen(4000,()=>{
    console.log('Server Running...');
})