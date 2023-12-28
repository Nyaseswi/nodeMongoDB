const express = require('express')
const dotEnv =require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const employeeRoutes = require('./routes/employeeRoutes')
// requiring ejs 
const ejs = require('ejs')

// express is assigned to app variable name 
const app = express()
const PORT = process.env.PORT || 5000

// registering ejs 
app.set('view engine','ejs')

dotEnv.config()
app.use(bodyParser.json())

//client side rendering 
app.get('/mango',(request,response)=>{
    response.json({
        fruit:'mango'
    })
})

// server side rendering 
app.get('/grapes',(request,response)=>{
    // response.send("<h1>This is grapes fruit")
    response.render('samplePage')
})

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB connected successfully")
})
.catch((error)=>{
    console.log(`${error}`)
})

app.use('/employees',employeeRoutes)

app.listen(PORT,()=>{
    console.log(`server started sucessfully & running at ${PORT}`)
})
