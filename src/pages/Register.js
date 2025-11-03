import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles, Users } from 'lucide-react';
import './Home.css';
import { registerUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const { token, user } = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });

      // Redirect based on role
      const role = (user?.role || '').toLowerCase();
      const roleToPath = {
        student: '/student/applications',
        mentor: '/mentor',
        institution: '/institution',
        admin: '/admin',
      };
      const targetPath = roleToPath[role] || '/';
      navigate(targetPath, { replace: true });
    } catch (err) {
      setError(err.message || 'Registration failed');
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
          <h2>Join Us Today!</h2>
          <p>Create your account and start your educational journey. The future of learning awaits!</p>
        </div>

        <div className="login-right">
          <div className="login-header">
            <div className="login-logo"><Sparkles color="white" size={26} /></div>
            <h1 className="login-title">Create Account</h1>
            <p className="login-subtitle">Sign up to get started</p>
          </div>

          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-wrapper">
                <User className="input-icon" size={18} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Role</label>
              <div className="input-wrapper">
                <Users className="input-icon" size={18} />
                <input
                  type="text"
                  value="🎓 Student"
                  className="form-input"
                  disabled
                  style={{ 
                    backgroundColor: 'rgba(255,255,255,0.05)', 
                    color: '#94a3b8',
                    cursor: 'not-allowed'
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Create a password"
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

            <div className="form-group">
              <label>Confirm Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={18} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="options">
              <label>
                <input type="checkbox" required /> I agree to the Terms of Service and Privacy Policy
              </label>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'} <ArrowRight size={18} />
            </button>
          </form>

          <div className="divider">or</div>

          <button className="social-btn">Continue with Google</button>
          <button className="social-btn">Continue with GitHub</button>

          <div className="signup-link">
            Already have an account? <a href="/login">Sign in</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;