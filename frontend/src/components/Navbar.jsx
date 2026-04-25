import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../redux/slices/authSlice';
import { LogOut, Layout, User } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  return (
    <nav className="h-16 border-b border-white/10 bg-brand-dark/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold group">
          <div className="p-2 rounded-lg bg-brand-cyan/20 group-hover:bg-brand-cyan/30 transition-colors">
            <Layout className="w-6 h-6 text-brand-cyan" />
          </div>
          <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            TaskMaster
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-xs lg:text-sm text-gray-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                <User className="w-3.5 h-3.5" />
                <span className="max-w-[80px] lg:max-w-[150px] truncate">{user.name}</span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-all text-xs lg:text-sm font-medium px-2 py-1"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden xs:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-4">
              <Link to="/login" className="text-xs sm:text-sm font-medium text-gray-400 hover:text-white px-2">
                Login
              </Link>
              <Link
                to="/register"
                className="neon-button text-[10px] sm:text-xs py-1.5 px-3 sm:px-5"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
