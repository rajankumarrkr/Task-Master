const Project = require('../models/Project');
const Task = require('../models/Task');

const getProjects = async (req, res) => {
  const projects = await Project.find({ owner: req.user.id });
  res.status(200).json(projects);
};

const createProject = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const project = await Project.create({
    title,
    description,
    owner: req.user.id,
  });

  res.status(201).json(project);
};

const deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  // Check for user
  if (project.owner.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  // Delete associated tasks
  await Task.deleteMany({ project: req.params.id });
  await project.deleteOne();

  res.status(200).json({ id: req.params.id });
};

module.exports = {
  getProjects,
  createProject,
  deleteProject,
};
