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
    <div style={{ padding:24, background:'#fff', color:'#000' }}>
      <h2>Saved studios</h2>
      {items.map(st => (
        <div key={st.id} style={{ display:'grid', gridTemplateColumns:'96px 1fr auto', gap:12, alignItems:'center', border:'1px solid #eee', borderRadius:8, padding:12, marginBottom:12 }}>
          <img src={st.image_url || 'https://via.placeholder.com/96'} alt="studio" width={96} height={96} style={{ objectFit:'cover', borderRadius:8 }} />
          <div>
            <div style={{ fontWeight:600 }}>{st.name}</div>
            <div style={{ fontSize:12 }}>{st.category} · {st.subcategory}</div>
            <div>₹{st.basic_price} / hour · Rating {st.rating}</div>
          </div>
          <div style={{ display:'flex', gap:8 }}>
            <Link to={`/studios/${st.id}`}><button>View</button></Link>
            <button onClick={()=>remove(st.id)}>Remove</button>
          </div>
        </div>
      ))}
      {!items.length && <div>No saved studios yet.</div>}
    </div>
  );
}


