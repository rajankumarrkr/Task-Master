import api from './api';

const createProject = async (projectData) => {
  const response = await api.post('projects', projectData);
  return response.data;
};

const getProjects = async () => {
  const response = await api.get('projects');
  return response.data;
};

const deleteProject = async (id) => {
  const response = await api.delete(`projects/${id}`);
  return response.data;
};

const projectService = {
  createProject,
  getProjects,
  deleteProject,
};

export default projectService;
