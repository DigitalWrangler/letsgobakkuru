const express = require("express");
const projectLogger = require("../loggers/logger");

function compProj() {
    const router = express.Router();

    // POST: Special case for "Proj is POKED!"
    router.post("/poke", (req, res) => {
        res.send("Proj is POKED!");
    });

    // POST: Create a new project
    router.post("/", (req, res) => {
        try {
            res.send("Creating a new project");
            projectLogger.info("Creating a new project");
        } catch (error) {
            projectLogger.error(`Error while creating a new project: ${error.message}`);
            res.status(500).send("Internal Server Error");
        }
    });

    // GET: Retrieve all projects
    router.get("/", (req, res) => {
        try {
            res.send("Retrieving all projects");
            projectLogger.info("Retrieving all projects");
        } catch (error) {
            projectLogger.error(`Error while retrieving all projects: ${error.message}`);
            res.status(500).send("Internal Server Error");
        }
    });

    // GET: Retrieve a project by ID
    router.get("/:projectId", (req, res) => {
        try {
            const { projectId } = req.params;
            res.send(`Retrieving project with ID: ${projectId}`);
            projectLogger.info(`Retrieving project with ID: ${projectId}`);
        } catch (error) {
            projectLogger.error(`Error while retrieving project by ID: ${error.message}`);
            res.status(500).send("Internal Server Error");
        }
    });

    // PUT: Update a project by ID
    router.put("/:projectId", (req, res) => {
        try {
            const { projectId } = req.params;
            res.send(`Updating project with ID: ${projectId}`);
            projectLogger.info(`Updating project with ID: ${projectId}`);
        } catch (error) {
            projectLogger.error(`Error while updating project: ${error.message}`);
            res.status(500).send("Internal Server Error");
        }
    });

    // DELETE: Delete a project by ID
    router.delete("/:projectId", (req, res) => {
        try {
            const { projectId } = req.params;
            res.send(`Deleting project with ID: ${projectId}`);
            projectLogger.info(`Deleting project with ID: ${projectId}`);
        } catch (error) {
            projectLogger.error(`Error while deleting project: ${error.message}`);
            res.status(500).send("Internal Server Error");
        }
    });

    return router;
}

module.exports = compProj;
