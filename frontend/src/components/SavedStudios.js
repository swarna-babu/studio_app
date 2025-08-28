import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API = 'http://localhost:8000/api';

export default function SavedStudios() {
  const [items, setItems] = useState([]);
  const email = localStorage.getItem('user_email') || 'guest@example.com';

  const load = () => {
    fetch(`${API}/saved-studios/?email=${encodeURIComponent(email)}`).then(r=>r.json()).then(setItems);
  };
  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    await fetch(`${API}/studios/${id}/save/`, { method:'DELETE', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email })});
    load();
  };

  return (
    <div style={{ padding: 0, background: '#fff', color: '#000' }}>
      {items.map(st => (
        <div key={st.id} style={{ display: 'flex', alignItems: 'center', background: '#fafbfc', borderRadius: 12, boxShadow: '0 2px 8px #0001', marginBottom: 28, padding: 24, gap: 32 }}>
          <div style={{ minWidth: 120, minHeight: 120, background: '#eee', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={st.image_url || 'https://via.placeholder.com/120'} alt="studio" width={120} height={120} style={{ objectFit: 'cover', borderRadius: 12 }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>{st.name || 'Studio Name'}</div>
            <div style={{ color: '#555', fontSize: 14, marginBottom: 2 }}>{st.category}{st.subcategory ? ', ' + st.subcategory : ''}</div>
            <div style={{ color: '#888', fontSize: 13, marginBottom: 2 }}>Other Details</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
              <span style={{ fontWeight: 700, fontSize: 16 }}>★ {st.rating || '4.8'}</span>
              <span style={{ fontWeight: 700, fontSize: 18, marginLeft: 12 }}>₹{st.basic_price || '400'}<span style={{ fontWeight: 400, fontSize: 15, marginLeft: 2 }}>/Hour</span></span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Link to={`/studios/${st.id}`}><button style={{ border: '1.5px solid #222', background: '#fff', color: '#222', borderRadius: 24, padding: '8px 28px', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>View</button></Link>
            <button onClick={()=>remove(st.id)} style={{ border: 'none', background: '#222', color: '#fff', borderRadius: 24, padding: '8px 28px', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Remove</button>
          </div>
        </div>
      ))}
      {!items.length && <div>No saved studios yet.</div>}
    </div>
  );
}


