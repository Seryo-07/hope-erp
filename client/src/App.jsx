import { useState } from 'react';

export default function App() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
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