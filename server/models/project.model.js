const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    project: {
        type: String,
        required: [true, "Project name is required!"], 
        minLength: [3, "Project name must be at least 3 characters long!"]  
    },
    dueDate: {
        type: Date,
        required: [true, "Due Date is required"]
    },
    status: { // -1: Backlog, 0: In Progress, 1: Completed
        type: Number,
        default: -1
    }
}, {timestamps:true})

module.exports.Project = mongoose.model('Project', ProjectSchema); 

