import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { login, reset } from '../redux/slices/authSlice';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(login(userData));
  };

  return (
    <div className="flex justify-center items-center h-full min-h-[calc(100vh-160px)] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card w-full max-w-md p-6 sm:p-10 shadow-2xl"
      >
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-4xl font-extrabold mb-3 tracking-tight">Welcome Back</h1>
          <p className="text-gray-400 text-sm sm:text-base">Access your workspace and stay productive</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="you@example.com"
                className="neon-input pl-10"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="••••••••"
                className="neon-input pl-10"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="neon-button w-full flex justify-center items-center gap-2 mt-4"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-400 text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-brand-cyan hover:underline transition-all">
            Join now
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
