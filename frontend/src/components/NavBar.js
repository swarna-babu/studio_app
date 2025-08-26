import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function NavBar() {
  const { pathname } = useLocation();
  const tabs = [
    { to: '/studios', label: 'All Studios' },
    { to: '/studios?category=audio', label: 'Audio Studios' },
    { to: '/studios?category=video', label: 'Video Studios' },
    { to: '/locations', label: 'Locations' },
  ];
  return (
    <nav style={{ background: '#fff', borderBottom: '1px solid #eee' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px' }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <img alt="logo sun" src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Sun_symbol.svg" width={24} height={24} />
          <strong>Studio App</strong>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link to="/signup"><button>Sign Up</button></Link>
          <Link to="/"><button>Login</button></Link>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12, padding: '6px 16px', overflowX: 'auto' }}>
        {tabs.map(t => {
          const isActive = pathname.startsWith(t.to.split('?')[0]);
          return (
            <Link key={t.to} to={t.to} style={{ textDecoration: 'none' }}>
              <div style={{ padding: '6px 10px', borderRadius: 16, background: isActive ? '#000' : '#f2f2f2', color: isActive ? '#fff' : '#000' }}>{t.label}</div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}


