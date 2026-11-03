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
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.full_name,
          email: formData.email,
          password: formData.password,
        }),
      });

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
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white' }}
                    required
                />
              </div>
              <button type="submit" disabled={regLoading} className="btn btn-primary" style={{ padding: '12px', marginTop: '8px' }}>
                {regLoading ? 'Submitting...' : 'Register Account'}
              </button>
            </form>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <span style={{ color: '#64748B', fontSize: '0.85rem' }}>Already registered? </span>
              <button onClick={() => setCurrentView('login')} style={{ background: 'none', border: 'none', color: '#6366F1', fontWeight: 700, cursor: 'pointer' }}>
                Sign In
              </button>
            </div>
          </div>
        </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: LANDING PAGE VIEW
  // -------------------------------------------------------------
  return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-dark)' }}>
        {/* NAVBAR */}
        <nav className="topbar" style={{ left: 0, padding: '0 3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 800, fontSize: '1.25rem', color: 'white' }}>
            <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #6366F1, #10B981)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fa-solid fa-layer-group" style={{ color: 'white' }}></i>
            </div>
            Hope, Inc. ERP
          </div>

          {/* TOP RIGHT NAVIGATION BUTTONS */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-ghost" onClick={() => setCurrentView('login')}>
              Sign In
            </button>
            <button className="btn btn-primary" onClick={() => setCurrentView('register')}>
              Register
            </button>
          </div>
        </nav>

        {/* HERO SECTION */}
        <main style={{ padding: '160px 3rem 80px', maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '1.5rem', color: 'white' }}>
              Next–Gen Business Intelligence <span style={{ background: 'linear-gradient(135deg, #10B981, #06B6D4, #6366F1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Unified.</span>
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#94A3B8', marginBottom: '2.5rem', maxWidth: '540px', lineHeight: 1.6 }}>
              Manage Customers, Products, Human Resources, and Real-time Sales Analytics from a high-performance, dark-themed dashboard built for modern teams.
            </p>

            {/* HERO BUTTONS */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button
                  className="btn btn-emerald"
                  style={{ padding: '14px 28px', fontSize: '1rem' }}
                  onClick={() => setCurrentView('dashboard')}
              >
                <i className="fa-solid fa-bolt"></i> Go to Dashboard
              </button>
              <button
                  className="btn btn-ghost"
                  style={{ padding: '14px 24px' }}
                  onClick={() => setCurrentView('login')}
              >
                Sign In with Email
              </button>
            </div>
          </div>

          {/* HERO MOCKUP PREVIEW */}
          <div className="table-card" style={{ padding: '24px', border: '1px solid rgba(99, 102, 241, 0.3)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7)' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#EF4444' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#F59E0B' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10B981' }}></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ fontWeight: 700, color: '#94A3B8', fontSize: '0.85rem' }}>DASHBOARD PREVIEW</div>
              <span className="status-badge status-active">● SYSTEM ONLINE</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>TOTAL REVENUE</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#10B981', marginTop: '4px' }}>$148,920.00</div>
              </div>
              <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>ACTIVE CLIENTS</div>
                <div style={{ fontSize: '1.3rem', fontWeight 800, color: '#6366F1', marginTop: '4px' }}>1,240</div>
              </div>
            </div>

            <div style={{ height: '120px', background: 'rgba(15, 23, 42, 0.5)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366F1' }}>
              <i className="fa-solid fa-chart-line" style={{ fontSize: '2.5rem', margin: 'auto' }}></i>
            </div>
          </div>
        </main>
      </div>
  );
}