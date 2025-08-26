import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const API = 'http://localhost:8000/api';
const dummyImg = 'https://via.placeholder.com/96';

export default function StudiosList() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [studios, setStudios] = useState([]);
  const [selectedCat, setSelectedCat] = useState('all');
  const [selectedSubs, setSelectedSubs] = useState(new Set());
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [q, setQ] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [ratingMin, setRatingMin] = useState('');
  const location = useLocation();

  useEffect(() => {
    fetch(`${API}/categories/`).then(r=>r.json()).then(setCategories);
  }, []);

  const fetchStudios = useCallback(() => {
    const params = new URLSearchParams();
    if (city) params.append('city', city);
    if (q) params.append('q', q);
    if (date) params.append('date', date);
    if (selectedCat !== 'all') params.append('category', selectedCat);
    if (selectedSubs.size) Array.from(selectedSubs).forEach(id=>params.append('subcategory', id));
    if (priceMin) params.append('price_min', priceMin);
    if (priceMax) params.append('price_max', priceMax);
    if (ratingMin) params.append('rating_min', ratingMin);
    fetch(`${API}/studios/?${params.toString()}`)
      .then(r=>r.json())
      .then(setStudios);
  }, [city, q, date, selectedCat, selectedSubs, priceMin, priceMax, ratingMin]);

  useEffect(() => { fetchStudios(); }, [fetchStudios]);

  useEffect(() => { fetchStudios(); }, [fetchStudios]);

  const currentSubcats = useMemo(() => {
    if (selectedCat === 'all') return categories.flatMap(c=>c.subcategories || []);
    const cat = categories.find(c=>String(c.id) === String(selectedCat));
    return cat ? cat.subcategories || [] : [];
  }, [categories, selectedCat]);

  const toggleSub = (id) => {
    const next = new Set(selectedSubs);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelectedSubs(next);
  };

  useEffect(() => {
    // when category changes, default select all its subcategories
    const all = currentSubcats.map(s=>String(s.id));
    setSelectedSubs(new Set(all));
  }, [selectedCat, categories]);

  useEffect(() => {
    // parse category from query (?category=audio|video|id)
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat && categories.length) {
      const match = categories.find(c => c.name.toLowerCase().includes(cat.toLowerCase()) || String(c.id) === cat);
      if (match) setSelectedCat(String(match.id));
    }
  }, [location.search, categories]);

  return (
    <div style={{ background: '#fff', color: '#000', minHeight: '100vh' }}>
      <header style={{ padding: '12px 24px', display: 'flex', gap: 16, alignItems: 'center', borderBottom: '1px solid #eee' }}>
        <strong>Audio Studios</strong>
        <input placeholder="Search by name" value={q} onChange={(e)=>setQ(e.target.value)} style={{ padding: 8 }} />
        <input placeholder="City" value={city} onChange={(e)=>setCity(e.target.value)} style={{ padding: 8 }} />
        <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} style={{ padding: 8 }} />
        <button onClick={fetchStudios} style={{ background:'#1976d2', color:'#fff', border:'none', borderRadius:4, padding:'8px 12px' }}>Search</button>
      </header>
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 16, padding: 24 }}>
        <aside style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Categories</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <button onClick={()=>setSelectedCat('all')} style={{ background: selectedCat==='all' ? '#1976d2' : '#f2f2f2', color: selectedCat==='all' ? '#fff' : '#000', border: 'none', borderRadius: 16, padding: '6px 10px' }}>All</button>
              {categories.map(c=> (
                <button key={c.id} onClick={()=>setSelectedCat(String(c.id))} style={{ background: selectedCat===String(c.id) ? '#1976d2' : '#f2f2f2', color: selectedCat===String(c.id) ? '#fff' : '#000', border: 'none', borderRadius: 16, padding: '6px 10px' }}>{c.name}</button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Sub-categories</div>
            <div style={{ display: 'grid', gap: 6 }}>
              {currentSubcats.map(s => (
                <label key={s.id} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input type="checkbox" checked={selectedSubs.has(String(s.id))} onChange={()=>toggleSub(String(s.id))} />
                  <span>{s.name}</span>
                </label>
              ))}
            </div>
            <div style={{ marginTop: 16 }}>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>Filters</div>
              <div style={{ display: 'grid', gap: 8 }}>
                <div>
                  <label>Min Price</label>
                  <input type="number" value={priceMin} onChange={(e)=>setPriceMin(e.target.value)} style={{ width:'100%', padding:6 }} />
                </div>
                <div>
                  <label>Max Price</label>
                  <input type="number" value={priceMax} onChange={(e)=>setPriceMax(e.target.value)} style={{ width:'100%', padding:6 }} />
                </div>
                <div>
                  <label>Min Rating</label>
                  <input type="number" min="0" max="5" step="0.1" value={ratingMin} onChange={(e)=>setRatingMin(e.target.value)} style={{ width:'100%', padding:6 }} />
                </div>
              </div>
            </div>
          </div>
        </aside>
        <main>
          {studios.map(st => (
            <div key={st.id} style={{ display: 'grid', gridTemplateColumns: '96px 1fr auto', gap: 12, alignItems: 'center', border: '1px solid #eee', borderRadius: 8, padding: 12, marginBottom: 12 }}>
              <img src={st.image_url || dummyImg} alt="studio" width={96} height={96} style={{ objectFit: 'cover', borderRadius: 8 }} />
              <div>
                <div style={{ fontWeight: 600 }}>{st.name}</div>
                <div style={{ fontSize: 12 }}>{st.category} • {st.subcategory} • {st.city}</div>
                <div style={{ marginTop: 4 }}>
                  <span style={{ fontWeight: 600 }}>${st.basic_price}</span> · Rating {st.rating}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={()=>navigate(`/booking/${st.id}`)} style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 12px' }}>Book now</button>
                <Link to={`/studios/${st.id}`}><button>View</button></Link>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}
