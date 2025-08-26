import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
const dummyImg = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="%23f0f0f0"/><circle cx="120" cy="140" r="8" fill="%23cccccc"/><path d="M80 200c12-20 36-20 48 0h80c12-20 36-20 48 0v40H80z" fill="%23d9d9d9"/></svg>';

const API_BASE = 'http://localhost:8000/api/auth';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const canSubmit = email && password && consent && !loading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!consent) {
      setError('Please accept Terms, Privacy Policy, and Notification settings.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, consent }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Login failed');
      console.log('Logged in', data);
      // store tokens in localStorage for demo
      localStorage.setItem('access', data.tokens.access);
      localStorage.setItem('refresh', data.tokens.refresh);
      navigate('/studios');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setError('');
    if (!consent) {
      setError('Please accept Terms, Privacy Policy, and Notification settings.');
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/google/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: credentialResponse.credential, consent }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Google login failed');
      localStorage.setItem('access', data.tokens.access);
      localStorage.setItem('refresh', data.tokens.refresh);
      navigate('/studios');
    } catch (err) {
      setError(err.message);
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
            <h2 style={{ margin: 0, color: '#000' }}>Login</h2>
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <button>Sign Up</button>
            </Link>
          </div>
          <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
            <label>Email</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email address" style={{ width: '100%', padding: 8, marginTop: 4 }} />
            <label style={{ marginTop: 12, display: 'block' }}>Password</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="********" style={{ width: '100%', padding: 8, marginTop: 4 }} />
            <div style={{ marginTop: 8, textAlign: 'right' }}>
              <button type="button" onClick={()=>alert('Password reset flow TBD')} style={{ background: 'none', border: 'none', color: '#0070f3', cursor: 'pointer', padding: 0 }}>Forgot your password?</button>
            </div>
            <div style={{ marginTop: 8, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <input id="consent" type="checkbox" checked={consent} onChange={(e)=>setConsent(e.target.checked)} />
              <label htmlFor="consent" style={{ fontSize: 12 }}>
                By continuing, you agree to our <Link to="/terms">Terms of Service</Link>, <Link to="/privacy">Privacy Policy</Link>, and our default notification settings.
              </label>
            </div>
            {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
            <button type="submit" disabled={!canSubmit} style={{ marginTop: 12, width: '100%', padding: 10, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4 }}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <div style={{ marginTop: 12, textAlign: 'center', color: '#000' }}>OR</div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={()=>setError('Google login failed')} useOneTap={false} />
          </div>
        </div>
      </div>
    </div>
  );
}


