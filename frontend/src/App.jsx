import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProjectDetails from './pages/ProjectDetails';
import Navbar from './components/Navbar';

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Routes>
            <Route
              path="/"
              element={user ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/" />}
            />
            <Route
              path="/project/:id"
              element={user ? <ProjectDetails /> : <Navigate to="/login" />}
            />
          </Routes>
        </main>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#102A43',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
