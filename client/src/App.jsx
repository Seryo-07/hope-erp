import React, { useState } from 'react';
import UserManagement from './pages/UserManagement';

export default function App() {
  // Navigation State: 'landing' | 'dashboard' | 'register' | 'login'
  const [currentView, setCurrentView] = useState('landing');

  // Sign In Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Registration Form State
import { useState } from 'react';

export default function App() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [regMessage, setRegMessage] = useState('');
  const [regError, setRegError] = useState('');
  const [regLoading, setRegLoading] = useState(false);

  // Handle Real Login API
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail || !loginPassword) {
      return setLoginError('Please enter both email and password.');
    }

    try {
      setLoginLoading(true);
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const text = await response.text();
      let data = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch (err) {
        throw new Error('Server returned an invalid response format.');
      }

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Invalid email or password.');
      }

      // Successful Auth -> Direct to Dashboard
      setCurrentView('dashboard');
    } catch (err) {
      setLoginError(err.message || 'Login failed.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Helper to autofill demo credentials
  const fillDemoAccount = (email) => {
    setLoginEmail(email);
    setLoginPassword('password123');
    setLoginError('');
  };

  // Handle Registration API
  const handleRegisterChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegError('');
    setRegMessage('');

    if (!formData.full_name || !formData.email || !formData.password) {
      return setRegError('All fields are required.');
    }
    if (formData.password !== formData.confirmPassword) {
      return setRegError('Passwords do not match.');
    }

    try {
      setRegLoading(true);

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!formData.full_name || !formData.email || !formData.password) {
      return setError('All fields are required.');
    }
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match.');
    }

    try {
      setLoading(true);

      // Targeted express backend on port 5000 directly
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.full_name,
          email: formData.email,
          password: formData.password,
        }),
      });

      // Read raw text first to handle empty responses or proxy/server HTML error pages safely
      const text = await response.text();
      let data = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch (err) {
        throw new Error(`Server returned non-JSON response (${response.status})`);
      }

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Registration failed');
      }

      setRegMessage('Account registered successfully! Redirecting to dashboard...');
      setTimeout(() => {
        setCurrentView('dashboard');
      }, 1500);
    } catch (err) {
      setRegError(err.message || 'An error occurred during registration.');
    } finally {
      setRegLoading(false);
    }
  };

  // -------------------------------------------------------------
  // RENDER: DASHBOARD VIEW
  // -------------------------------------------------------------
  if (currentView === 'dashboard') {
    return (
        <div>
          <div style={{ position: 'fixed', top: '15px', right: '20px', zIndex: 9999 }}>
            <button
                className="btn btn-ghost"
                onClick={() => setCurrentView('landing')}
                style={{ background: '#0F172A', color: '#94A3B8', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              ← Sign Out / Exit
            </button>
          </div>
          <UserManagement />
        </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: SIGN IN MODAL / VIEW
  // -------------------------------------------------------------
  if (currentView === 'login') {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="table-card" style={{ maxWidth: '460px', width: '100%', padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h2 style={{ color: 'white', fontWeight: 800, fontSize: '1.4rem' }}>Sign In</h2>
              <button className="btn btn-ghost" onClick={() => setCurrentView('landing')}>✕</button>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '0.88rem', marginBottom: '20px' }}>
              Sign in to your Hope, Inc. ERP account
            </p>

            {/* DEMO ACCOUNTS HELPER BOX */}
            <div style={{
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '10px',
              padding: '14px',
              marginBottom: '20px'
            }}>
              <div style={{ color: '#F59E0B', fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px' }}>
                ⚡ Demo accounts (click to autofill):
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.8rem', color: '#CBD5E1' }}>
              <span
                  style={{ cursor: 'pointer', textDecoration: 'underline' }}
                  onClick={() => fillDemoAccount('superadmin@hope.com')}
              >
                • superadmin@hope.com → <strong style={{ color: '#F59E0B' }}>Superadmin</strong>
              </span>
                <span
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() => fillDemoAccount('admin@hope.com')}
                >
                • admin@hope.com → <strong style={{ color: '#6366F1' }}>Admin</strong>
              </span>
              </div>
            </div>

            {loginError && (
                <p style={{ color: '#FCA5A5', backgroundColor: 'rgba(239, 68, 68, 0.15)', padding: '10px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '16px' }}>
                  {loginError}
                </p>
            )}

            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.85rem', marginBottom: '6px', fontWeight: 600 }}>Email address</label>
                <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="name@company.com"
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white' }}
                    required
                />
              </div>

              <div>
                <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.85rem', marginBottom: '6px', fontWeight: 600 }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      style={{ width: '100%', padding: '12px 40px 12px 12px', borderRadius: '8px', background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white' }}
                      required
                  />
                  <i
                      className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748B', cursor: 'pointer' }}
                  ></i>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                <label style={{ color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" style={{ accentColor: '#6366F1' }} /> Remember me
                </label>
                <span style={{ color: '#6366F1', cursor: 'pointer', fontWeight: 600 }}>Forgot password?</span>
              </div>

              <button type="submit" disabled={loginLoading} className="btn btn-primary" style={{ padding: '12px', marginTop: '8px' }}>
                {loginLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div style={{ margin: '20px 0', textAlign: 'center', position: 'relative' }}>
              <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }} />
              <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: '#0F172A', padding: '0 10px', color: '#64748B', fontSize: '0.8rem' }}>or</span>
            </div>

            <button
                className="btn btn-ghost"
                onClick={() => setCurrentView('dashboard')}
                style={{ width: '100%', padding: '12px', display: 'flex', gap: '10px', justifyContent: 'center' }}
            >
              <i className="fa-brands fa-google" style={{ color: '#EA4335' }}></i> Continue with Google
            </button>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <span style={{ color: '#64748B', fontSize: '0.85rem' }}>Don't have an account? </span>
              <button onClick={() => setCurrentView('register')} style={{ background: 'none', border: 'none', color: '#6366F1', fontWeight: 700, cursor: 'pointer' }}>
                Register
              </button>
            </div>
          </div>
        </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: REGISTRATION VIEW
  // -------------------------------------------------------------
  if (currentView === 'register') {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="table-card" style={{ maxWidth: '440px', width: '100%', padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ color: 'white', fontWeight: 800 }}>Create Account</h2>
              <button className="btn btn-ghost" onClick={() => setCurrentView('landing')}>✕</button>
            </div>

            {regError && <p style={{ color: '#FCA5A5', backgroundColor: 'rgba(239, 68, 68, 0.15)', padding: '10px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '16px' }}>{regError}</p>}
            {regMessage && <p style={{ color: '#34D399', backgroundColor: 'rgba(16, 185, 129, 0.15)', padding: '10px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '16px' }}>{regMessage}</p>}

            <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.85rem', marginBottom: '6px' }}>Full Name</label>
                <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleRegisterChange}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white' }}
                    required
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.85rem', marginBottom: '6px' }}>Email Address</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleRegisterChange}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white' }}
                    required
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.85rem', marginBottom: '6px' }}>Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleRegisterChange}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white' }}
                    required
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.85rem', marginBottom: '6px' }}>Confirm Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleRegisterChange}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(25
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(25
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(25
      } catch (parseErr) {
        throw new Error(
            `Server returned non-JSON response (${response.status}): ${text || 'Empty response'}`
        );
      }

      if (!response.ok) {
        // Fallback to data.error to match express error payloads
        throw new Error(data.error || data.message || `Registration failed with status ${response.status}`);
      }

      setMessage(data.message);
      setFormData({ full_name: '', email: '', password: '', confirmPassword: '' });
    } catch (err) {
      setError(err.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
      <div style={{ maxWidth: '400px', margin: '40px auto', fontFamily: 'sans-serif' }}>
        <h2>HOPE ERP - User Registration</h2>
        {error && <p style={{ color: 'red', backgroundColor: '#ffe6e6', padding: '10px', borderRadius: '4px' }}>{error}</p>}
        {message && <p style={{ color: 'green', backgroundColor: '#e6ffe6', padding: '10px', borderRadius: '4px' }}>{message}</p>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block' }}>Full Name:</label>
            <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                required
            />
          </div>
          <div>
            <label style={{ display: 'block' }}>Email:</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                required
            />
          </div>
          <div>
            <label style={{ display: 'block' }}>Password:</label>
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                required
            />
          </div>
          <div>
            <label style={{ display: 'block' }}>Confirm Password:</label>
            <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                required
            />
          </div>
          <button type="submit" disabled={loading} style={{ padding: '10px', cursor: 'pointer', marginTop: '10px' }}>
            {loading ? 'Submitting...' : 'Register Account'}
          </button>
        </form>
      </div>
  );
}
