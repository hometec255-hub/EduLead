import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, GraduationCap } from 'lucide-react';
import { registerUser, saveAuth } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const user = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });

      // Save auth data
      saveAuth(user.token, user);

      // Redirect based on role
      switch (user.role) {
        case 'student':
          navigate('/student/applications'); // Redirect students to applications page
          break;
        case 'mentor':
          navigate('/mentor');
          break;
        case 'institution':
          navigate('/institution');
          break;
        case 'admin':
          navigate('/admin');
          break;
        default:
          navigate('/student/applications');
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-background-overlay"></div>
        <div className="login-background-pattern"></div>
      </div>

      <div className="login-content">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <GraduationCap size={32} className="login-logo-icon" />
              <div className="login-logo-text">
                <h1>EduLead</h1>
                <p>Create Your Account</p>
              </div>
            </div>
            <p className="login-subtitle">
              Join thousands of women transforming their careers through education
            </p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            <div className="login-input-group">
              <label htmlFor="name" className="login-label">Full Name</label>
              <div className="login-input-container">
                <User size={20} className="login-input-icon" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="login-input"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <div className="login-input-group">
              <label htmlFor="email" className="login-label">Email Address</label>
              <div className="login-input-container">
                <Mail size={20} className="login-input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="login-input"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="login-input-group">
              <label htmlFor="role" className="login-label">Account Type</label>
              <div className="login-input-container">
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="login-input"
                  required
                >
                  <option value="student">Student</option>
                  <option value="mentor">Mentor</option>
                  <option value="institution">Institution</option>
                </select>
              </div>
            </div>

            <div className="login-input-group">
              <label htmlFor="password" className="login-label">Password</label>
              <div className="login-input-container">
                <Lock size={20} className="login-input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="login-input"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="login-password-toggle"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="login-input-group">
              <label htmlFor="confirmPassword" className="login-label">Confirm Password</label>
              <div className="login-input-container">
                <Lock size={20} className="login-input-icon" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="login-input"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="login-password-toggle"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="login-button"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="login-footer">
            <p>
              Already have an account?{' '}
              <a href="/login" className="login-link">
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;