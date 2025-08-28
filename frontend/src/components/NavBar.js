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
    { to: '/locations', label: 'Locations' },
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
        <div style={{ position: 'relative' }} onMouseEnter={()=>setCatOpen(true)} onMouseLeave={()=>{setCatOpen(false);setSubOpen(null);}}>
          <div style={{ padding: '6px 10px', borderRadius: 16, background: catOpen ? '#000' : '#f2f2f2', color: catOpen ? '#fff' : '#000', cursor:'pointer' }}>Categories ▾</div>
          {catOpen && (
            <div style={{ position: 'absolute', top: 36, left: 0, background: '#fff', border: '1px solid #eee', borderRadius: 8, minWidth: 180, zIndex: 10, boxShadow: '0 2px 8px #0001' }}>
              {categories.map(cat => (
                <div key={cat.id} style={{ position: 'relative' }} onMouseEnter={()=>setSubOpen(cat.id)} onMouseLeave={()=>setSubOpen(null)}>
                  <div style={{ padding: '8px 16px', cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={()=>navigate(`/studios?category=${cat.id}`)}>{cat.name} ▸</div>
                  {subOpen === cat.id && cat.subcategories && cat.subcategories.length > 0 && (
                    <div style={{ position: 'absolute', top: 0, left: '100%', background: '#fff', border: '1px solid #eee', borderRadius: 8, minWidth: 160, zIndex: 20, boxShadow: '0 2px 8px #0001' }}>
                      {cat.subcategories.map(sub => (
                        <div key={sub.id} style={{ padding: '8px 16px', cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={()=>navigate(`/studios?category=${cat.id}&subcategory=${sub.id}`)}>{sub.name}</div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}


