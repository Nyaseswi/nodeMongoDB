const Employee = require('../models/Employee')

const createEmployee = async(request,response)=>{
    try{
        const {name,email,phone,city} = request.body

        const employee = new Employee({
            name,
            email,
            phone,
            city
        })
        await employee.save()
        response.status(201).json(employee)
    }catch(error){
        console.log("there is an error:",error)
        response.status(500).json({
            message:'Server error'
        })

    }
}

module.exports = {createEmployee}