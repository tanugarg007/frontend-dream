import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiArrowLeft,
  FiLock,
  FiMail,
  FiShield,
  FiEye,
  FiEyeOff,
  FiKey,
  FiCheckCircle,
  FiX,
  FiRefreshCw,
} from 'react-icons/fi';
import loginBg from '../../Images/page-background.JPG';
import { useAuth } from '../../context/AuthContext';
import { serverUrl } from '../../url/url';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || serverUrl;
const ADMIN_LOGIN_ENDPOINT = '/users/login';
const ADMIN_FORGOT_PASSWORD_ENDPOINT = '/users/forgot-password';

const joinUrl = (base, endpoint) => `${base.replace(/\/+$/, '')}/${endpoint.replace(/^\/+/, '')}`;

const inputClasses =
  'w-full rounded-xl border border-slate-300 bg-white/90 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100';

const PASSWORD_POLICY_HELPER =
  'At least 8 characters with uppercase, lowercase, number and special character.';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotStep, setForgotStep] = useState('request');
  const [forgotData, setForgotData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [forgotErrors, setForgotErrors] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: '',
    general: '',
  });
  const [forgotMessage, setForgotMessage] = useState('');
  const [isForgotLoading, setIsForgotLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resendIn, setResendIn] = useState(0);

  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    if (!resendIn) return undefined;
    const intervalId = setInterval(() => {
      setResendIn((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [resendIn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '', general: '' }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ email: '', password: '', general: '' });

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
        const msg = data?.message?.toLowerCase() || '';
        const serverFieldErrors = data?.fieldErrors || {};

        if (serverFieldErrors.email || serverFieldErrors.password) {
          if (serverFieldErrors.password) {
            setErrors((prev) => ({
              ...prev,
              email: '',
              password: 'Wrong password',
              general: '',
            }));
            return;
          }

          setErrors((prev) => ({
            ...prev,
            email: '',
            password: '',
            general: 'Invalid email or password',
          }));
          return;
        }

        if (res.status === 401) {
          if (msg.includes('wrong password') || msg.includes('incorrect password')) {
            setErrors((prev) => ({ ...prev, password: 'Wrong password' }));
          } else {
            setErrors((prev) => ({ ...prev, general: 'Invalid email or password' }));
          }
        } else {
          setErrors((prev) => ({ ...prev, general: data?.message || 'Login failed' }));
        }
        return;
      }

      localStorage.setItem('token', data.token);
      login(data.token, data.user);
      navigate('/admin');
    } catch (_error) {
      setErrors((prev) => ({ ...prev, general: 'Server not reachable' }));
    } finally {
      setIsLoading(false);
    }
  };

  const resetForgotState = () => {
    setForgotStep('request');
    setForgotData({
      email: formData.email.trim(),
      otp: '',
      newPassword: '',
      confirmPassword: '',
    });
    setForgotErrors({
      email: '',
      otp: '',
      newPassword: '',
      confirmPassword: '',
      general: '',
    });
    setForgotMessage('');
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setResendIn(0);
  };

  const openForgotModal = () => {
    resetForgotState();
    setIsForgotModalOpen(true);
  };

  const closeForgotModal = () => {
    setIsForgotModalOpen(false);
    setIsForgotLoading(false);
    setResendIn(0);
  };

  const handleForgotChange = (e) => {
    const { name, value } = e.target;
    setForgotData((prev) => ({ ...prev, [name]: value }));
    setForgotErrors((prev) => ({ ...prev, [name]: '', general: '' }));
    setForgotMessage('');
  };

  const validateForgotRequest = () => {
    const nextErrors = {
      email: '',
      otp: '',
      newPassword: '',
      confirmPassword: '',
      general: '',
    };

    if (!forgotData.email.trim()) {
      nextErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(forgotData.email.trim())) {
      nextErrors.email = 'Enter a valid email address';
    }

    setForgotErrors(nextErrors);
    return !nextErrors.email;
  };

  const validateForgotVerify = () => {
    const nextErrors = {
      email: '',
      otp: '',
      newPassword: '',
      confirmPassword: '',
      general: '',
    };

    if (!forgotData.email.trim()) nextErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(forgotData.email.trim())) nextErrors.email = 'Enter a valid email address';

    if (!forgotData.otp.trim()) nextErrors.otp = 'Verification code is required';
    else if (!/^\d{6}$/.test(forgotData.otp.trim())) nextErrors.otp = 'Enter a valid 6-digit code';

    if (!forgotData.newPassword) nextErrors.newPassword = 'New password is required';
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(forgotData.newPassword)) {
      nextErrors.newPassword = PASSWORD_POLICY_HELPER;
    }

    if (!forgotData.confirmPassword) nextErrors.confirmPassword = 'Confirm password is required';
    else if (forgotData.newPassword !== forgotData.confirmPassword) nextErrors.confirmPassword = 'Passwords do not match';

    setForgotErrors(nextErrors);
    return !nextErrors.email && !nextErrors.otp && !nextErrors.newPassword && !nextErrors.confirmPassword;
  };

  const requestVerificationCode = async (e) => {
    e.preventDefault();
    if (!validateForgotRequest()) return;

    setIsForgotLoading(true);
    setForgotMessage('');
    setForgotErrors((prev) => ({ ...prev, general: '' }));

    try {
      const res = await fetch(joinUrl(API_BASE_URL, ADMIN_FORGOT_PASSWORD_ENDPOINT), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'request',
          email: forgotData.email.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setForgotErrors((prev) => ({ ...prev, general: data?.message || 'Unable to generate verification code' }));
        if (Number.isFinite(data?.resendAfterSeconds)) setResendIn(data.resendAfterSeconds);
        return;
      }

      setForgotStep('verify');
      setForgotMessage(data?.message || 'Verification code sent.');
      setResendIn(Number.isFinite(data?.resendAfterSeconds) ? data.resendAfterSeconds : 60);
    } catch (_error) {
      setForgotErrors((prev) => ({ ...prev, general: 'Server not reachable' }));
    } finally {
      setIsForgotLoading(false);
    }
  };

  const verifyAndResetPassword = async (e) => {
    e.preventDefault();
    if (!validateForgotVerify()) return;

    setIsForgotLoading(true);
    setForgotMessage('');
    setForgotErrors((prev) => ({ ...prev, general: '' }));

    try {
      const res = await fetch(joinUrl(API_BASE_URL, ADMIN_FORGOT_PASSWORD_ENDPOINT), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify',
          email: forgotData.email.trim(),
          otp: forgotData.otp.trim(),
          newPassword: forgotData.newPassword,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setForgotErrors((prev) => ({ ...prev, general: data?.message || 'Password reset failed' }));
        return;
      }

      setForgotMessage(data?.message || 'Password updated successfully. You can now login.');
      setForgotData((prev) => ({
        ...prev,
        otp: '',
        newPassword: '',
        confirmPassword: '',
      }));
      setFormData((prev) => ({ ...prev, email: forgotData.email.trim() }));
    } catch (_error) {
      setForgotErrors((prev) => ({ ...prev, general: 'Server not reachable' }));
    } finally {
      setIsForgotLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (resendIn > 0 || isForgotLoading) return;
    await requestVerificationCode({ preventDefault: () => {} });
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-slate-950 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="absolute inset-0 bg-slate-950/70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.25),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.2),transparent_30%)]" />

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-6xl grid-cols-1 items-center gap-8 px-4 py-8 lg:grid-cols-2 lg:px-8">
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
            <p className="rounded-xl border border-white/15 bg-white/5 px-4 py-3">Centralized course and lead management</p>
            <p className="rounded-xl border border-white/15 bg-white/5 px-4 py-3">Role-based protected admin routes</p>
            <p className="rounded-xl border border-white/15 bg-white/5 px-4 py-3">Quick updates with clean control panel</p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-md rounded-3xl border border-white/20 bg-white/88 p-6 shadow-[0_25px_60px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:p-8">
          <div className="mb-7">
            <h2 className="text-3xl font-bold text-white">Admin Login</h2>
            <p className="mt-2 text-sm text-slate-600">Sign in to continue to your dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
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
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

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

            {errors.general && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-medium text-red-700">
                {errors.general}
              </div>
            )}

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
                onClick={openForgotModal}
                className="inline-flex items-center gap-1 text-sm font-medium text-cyan-700 hover:text-cyan-900"
              >
                <FiKey />
                Secure Password Reset
              </button>
            </div>

            <div className="mt-6 text-center">
              <Link to="/" className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900">
                <FiArrowLeft />
                Back to Home
              </Link>
            </div>
          </form>
        </section>
      </div>

      {isForgotModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
          <button
            type="button"
            aria-label="Close forgot password dialog"
            onClick={closeForgotModal}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_80px_rgba(2,6,23,0.4)]">
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-900 px-6 py-5 text-white">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold">Secure Password Reset</h3>
                  <p className="mt-1 text-sm text-slate-200">Step {forgotStep === 'request' ? '1 of 2' : '2 of 2'}: verification required.</p>
                </div>
                <button
                  type="button"
                  onClick={closeForgotModal}
                  className="rounded-lg border border-white/25 bg-white/10 p-2 text-white transition hover:bg-white/20"
                  aria-label="Close"
                >
                  <FiX />
                </button>
              </div>
            </div>

            {forgotStep === 'request' ? (
              <form onSubmit={requestVerificationCode} className="space-y-4 px-6 py-6">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Admin Email</label>
                  <div className="relative">
                    <FiMail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      value={forgotData.email}
                      onChange={handleForgotChange}
                      placeholder="admin@animex.com"
                      className={`w-full rounded-xl border bg-white px-10 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-100 ${
                        forgotErrors.email ? 'border-red-500' : 'border-slate-300 focus:border-cyan-500'
                      }`}
                    />
                  </div>
                  {forgotErrors.email && <p className="mt-1 text-xs text-red-600">{forgotErrors.email}</p>}
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
                  A 6-digit verification code will be required before password update.
                </div>

                {forgotErrors.general && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
                    {forgotErrors.general}
                  </div>
                )}

                {forgotMessage && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                    {forgotMessage}
                  </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeForgotModal}
                    className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isForgotLoading}
                    className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition ${
                      isForgotLoading
                        ? 'cursor-not-allowed bg-slate-500'
                        : 'bg-gradient-to-r from-slate-900 to-cyan-700 hover:from-slate-800 hover:to-cyan-600'
                    }`}
                  >
                    <FiKey />
                    {isForgotLoading ? 'Generating...' : 'Send Verification Code'}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={verifyAndResetPassword} className="space-y-4 px-6 py-6">
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
                  Reset for: <span className="font-semibold text-slate-800">{forgotData.email}</span>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Verification Code</label>
                  <div className="relative">
                    <FiShield className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      name="otp"
                      value={forgotData.otp}
                      onChange={handleForgotChange}
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                      className={`w-full rounded-xl border bg-white px-10 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-100 ${
                        forgotErrors.otp ? 'border-red-500' : 'border-slate-300 focus:border-cyan-500'
                      }`}
                    />
                  </div>
                  {forgotErrors.otp && <p className="mt-1 text-xs text-red-600">{forgotErrors.otp}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">New Password</label>
                  <div className="relative">
                    <FiKey className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      name="newPassword"
                      value={forgotData.newPassword}
                      onChange={handleForgotChange}
                      placeholder="Create strong password"
                      className={`w-full rounded-xl border bg-white px-10 py-3 pr-11 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-100 ${
                        forgotErrors.newPassword ? 'border-red-500' : 'border-slate-300 focus:border-cyan-500'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                    >
                      {showNewPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{PASSWORD_POLICY_HELPER}</p>
                  {forgotErrors.newPassword && <p className="mt-1 text-xs text-red-600">{forgotErrors.newPassword}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Confirm Password</label>
                  <div className="relative">
                    <FiCheckCircle className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={forgotData.confirmPassword}
                      onChange={handleForgotChange}
                      placeholder="Re-enter new password"
                      className={`w-full rounded-xl border bg-white px-10 py-3 pr-11 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-100 ${
                        forgotErrors.confirmPassword ? 'border-red-500' : 'border-slate-300 focus:border-cyan-500'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                    >
                      {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {forgotErrors.confirmPassword && <p className="mt-1 text-xs text-red-600">{forgotErrors.confirmPassword}</p>}
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={resendIn > 0 || isForgotLoading}
                    className={`inline-flex items-center gap-1 text-xs font-semibold ${
                      resendIn > 0 || isForgotLoading
                        ? 'cursor-not-allowed text-slate-400'
                        : 'text-cyan-700 hover:text-cyan-900'
                    }`}
                  >
                    <FiRefreshCw size={12} />
                    {resendIn > 0 ? `Resend in ${resendIn}s` : 'Resend code'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setForgotStep('request')}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Change email
                  </button>
                </div>

                {forgotErrors.general && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
                    {forgotErrors.general}
                  </div>
                )}

                {forgotMessage && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                    {forgotMessage}
                  </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeForgotModal}
                    className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isForgotLoading}
                    className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition ${
                      isForgotLoading
                        ? 'cursor-not-allowed bg-slate-500'
                        : 'bg-gradient-to-r from-slate-900 to-cyan-700 hover:from-slate-800 hover:to-cyan-600'
                    }`}
                  >
                    <FiKey />
                    {isForgotLoading ? 'Verifying...' : 'Verify & Reset Password'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
