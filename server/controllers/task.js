const Task = require('../models/Task')
const checkId = async (req, res, next) =>{
    const id = req.params.id;
    if(!id) return res.status(400).json({message:"Task id not found"}) 
}
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            userId:req.user.userId
        });
        return res.status(200).json({
            tasks,
            length:tasks.length
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
        const task = await Task.findOne({
            _id:id, 
            userId:req.user.userId
        });
        if(!task) return res.status(404).json({message:"Task not found!"})
            return res.status(200).json(task);
    } catch (error) {
        return res.status(400).json({message:"Task not found!"})         
    }
}
const updateTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        if(!id) return res.status(400).json({"message":"Details not provided"})
        const updatedTask = await Task.findOneAndUpdate(
           { 
            _id: id,
            userId:req.user.userId
           },
           body,
            { returnDocument: 'after' }
        )
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        return res.status(200).json({task:updatedTask})
    } catch (error) {
        return res.status(400).json({message:"Task not found!"})         
    }
}
const createTask = async (req, res) => {
    const body = req.body;
    try{
        const task = await Task.create({
            ...body,
            userId: req.user.userId
        });

        return res.status(201).json({
            "message": "Task created",
            task
        })
    }catch(e){
        const errors = e.errors;
        return res.status(400).json({
            "message":  e,
        })
    }

}
const deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        if(!id) return res.status(400).json({"message":"Details not provided"})
        const task = await Task.findOneAndDelete({
            _id:id,
            userId: req.user.userId
        });    
        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }
        return res.status(200).json({"message":"Task Deleted Successfully"})
    }catch(e){
        const errors = e.errors;
        return res.status(400).json({
            "message": "Bad request",
        })
    }
}
module.exports = {
    createTask, getTasks, getTaskById, updateTaskById, deleteTask
}