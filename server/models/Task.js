const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true,
        trim: true
    },
    description : {
        type: String,
        trim: true
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium",
    },
    status: {
        type: String,
        enum: ["Todo", "In Progress", "Done"],
        default: "Todo",
    },
    dueDate: {
        type: Date,
    },
},{
    timestamps: true,
}
)

const Task = mongoose.model("Task",taskSchema)

module.exports = Task