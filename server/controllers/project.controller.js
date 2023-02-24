// Importing the Project model 
const {Project}  = require('../models/project.model'); 

// Get all Projects function
module.exports.getAllProjects = (req, res) => {
    Project.find()
        .then(allProjects => {
            res.json(allProjects)
        })
        .catch(err => res.status(400).json(err))
}

// Get one by id function
module.exports.getOneProject = (req, res) => {
    Project.findOne({_id: req.params.id})
        .then(oneProject => {
            res.json(oneProject)
        })
        .catch(err => res.status(400).json(err))
}

// Create function
module.exports.createProject = (req, res) => {
    const {project, dueDate, status} = req.body
    Project.create({
        project,
        dueDate,
        status
    })
        .then(newProject => {
            res.json(newProject)
        })
        .catch(err => res.status(400).json(err)) //! take care of validations in the client side 
}

// Update function
module.exports.updateProject = (req, res) => {
    Project.updateOne(
        {_id: req.params.id},
        req.body,
        {new: true})
        .then(updatedProject => {
            res.json(updatedProject)
        })
        .catch(err => res.status(400).json(err))
}

// Delete function
module.exports.deleteProject = (req, res) => {
    Project.deleteOne({_id: req.params.id})
        .then(deletedProject => {
            res.json(deletedProject)
        })
        .catch(err => res.status(400).json(err))
}