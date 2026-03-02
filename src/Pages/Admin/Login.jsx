import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiArrowLeft,
  FiKey,
  FiLock,
  FiMail,
  FiShield,
  FiCheckCircle,
  FiEye,
  FiEyeOff,
} from 'react-icons/fi';
import loginBg from '../../Images/page-background.JPG';
import { useAuth } from '../../context/AuthContext';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
const ADMIN_LOGIN_ENDPOINT = '/users/login';
const ADMIN_FORGOT_PASSWORD_ENDPOINT = '/users/forgot-password';

const joinUrl = (base, endpoint) => `${base.replace(/\/+$/, '')}/${endpoint.replace(/^\/+/, '')}`;

const inputClasses =
  'w-full rounded-xl border border-slate-300 bg-white/90 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Separate error states for each field and a general one
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: '',
  });

  const [isForgotMode, setIsForgotMode] = useState(false);
  const [forgotMessage, setForgotMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotLoading, setIsForgotLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Password visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  // Clear field error when user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '', general: '' }));
  };

  // Validate login form
  const validateLogin = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  // Handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ email: '', password: '', general: '' });
    setForgotMessage('');

    if (!validateLogin()) return;

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
        // Handle 401 and other errors based on backend message
        const msg = data?.message?.toLowerCase() || '';
        if (res.status === 401) {
          if (msg.includes('not found') || msg.includes('email') || msg.includes('user')) {
            setErrors((prev) => ({ ...prev, email: 'Email not registered' }));
          } else if (msg.includes('password') || msg.includes('invalid')) {
            setErrors((prev) => ({ ...prev, password: 'Wrong password' }));
          } else {
            setErrors((prev) => ({ ...prev, general: data?.message || 'Login failed' }));
          }
        } else {
          setErrors((prev) => ({ ...prev, general: data?.message || 'Login failed' }));
        }
        return;
      }

      // Success: store token and user, redirect to admin
      login(data.token, data.user);
      navigate('/admin');
    } catch (error) {
      setErrors((prev) => ({ ...prev, general: 'Server not reachable' }));
    } finally {
      setIsLoading(false);
    }
  };

  // Validate forgot password form
  const validateForgot = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password) {
      newErrors.password = 'New password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  // Handle forgot password submission
  const handleForgotPassword = async () => {
    setErrors({ email: '', password: '', general: '' });
    setForgotMessage('');
    setResetSuccess(false);

    if (!validateForgot()) return;

    setIsForgotLoading(true);
    try {
      const res = await fetch(joinUrl(API_BASE_URL, ADMIN_FORGOT_PASSWORD_ENDPOINT), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email.trim(),
          newPassword: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors((prev) => ({ ...prev, general: data?.message || 'Password reset failed' }));
        return;
      }

      // Success
      setResetSuccess(true);
      setForgotMessage('Password updated! You can now login with your new password.');
      setTimeout(() => {
        setIsForgotMode(false);
        setFormData((prev) => ({ ...prev, password: '', confirmPassword: '' }));
        setForgotMessage('');
        setResetSuccess(false);
      }, 3000);
    } catch (error) {
      setErrors((prev) => ({ ...prev, general: 'Server not reachable' }));
    } finally {
      setIsForgotLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-slate-950 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="absolute inset-0 bg-slate-950/70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.25),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.2),transparent_30%)]" />

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-6xl grid-cols-1 items-center gap-8 px-4 py-8 lg:grid-cols-2 lg:px-8">
        {/* Left side - Info panel */}
        <section className="hidden text-white lg:block">
          <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100">
            <FiShield />
            Secure Admin Access
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-tight">Welcome to Dream Animex</h1>
          <p className="mt-4 max-w-md text-sm text-slate-200">
            Manage courses, enquiries and settings from a secure professional dashboard designed for daily operations.
          </p>
          <div className="mt-8 space-y-3 text-sm text-slate-200">
            <p className="rounded-xl border border-white/15 bg-white/5 px-4 py-3">
              Centralized course and lead management
            </p>
            <p className="rounded-xl border border-white/15 bg-white/5 px-4 py-3">
              Role-based protected admin routes
            </p>
            <p className="rounded-xl border border-white/15 bg-white/5 px-4 py-3">
              Quick updates with clean control panel
            </p>
          </div>
        </section>

        {/* Right side - Form */}
        <section className="mx-auto w-full max-w-md rounded-3xl border border-white/20 bg-white/88 p-6 shadow-[0_25px_60px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:p-8">
          <div className="mb-7">
            <h2 className="text-3xl font-bold text-slate-900">
              {isForgotMode ? (resetSuccess ? 'Success!' : 'Reset Password') : 'Admin Login'}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {isForgotMode
                ? resetSuccess
                  ? 'Your password has been updated.'
                  : 'Enter your email and a new password.'
                : 'Sign in to continue to your dashboard.'}
            </p>
          </div>

          <form onSubmit={isForgotMode ? (e) => e.preventDefault() : handleSubmit} noValidate>
            {/* Email field (always visible) */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FiMail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@animex.com"
                  className={`${inputClasses} pl-10 ${errors.email ? 'border-red-500' : ''}`}
                  disabled={isForgotMode && resetSuccess}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            {/* Login mode: password field with eye */}
            {!isForgotMode && (
              <div className="mb-6">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FiLock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className={`${inputClasses} pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
              </div>
            )}

            {/* Forgot mode: new password + confirm, with eye icons */}
            {isForgotMode && !resetSuccess && (
              <>
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    New Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiLock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Min. 6 characters"
                      className={`${inputClasses} pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showNewPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
                </div>

                <div className="mb-6">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Confirm New Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiCheckCircle className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter new password"
                      className={`${inputClasses} pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>}
                </div>
              </>
            )}

            {/* General error (e.g., server unreachable) */}
            {errors.general && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-medium text-red-700">
                {errors.general}
              </div>
            )}

            {/* Success message (forgot mode) */}
            {forgotMessage && (
              <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm font-medium text-emerald-700">
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-emerald-600" />
                  {forgotMessage}
                </div>
              </div>
            )}

            {/* Action buttons */}
            {!isForgotMode ? (
              <>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition ${
                    isLoading ? 'cursor-not-allowed opacity-70' : 'hover:bg-slate-800'
                  }`}
                >
                  <FiShield />
                  {isLoading ? 'Logging in...' : 'Login to Dashboard'}
                </button>

                <div className="mt-4 text-right">
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotMode(true);
                      setErrors({ email: '', password: '', general: '' });
                      setFormData((prev) => ({ ...prev, password: '', confirmPassword: '' }));
                    }}
                    className="inline-flex items-center gap-1 text-sm font-medium text-cyan-700 hover:text-cyan-900"
                  >
                    <FiKey />
                    Forgot Password?
                  </button>
                </div>
              </>
            ) : (
              !resetSuccess ? (
                <>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={isForgotLoading}
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition ${
                      isForgotLoading ? 'cursor-not-allowed opacity-70' : 'hover:bg-slate-800'
                    }`}
                  >
                    <FiKey />
                    {isForgotLoading ? 'Updating...' : 'Reset Password'}
                  </button>

                  <div className="mt-4 text-right">
                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotMode(false);
                        setErrors({});
                        setFormData((prev) => ({ ...prev, password: '', confirmPassword: '' }));
                      }}
                      className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900"
                    >
                      <FiArrowLeft />
                      Back to Login
                    </button>
                  </div>
                </>
              ) : (
                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotMode(false);
                      setFormData((prev) => ({ ...prev, password: '', confirmPassword: '' }));
                      setForgotMessage('');
                      setResetSuccess(false);
                    }}
                    className="inline-flex items-center gap-1 text-sm font-medium text-cyan-700 hover:text-cyan-900"
                  >
                    <FiArrowLeft />
                    Proceed to Login
                  </button>
                </div>
              )
            )}

            {/* Back to home link */}
            <div className="mt-6 text-center">
              <Link to="/" className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900">
                <FiArrowLeft />
                Back to Home
              </Link>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;