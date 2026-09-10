const Task = require('../models/Task')
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        return res.status(200).json({
            tasks
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}
const getTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        if(!id) return res.status(400).json({message:"Task id not found"}) 
        const task = await Task.findById(id);
        if(!task) return res.status(404).json({message:"Task not found!"})
            return res.status(200).json(task);
    } catch (error) {
        return res.status(400).json({message:"Task not found!"})         
    }
}
const createTask = async (req, res) => {
    const body = req.body;
    try{
        const task = await Task.create(body);

        return res.status(201).json({
            "message": "Task created",
            task
        })
    }catch(e){
        const errors = e.errors;
        return res.status(400).json({
            "message":  errors[Object.keys(errors)[0]].message,
        })
    }

}
module.exports = {
    createTask, getTasks, getTaskById
}