import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API = 'http://localhost:8000/api';

export default function LocationsList() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [locationCatId, setLocationCatId] = useState(null);
  const [studios, setStudios] = useState([]);
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [q, setQ] = useState('');

  useEffect(() => {
    fetch(`${API}/categories/`).then(r=>r.json()).then((cats) => {
      setCategories(cats);
      const loc = cats.find(c => c.name.toLowerCase().includes('location'));
      if (loc) setLocationCatId(String(loc.id));
    });
  }, []);

  const fetchStudios = useCallback(() => {
    if (!locationCatId) return;
    const params = new URLSearchParams();
    params.append('category', locationCatId);
    if (city) params.append('city', city);
    if (date) params.append('date', date);
    if (q) params.append('q', q);
    fetch(`${API}/studios/?${params.toString()}`)
      .then(r=>r.json())
      .then(setStudios);
  }, [locationCatId, city, date, q]);

  useEffect(() => { fetchStudios(); }, [fetchStudios]);

  const title = useMemo(() => {
    const cat = categories.find(c => String(c.id) === String(locationCatId));
    return cat ? cat.name : 'Locations';
  }, [categories, locationCatId]);

  return (
    <div style={{ background:'#fff', color:'#000', minHeight:'100vh' }}>
      <header style={{ padding:'12px 24px', borderBottom:'1px solid #eee', display:'flex', gap:12, alignItems:'center' }}>
        <strong>{title}</strong>
        <input placeholder="Search by name" value={q} onChange={(e)=>setQ(e.target.value)} style={{ padding:8 }} />
        <input placeholder="City" value={city} onChange={(e)=>setCity(e.target.value)} style={{ padding:8 }} />
        <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} style={{ padding:8 }} />
        <button onClick={fetchStudios} style={{ background:'#1976d2', color:'#fff', border:'none', borderRadius:4, padding:'8px 12px' }}>Search</button>
      </header>
      <main style={{ padding:24 }}>
        {studios.map(st => (
          <div key={st.id} style={{ display:'grid', gridTemplateColumns:'120px 1fr auto', gap:12, alignItems:'center', border:'1px solid #eee', borderRadius:8, padding:12, marginBottom:12 }}>
            <img src={st.image_url || 'https://via.placeholder.com/120'} alt="location" width={120} height={90} style={{ objectFit:'cover', borderRadius:6 }} />
            <div>
              <div style={{ fontWeight:600 }}>{st.name}</div>
              <div style={{ fontSize:12 }}>{st.city}</div>
              <div style={{ marginTop:4 }}>
                <span style={{ fontWeight:600 }}>₹{st.basic_price}</span> / day · Rating {st.rating}
              </div>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <button onClick={()=>navigate(`/booking/${st.id}`)} style={{ background:'#1976d2', color:'#fff', border:'none', borderRadius:4, padding:'8px 12px' }}>Book</button>
              <Link to={`/studios/${st.id}`}><button>View</button></Link>
            </div>
          </div>
        ))}
        {!studios.length && <div>No locations found.</div>}
      </main>
    </div>
  );
}


