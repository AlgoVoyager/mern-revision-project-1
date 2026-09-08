const getTasks = (req, res) => {
    res.json([{
        "title": "Learn Express",
        "priority": "High"
    }])
}
const createTask = (req, res) => {
    res.status(201).json({
        "message": "Task created",
        "task": req.body
    })
}
module.exports = {
    createTask, getTasks
}