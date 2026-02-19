import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo1 from '../../Images/dream-anim-logo.png';
import loginBg from '../../Images/page-background.JPG'; // Same background as home

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'admin' // Default role admin
  });
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear field error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
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
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setShowErrors(true);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call - Replace with actual authentication
    setTimeout(() => {
      // Demo credentials
      if (formData.email === 'admin@animex.com' && formData.password === 'admin123') {
        // Store authentication token
        localStorage.setItem('adminToken', 'demo-token-12345');
        localStorage.setItem('adminUser', JSON.stringify({
          name: 'Admin User',
          email: formData.email,
          role: formData.role
        }));
        
        // Redirect to dashboard
        navigate('/admin');
      } else {
        setLoginError('Invalid email or password');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div 
      className="w-full min-h-screen bg-fixed bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      {/* Logo - Same as home page */}
      <div className="fixed top-0 left-0 w-[100px] h-auto z-50">
        <img
          src={logo1}
          alt="logo"
          className="w-[70px] h-[90px] md:w-[90px] md:h-[110px]"
          style={{
            filter: "drop-shadow(0 0 40px white) drop-shadow(0 0 40px white) drop-shadow(0 0 70px rgba(255,255,255,0.9))",
          }}
        />
      </div>

      {/* Login Card */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl w-[90%] max-w-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-cyan-900" style={{ fontFamily: "Playwrite NZ Basic, cursive" }}>
            Admin Login
          </h2>
          <p className="text-gray-600 mt-2">Welcome back! Please login to continue</p>
        </div>

        {/* Role Selector */}
        <div className="flex justify-center gap-4 mb-6">
          {['admin'].map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, role }))}
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

        {/* Login Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Email Field */}
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

          {/* Password Field */}
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
              placeholder="••••••••"
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

          {/* Login Error */}
          {loginError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {loginError}
            </div>
          )}

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-sm text-red-600 hover:text-red-800 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
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
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </button>

          {/* Back to Home */}
          <div className="text-center mt-4">
            <Link to="/" className="text-sm text-gray-600 hover:text-red-600">
              ← Back to Home
            </Link>
          </div>
        </form>

        {/* Demo Credentials Hint */}
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-600 font-semibold mb-2">Demo Credentials:</p>
          <p className="text-xs text-gray-500">Email: admin@animex.com</p>
          <p className="text-xs text-gray-500">Password: admin123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
