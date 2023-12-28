const express = require('express')
const jwt = require('jsonwebtoken')
const dotEnv = require('dotenv')

const app = express()
const PORT = 4000

app.use(express.json())
dotEnv.config()
const secretkey = process.env.mysecretkey

const users = [{
    id:"1",
    username:'Mahesh',
    password:'Mahesh',
    isAdmin:true
},{
    id:"2",
    username:'Suresh',
    password:'Suresh',
    isAdmin:false
}
]

app.post('/api/login',(request,response)=>{
    const {username,password} = request.body

    const user = users.find((person)=>{
        return person.username === username && person.password === password
    })
    if(user){
        const accessToken = jwt.sign({
            id:user.id, isAdmin:user.isAdmin
        },secretkey)
        response.json({
            username:user.username,
            isAdmin:user.isAdmin,
            accessToken
        })
    }else{
        response.status(401).json('user credentials not match')
    }

})



app.listen(PORT,()=>{
    console.log(`Server started and running ${PORT}`)
})