import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginBg from '../../Images/page-background.JPG';
import { useAuth } from '../../context/AuthContext';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
const ADMIN_LOGIN_ENDPOINT = '/users/login';
const ADMIN_FORGOT_PASSWORD_ENDPOINT = '/users/forgot-password';

const joinUrl = (base, endpoint) =>
  `${base.replace(/\/+$/, '')}/${endpoint.replace(/^\/+/, '')}`;

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isForgotMode, setIsForgotMode] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [forgotMessage, setForgotMessage] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotLoading, setIsForgotLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ================= LOGIN =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setForgotError('');
    setForgotMessage('');

    if (!formData.email || !formData.password) {
      setLoginError('Email and password are required');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(joinUrl(API_BASE_URL, ADMIN_LOGIN_ENDPOINT), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoginError(data?.message || 'Invalid email or password');
        return;
      }

      login(data.token, data.user);
      navigate('/admin');
    } catch {
      setLoginError('Server not reachable');
    } finally {
      setIsLoading(false);
    }
  };

  // ================= FORGOT PASSWORD =================
  const handleForgotPassword = async () => {
    setForgotError('');
    setForgotMessage('');

    if (!formData.email || !formData.password) {
      setForgotError('Email and new password are required');
      return;
    }

    setIsForgotLoading(true);
    try {
      const res = await fetch(joinUrl(API_BASE_URL, ADMIN_FORGOT_PASSWORD_ENDPOINT), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email.trim(),
          newPassword: formData.password, // SAME INPUT USED AS NEW PASSWORD
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setForgotError(data?.message || 'Password reset failed');
        return;
      }

      setForgotMessage('Password updated. Now login with new password.');
      setIsForgotMode(false);
      setFormData(prev => ({ ...prev, password: '' }));
    } catch {
      setForgotError('Server not reachable');
    } finally {
      setIsForgotLoading(false);
    }
  };

  return (
    <div
      className="w-full min-h-screen bg-fixed bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl w-[90%] max-w-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-cyan-900">
            Admin Login
          </h2>
          <p className="text-gray-600 mt-2">
            {isForgotMode
              ? 'Set your new password'
              : 'Welcome back! Please login to continue'}
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* EMAIL */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@animex.com"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:border-red-500 focus:ring-red-100"
            />
          </div>

          {/* PASSWORD / NEW PASSWORD (SAME INPUT) */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {isForgotMode ? 'New Password' : 'Password'}{' '}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={isForgotMode ? 'Enter new password' : 'Enter password'}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:border-red-500 focus:ring-red-100"
            />
          </div>

          {/* ERRORS / MESSAGES */}
          {loginError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {loginError}
            </div>
          )}

          {forgotError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {forgotError}
            </div>
          )}

          {forgotMessage && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              {forgotMessage}
            </div>
          )}

          {/* BUTTONS */}
          {!isForgotMode ? (
            <>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-red-600 text-white py-3 rounded-lg font-bold text-lg ${
                  isLoading ? 'opacity-70' : 'hover:bg-red-700'
                }`}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>

              <div className="text-right mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotMode(true);
                    setLoginError('');
                  }}
                  className="text-sm text-red-600 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={isForgotLoading}
                className={`w-full bg-gray-800 text-white py-3 rounded-lg font-bold ${
                  isForgotLoading ? 'opacity-70' : 'hover:bg-black'
                }`}
              >
                {isForgotLoading ? 'Updating...' : 'Reset Password'}
              </button>

              <div className="text-right mt-4">
                <button
                  type="button"
                  onClick={() => setIsForgotMode(false)}
                  className="text-sm text-gray-600 hover:underline"
                >
                  Back to Login
                </button>
              </div>
            </>
          )}

          <div className="text-center mt-6">
            <Link to="/" className="text-sm text-gray-600 hover:text-red-600">
              Back to Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;