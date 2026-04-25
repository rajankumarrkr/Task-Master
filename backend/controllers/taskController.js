const Task = require('../models/Task');
const Project = require('../models/Project');

const getTasks = async (req, res) => {
  const tasks = await Task.find({ project: req.params.projectId });
  res.status(200).json(tasks);
};

const createTask = async (req, res) => {
  const { title, dueDate } = req.body;

  if (!title) {
    res.status(400);
    throw new Error('Please add a task title');
  }

  const task = await Task.create({
    title,
    dueDate,
    project: req.params.projectId,
  });

  res.status(201).json(task);
};

const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedTask);
};

const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  await task.deleteOne();

  res.status(200).json({ id: req.params.id });
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
