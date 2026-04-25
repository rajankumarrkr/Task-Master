import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { getProjects, createProject, deleteProject, reset } from '../redux/slices/projectSlice';
import { Plus, Trash2, Folder, ExternalLink, Calendar, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '' });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { projects, isLoading, isError, message } = useSelector(
    (state) => state.projects
  );

  useEffect(() => {
    dispatch(getProjects());
    // ...
  }, [dispatch]);

  // Handle toast in a separate effect to avoid infinite loops if isError is toggled
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProject.title.trim() || !newProject.description.trim()) {
      toast.error('Please fill all fields');
      return;
    }
    dispatch(createProject(newProject));
    setIsModalOpen(false);
    setNewProject({ title: '', description: '' });
    toast.success('Project created successfully!');
  };

  const handleDelete = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this project?')) {
      dispatch(deleteProject(id));
      toast.success('Project removed');
    }
  };

  return (
    <div className="space-y-6 sm:space-y-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pb-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Hi, <span className="text-brand-cyan">{user?.name?.split(' ')[0]}</span>.
          </h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base max-w-md">
            You have {projects.length} active project{projects.length !== 1 ? 's' : ''} to manage today.
          </p>
        </motion.div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="neon-button w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-8 text-sm sm:text-base active:opacity-80"
        >
          <Plus className="w-5 h-5" />
          Create New Project
        </button>
      </div>

      {isLoading && projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Loader2 className="w-10 h-10 text-brand-cyan animate-spin" />
          <p className="text-gray-500 animate-pulse">Loading your workspace...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          <AnimatePresence>
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <Link to={`/project/${project._id}`}>
                  <div className="glass-card p-6 h-full flex flex-col justify-between hover:translate-y-[-4px] cursor-pointer">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-lg bg-brand-cyan/10 text-brand-cyan group-hover:bg-brand-cyan group-hover:text-brand-dark transition-all duration-500">
                          <Folder className="w-6 h-6" />
                        </div>
                        <button
                          onClick={(e) => handleDelete(project._id, e)}
                          className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-brand-cyan transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-3 mb-6">
                        {project.description}
                      </p>
                    </div>
                    
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(project.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1 group-hover:text-brand-cyan transition-colors">
                        View Tasks <ExternalLink className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {projects.length === 0 && !isLoading && (
        <div className="text-center py-20 glass-card">
          <Folder className="w-16 h-16 text-gray-700 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">No projects found</h2>
          <p className="text-gray-400 mb-6">Create your first project to get started</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="neon-button"
          >
            Start Project
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-dark/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card w-full max-w-md p-8 bg-brand-deep border-white/20 shadow-2xl"
          >
            <h2 className="text-2xl font-bold mb-6">New Project</h2>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Title</label>
                <input
                  type="text"
                  className="neon-input"
                  placeholder="App Design"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                <textarea
                  className="neon-input min-h-[100px] resize-none"
                  placeholder="Design a modern UI for a task manager app..."
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  required
                />
              </div>
              <div className="flex gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 rounded-xl text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button type="submit" className="neon-button flex-1">
                  Create
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
