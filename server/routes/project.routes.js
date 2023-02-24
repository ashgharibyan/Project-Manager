const ProjectController = require("../controllers/project.controller");

module.exports = (app) => {
    app.get("/api/projects", ProjectController.getAllProjects)
    app.get("/api/project/:id", ProjectController.getOneProject)
    app.post("/api/project", ProjectController.createProject)
    app.put("/api/project/:id", ProjectController.updateProject)
    app.delete("/api/project/:id", ProjectController.deleteProject)
}