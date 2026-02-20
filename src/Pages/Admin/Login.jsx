import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginBg from '../../Images/page-background.JPG'; // Same background as home
import { useAuth } from '../../context/AuthContext';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
const ADMIN_LOGIN_ENDPOINT =
  process.env.REACT_APP_ADMIN_LOGIN_ENDPOINT || '/users/admin/login';
const ADMIN_FORGOT_PASSWORD_ENDPOINT =
  process.env.REACT_APP_ADMIN_FORGOT_PASSWORD_ENDPOINT || '/users/admin/forgot-password';

const joinUrl = (base, endpoint) => {
  if (!base) return endpoint;
  return `${base.replace(/\/+$/, '')}/${endpoint.replace(/^\/+/, '')}`;
};

const getErrorMessage = (payload) => {
  if (typeof payload === 'string') return payload;
  if (payload?.message) return payload.message;
  if (payload?.msg) return payload.msg;
  if (payload?.error) return payload.error;
  if (payload?.detail) return payload.detail;
  if (Array.isArray(payload?.errors) && payload.errors.length > 0) {
    return payload.errors[0]?.message || payload.errors[0];
  }
  return 'Login failed. Please check your credentials.';
};

const getToken = (payload) =>
  payload?.token || payload?.accessToken || payload?.data?.token || payload?.data?.accessToken;

const getUser = (payload, email, role) =>
  payload?.user || payload?.data?.user || { name: 'Admin', email, role };

const parseResponseBody = async (response) => {
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return response.json().catch(() => ({}));
  }
  return response.text().catch(() => '');
};

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'admin', // Default role admin
  });
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [forgotMessage, setForgotMessage] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [isForgotLoading, setIsForgotLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
     }
    //  else if (formData.password.length < 10) {
    //   newErrors.password = 'Password must be at least 10 characters';
    // }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setForgotMessage('');
    setForgotError('');

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setShowErrors(true);
      return;
    }

    setIsLoading(true);

    try {
      const email = formData.email.trim();
      const response = await fetch(joinUrl(API_BASE_URL, ADMIN_LOGIN_ENDPOINT), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password: formData.password }),
      });
      const responseBody = await parseResponseBody(response);

      if (!response.ok) {
        const backendError = getErrorMessage(responseBody);
        if (backendError && backendError !== 'Login failed. Please check your credentials.') {
          setLoginError(backendError);
          return;
        }
        if (response.status === 401) {
          setLoginError('Invalid email or password.');
          return;
        }
        if (response.status === 404) {
          setLoginError('Login API not found. Please check backend URL and route.');
          return;
        }
        setLoginError(`Login failed (HTTP ${response.status}).`);
        return;
      }

      const token = getToken(responseBody);
      if (!token) {
        setLoginError('Login response did not include token.');
        return;
      }

      login(token, getUser(responseBody, email, formData.role));

      navigate('/admin');
    } catch (error) {
      setLoginError('Unable to connect to server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setForgotMessage('');
    setForgotError('');
    const email = formData.email.trim();

    if (!email) {
      setForgotError('Please enter your email first.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setForgotError('Please enter a valid email.');
      return;
    }

    if (!formData.password) {
      setForgotError('Please enter new password in password field.');
      return;
    }

    setIsForgotLoading(true);
    try {
      const response = await fetch(joinUrl(API_BASE_URL, ADMIN_FORGOT_PASSWORD_ENDPOINT), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword: formData.password }),
      });

      const responseBody = await parseResponseBody(response);
      if (!response.ok) {
        setForgotError(getErrorMessage(responseBody));
        return;
      }

      const message =
        (typeof responseBody === 'object' && (responseBody?.message || responseBody?.msg)) ||
        'Password reset successful. Please login with new password.';
      setForgotMessage(message);
    } catch (error) {
      setForgotError('Unable to connect to server. Please try again.');
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
          <h2 className="text-3xl font-bold text-cyan-900" style={{ fontFamily: 'Playwrite NZ Basic, cursive' }}>
            Admin Login
          </h2>
          <p className="text-gray-600 mt-2">Welcome back! Please login to continue</p>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          {['admin'].map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, role }))}
              className={`px-4 py-2 rounded-full capitalize transition-all ${
                formData.role === role
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@animex.com"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                showErrors && errors.email
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-red-500 focus:ring-red-100'
              }`}
            />
            {showErrors && errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                showErrors && errors.password
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-red-500 focus:ring-red-100'
              }`}
            />
            {showErrors && errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {loginError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {loginError}
            </div>
          )}

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-700">Remember me</span>
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={isForgotLoading}
              className={`text-sm hover:underline ${
                isForgotLoading
                  ? 'text-red-400 cursor-not-allowed'
                  : 'text-red-600 hover:text-red-800'
              }`}
            >
              {isForgotLoading ? 'Sending...' : 'Forgot Password?'}
            </button>
          </div>

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

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-red-600 text-white py-3 rounded-lg font-bold text-lg transition-all ${
              isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-red-700'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </button>

          <div className="text-center mt-4">
            <Link to="/" className="text-sm text-gray-600 hover:text-red-600">
              Back to Home
            </Link>
          </div>
        </form>

        <p className="mt-6 text-xs text-gray-500">
          Login endpoint: <span className="font-semibold">{ADMIN_LOGIN_ENDPOINT}</span>
        </p>
        <p className="mt-2 text-xs text-gray-500">
          Forgot endpoint: <span className="font-semibold">{ADMIN_FORGOT_PASSWORD_ENDPOINT}</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
