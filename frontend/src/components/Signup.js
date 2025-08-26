import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const API_BASE = 'http://localhost:8000/api/auth';
const dummyImg = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="%23f0f0f0"/><circle cx="120" cy="140" r="8" fill="%23cccccc"/><path d="M80 200c12-20 36-20 48 0h80c12-20 36-20 48 0v40H80z" fill="%23d9d9d9"/></svg>';

export default function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!firstName.trim()) e.firstName = 'First name is required';
    if (!username.trim()) e.username = 'Username is required';
    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) e.email = 'Enter a valid email';
    if (password.length < 8) e.password = 'Password must be at least 8 characters';
    if (!consent) e.consent = 'Please agree to proceed';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/signup/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ first_name: firstName, username, email, password, consent }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Signup failed');
      localStorage.setItem('access', data.tokens.access);
      localStorage.setItem('refresh', data.tokens.refresh);
      navigate('/studios');
    } catch (err) {
      if (typeof err.message === 'string') setErrors({ form: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  const onGoogle = async (cred) => {
    if (!consent) {
      setErrors({ consent: 'Please agree to proceed' });
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/google/`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: cred.credential, consent })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Google signup failed');
      localStorage.setItem('access', data.tokens.access);
      localStorage.setItem('refresh', data.tokens.refresh);
      navigate('/studios');
    } catch (err) {
      setErrors({ form: err.message });
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: '#ffffff', color: '#000' }}>
      <div style={{ background: '#fff', width: 920, padding: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderRadius: 8 }}>
        <div style={{ borderRadius: 4, height: 360, overflow: 'hidden', background: '#efefef' }}>
          <img src={dummyImg} alt="illustration" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0, color: '#000' }}>Sign up</h2>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <button>Login</button>
            </Link>
          </div>
          <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label>First name</label>
                <input value={firstName} onChange={(e)=>setFirstName(e.target.value)} placeholder="Your name" style={{ width: '100%', padding: 8, marginTop: 4 }} />
                {errors.firstName && <div style={{ color: 'red', fontSize: 12 }}>{errors.firstName}</div>}
              </div>
              <div>
                <label>Username</label>
                <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Your username" style={{ width: '100%', padding: 8, marginTop: 4 }} />
                {errors.username && <div style={{ color: 'red', fontSize: 12 }}>{errors.username}</div>}
              </div>
            </div>
            <label style={{ marginTop: 12, display: 'block' }}>Email</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email address" style={{ width: '100%', padding: 8, marginTop: 4 }} />
            {errors.email && <div style={{ color: 'red', fontSize: 12 }}>{errors.email}</div>}
            <label style={{ marginTop: 12, display: 'block' }}>Password</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="********" style={{ width: '100%', padding: 8, marginTop: 4 }} />
            {errors.password && <div style={{ color: 'red', fontSize: 12 }}>{errors.password}</div>}
            <div style={{ marginTop: 8, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <input id="signup-consent" type="checkbox" checked={consent} onChange={(e)=>setConsent(e.target.checked)} />
              <label htmlFor="signup-consent" style={{ fontSize: 12 }}>
                Creating an account means you also agree with our <Link to="/terms">Terms of Service</Link>, <Link to="/privacy">Privacy Policy</Link>, and our default Notification Settings.
              </label>
            </div>
            {errors.consent && <div style={{ color: 'red', fontSize: 12 }}>{errors.consent}</div>}
            {errors.form && <div style={{ color: 'red', marginTop: 8 }}>{errors.form}</div>}
            <button type="submit" disabled={submitting || !consent} style={{ marginTop: 12, width: '100%', padding: 10, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4 }}>
              {submitting ? 'Creating account...' : 'Sign up'}
            </button>
          </form>
          <div style={{ marginTop: 12, textAlign: 'center', color: '#000' }}>OR</div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
            <GoogleLogin onSuccess={onGoogle} onError={()=>setErrors({ form: 'Google signup failed' })} useOneTap={false} />
          </div>
        </div>
      </div>
    </div>
  );
}


