import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks, createTask, updateTask, deleteTask, reset } from '../redux/slices/taskSlice';
import { ArrowLeft, Plus, CheckCircle2, Circle, Trash2, Calendar, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [taskTitle, setTaskTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const { projects } = useSelector((state) => state.projects);
  const { tasks, isLoading, isError, message } = useSelector((state) => state.tasks);

  const project = projects.find((p) => p._id === id);

  useEffect(() => {
    dispatch(getTasks(id));

    return () => {
      dispatch(reset());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskTitle) {
      toast.error('Task title is required');
      return;
    }
    dispatch(createTask({ projectId: id, task: { title: taskTitle, dueDate } }));
    setTaskTitle('');
    setDueDate('');
    toast.success('Task added');
  };

  const toggleComplete = (task) => {
    dispatch(updateTask({ id: task._id, data: { completed: !task.completed } }));
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Delete this task?')) {
      dispatch(deleteTask(taskId));
      toast.success('Task removed');
    }
  };

  const completedTasks = tasks.filter((t) => t.completed).length;
  const progress = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  if (!project && !isLoading) {
    return (
      <div className="text-center py-24 glass-card max-w-lg mx-auto">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Project not found</h2>
        <p className="text-gray-400 mb-8">The project you're looking for doesn't exist or you don't have access.</p>
        <Link to="/" className="neon-button inline-block">Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-fit group text-sm sm:text-base">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </Link>

      <div className="glass-card p-6 sm:p-10 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-10 hidden sm:block">
          <Loader2 className="w-24 h-24 text-brand-cyan" />
        </div>
        
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 leading-tight">{project.title}</h1>
              <p className="text-gray-400 leading-relaxed max-w-2xl text-sm sm:text-base">{project.description}</p>
            </div>
            <div className="bg-brand-cyan/10 px-4 py-2 rounded-xl border border-brand-cyan/20 flex flex-col items-center min-w-[100px]">
              <span className="text-2xl font-bold text-brand-cyan">{progress}%</span>
              <span className="text-[10px] uppercase tracking-wider text-gray-400">Progress</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-2">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-brand-cyan shadow-[0_0_10px_rgba(0,229,255,0.5)]" 
            />
          </div>
          <div className="flex justify-between text-[10px] text-gray-500 font-medium">
            <span>{completedTasks} COMPLETED</span>
            <span>{tasks.length - completedTasks} REMAINING</span>
          </div>
        </div>
      </div>

      <div className="glass-card p-6 sm:p-8">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          Workspace Tasks
          <span className="text-xs font-normal text-gray-500 bg-white/10 px-2.5 py-1 rounded-full">
            {tasks.length} Total
          </span>
        </h2>

        <form onSubmit={handleAddTask} className="flex flex-col gap-4 mb-10">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              className="neon-input flex-1 py-3.5"
              placeholder="What's the next step?"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <div className="flex gap-3">
              <input
                type="date"
                className="neon-input flex-1 sm:w-48 py-3.5"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
              <button type="submit" className="neon-button px-6 sm:px-8 py-3.5 flex items-center justify-center">
                <Plus className="w-5 h-5 sm:mr-1" />
                <span className="hidden sm:inline">Add Task</span>
              </button>
            </div>
          </div>
        </form>

        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {tasks.map((task) => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`flex items-center justify-between p-5 rounded-xl border border-white/5 transition-all
                  ${task.completed ? 'bg-white/5 opacity-60' : 'bg-white/[0.02] hover:bg-white/[0.04]'}`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <button
                    onClick={() => toggleComplete(task)}
                    className={`transition-colors ${task.completed ? 'text-brand-success' : 'text-gray-500 hover:text-brand-cyan'}`}
                  >
                    {task.completed ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                  </button>
                  <div>
                    <h4 className={`font-medium ${task.completed ? 'line-through' : ''}`}>
                      {task.title}
                    </h4>
                    {task.dueDate && (
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        <Calendar className="w-3 h-3" />
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {!isLoading && tasks.length === 0 && (
            <div className="text-center py-10 text-gray-500 italic">
              No tasks yet. Ready to grow?
            </div>
          )}

          {isLoading && (
            <div className="flex justify-center py-4">
              <Loader2 className="w-6 h-6 animate-spin text-brand-cyan" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
