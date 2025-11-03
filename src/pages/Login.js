import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import './Home.css';
import { loginUser, saveAuth } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { token, user } = await loginUser({ email, password });
      saveAuth(token, user);
      login(user); // Update auth context

      // Redirect based on role
      const role = (user?.role || '').toLowerCase();
      const roleToPath = {
        student: '/student/applications', // Redirect students to applications page
        mentor: '/mentor',
        institution: '/institution',
        admin: '/admin',
      };
      const targetPath = roleToPath[role] || '/';
      navigate(targetPath, { replace: true });
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Background blobs */}
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>

      {/* Particles */}
      {[...Array(25)].map((_, i) => (
        <div key={i} className="particle" style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%` }}></div>
      ))}

      <div className="login-card">
        <div className="login-left">
          <h2>Hello, Friend!</h2>
          <p>Enter your details and start your journey. Futuristic design included!</p>
        </div>

        <div className="login-right">
          <div className="login-header">
            <div className="login-logo"><Sparkles color="white" size={26} /></div>
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Sign in to your account</p>
          </div>

          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#">Forgot password?</a>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'} <ArrowRight size={18} />
            </button>
          </form>

          <div className="divider">or</div>

          <button className="social-btn">Continue with Google</button>
          <button className="social-btn">Continue with GitHub</button>

          <div className="signup-link">
            Don't have an account? <a href="/register">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
