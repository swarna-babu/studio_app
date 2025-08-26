import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const API = 'http://localhost:8000/api';

export default function StudioDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [studio, setStudio] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [seeAll, setSeeAll] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`${API}/studios/${id}/`).then(r=>r.json()).then(setStudio);
  }, [id]);

  if (!studio) return <div style={{ padding: 24 }}>Loading...</div>;

  const copyUrl = async () => {
    await navigator.clipboard.writeText(window.location.href);
    alert('Link copied');
  };

  const save = async () => {
    const email = localStorage.getItem('user_email') || 'guest@example.com';
    await fetch(`${API}/studios/${id}/save/`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email })});
    setSaved(true);
  };

  const goToBooking = () => {
    if (!selectedRoom) { alert('Please select a studio room.'); return; }
    navigate(`/booking/${id}?room=${selectedRoom}`);
  };

  return (
    <div style={{ padding: 24, background:'#fff', color:'#000' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <h2 style={{ margin:0 }}>{studio.name}</h2>
        <div style={{ display:'flex', gap:8 }}>
          <button onClick={copyUrl}>Share</button>
          <button onClick={save}>{saved? 'Saved' : 'Save'}</button>
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:16, marginTop:12 }}>
        <div>
          <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:8 }}>
            <img src={(studio.media[0] && studio.media[0].url) || studio.image_url} alt="main" style={{ width:'100%', height:260, objectFit:'cover', borderRadius:6 }} />
            <div style={{ display:'grid', gridTemplateRows:'repeat(3, 1fr)', gap:8 }}>
              {(studio.media.slice(1,4)).map(m => (
                <img key={m.id} src={m.url} alt="thumb" style={{ width:'100%', height:'100%', objectFit:'cover', borderRadius:6 }} />
              ))}
              <button onClick={()=>setSeeAll(true)}>See all</button>
            </div>
          </div>
          <section style={{ marginTop:16 }}>
            <h3>Highlights of this studio</h3>
            <p>Great acoustics and equipment. Located in {studio.city}. Basic price ₹{studio.basic_price}/hour.</p>
          </section>
          <section>
            <h3>What this studio offers</h3>
            <ul>
              <li>Audio</li>
              <li>Video</li>
              <li>Shooting</li>
            </ul>
          </section>
          <section>
            <h3>Location</h3>
            <p>{studio.city}</p>
          </section>
          <section>
            <h3>Reviews ({studio.reviews.length})</h3>
            <div style={{ display:'grid', gap:8 }}>
              {studio.reviews.map(rv => (
                <div key={rv.id} style={{ border:'1px solid #eee', borderRadius:6, padding:8 }}>
                  <div style={{ fontWeight:600 }}>{rv.author}</div>
                  <div>Rating {rv.rating}</div>
                  <div>{rv.comment}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
        <aside style={{ border:'1px solid #eee', borderRadius:6, padding:12 }}>
          <div style={{ fontWeight:700 }}>₹{studio.basic_price} / hour</div>
          <div style={{ marginTop:12 }}>
            <div style={{ fontWeight:600 }}>Select Studio</div>
            {studio.rooms.map(r => (
              <label key={r.id} style={{ display:'flex', gap:8, alignItems:'center' }}>
                <input type="radio" name="room" value={r.id} checked={String(selectedRoom)===String(r.id)} onChange={()=>setSelectedRoom(String(r.id))} />
                {r.name}
              </label>
            ))}
          </div>
          <button onClick={goToBooking} style={{ marginTop:12, width:'100%', background:'#1976d2', color:'#fff', border:'none', borderRadius:4, padding:'10px 12px' }}>Continue to Booking</button>
        </aside>
      </div>

      {seeAll && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center' }} onClick={()=>setSeeAll(false)}>
          <div style={{ background:'#fff', padding:16, maxWidth:900, width:'90%', borderRadius:6 }} onClick={(e)=>e.stopPropagation()}>
            <h3>All media</h3>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(160px, 1fr))', gap:8 }}>
              {studio.media.map(m => (
                <div key={m.id}>
                  {m.media_type==='video' ? (
                    <video src={m.url} controls style={{ width:'100%', borderRadius:6 }} />
                  ) : (
                    <img src={m.url} alt="media" style={{ width:'100%', borderRadius:6 }} />
                  )}
                </div>
              ))}
            </div>
            <div style={{ textAlign:'right', marginTop:8 }}>
              <button onClick={()=>setSeeAll(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


