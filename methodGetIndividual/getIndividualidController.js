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

const getEmployees = async(request,response)=>{
    try{
        const employees = await Employee.find()
        response.status(200).json(employees)
    }catch(error){
        console.log("There is an error:",error)
        response.status(500).json({
            message:"server error"
        })}}

const singleEmployee = async(request,response)=>{
    try{
        const employee = await Employee.findById(request.params.id)
        if(!employee){
            return response.status(404).json({message:"Employee not found"})
        }
        response.status(200).json(employee)
    }catch(error){
        console.error("there is an error",error)
        response.status(500).json({
            message:"server error"
        })
    }
}

module.exports = {createEmployee,getEmployees,singleEmployee}