import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const API = 'http://localhost:8000/api';

export default function NavBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [catOpen, setCatOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(null);

  useEffect(() => {
    fetch(`${API}/categories/`).then(r=>r.json()).then(setCategories);
  }, []);

  const tabs = [
    { to: '/studios', label: 'All Studios' },
    { to: '/studios?category=audio', label: 'Audio Studios' },
    { to: '/studios?category=video', label: 'Video Studios' },
    { to: '/studios?category=shooting', label: 'Locations' },
  ];

  return (
    <nav style={{ background: '#fff', borderBottom: '1px solid #eee' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px' }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <img alt="logo sun" src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Sun_symbol.svg" width={24} height={24} />
          <strong>Studio App</strong>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link to="/signup"><button>Sign Up</button></Link>
          <Link to="/"><button>Login</button></Link>
          <Link to="/account" style={{ display: 'flex', alignItems: 'center', marginLeft: 8 }}>
            <button style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }} title="My Account">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-2.5 3.5-4 8-4s8 1.5 8 4"/></svg>
            </button>
          </Link>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12, padding: '6px 16px', overflowX: 'auto', position: 'relative' }}>
        {tabs.map(t => {
          const isActive = pathname.startsWith(t.to.split('?')[0]);
          return (
            <Link key={t.to} to={t.to} style={{ textDecoration: 'none' }}>
              <div style={{ padding: '6px 10px', borderRadius: 16, background: isActive ? '#000' : '#f2f2f2', color: isActive ? '#fff' : '#000' }}>{t.label}</div>
            </Link>
          );
        })}
        {/* Removed Categories dropdown */}
      </div>
    </nav>
  );
}


