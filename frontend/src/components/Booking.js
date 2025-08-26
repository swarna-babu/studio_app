import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import BookingDay from './BookingDay';

const API = 'http://localhost:8000/api';

const hours = [
  '09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30'
];

function nextHalfHour(time) {
  const idx = hours.indexOf(time);
  return hours[idx + 1];
}

export default function Booking() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const _room = params.get('room');
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [selected, setSelected] = useState([]); // array of slot strings
  const [notes, setNotes] = useState('');
  const [buffer, setBuffer] = useState(false);
  const [pricePerHour, setPricePerHour] = useState(400);
  const [instant, setInstant] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    // fetch base price
    fetch(`${API}/studios/${id}/`).then(r=>r.json()).then(s => { setPricePerHour(Number(s.basic_price)); setInstant(Boolean(s.instant_booking)); setCategoryName(s.category); });
  }, [id]);

  const availableSlots = hours; // demo

  const canBuffer = useMemo(() => {
    if (selected.length === 0) return false;
    // if any slot's next half-hour is not selected and exists, allow buffer
    return selected.some(s => hours.includes(nextHalfHour(s)) && !selected.includes(nextHalfHour(s)));
  }, [selected]);

  useEffect(() => {
    if (!canBuffer && buffer) setBuffer(false);
  }, [canBuffer, buffer]);

  const addSlot = (s) => {
    setSelected(prev => prev.includes(s) ? prev.filter(x=>x!==s) : [...prev, s].sort());
  };

  const hoursCount = useMemo(() => selected.length * 0.5 + (buffer ? 0.5 : 0), [selected, buffer]);
  const subtotal = useMemo(() => pricePerHour * hoursCount, [pricePerHour, hoursCount]);
  const service = 40; const tax = Math.round(subtotal * 0.18);
  const total = subtotal + service + tax;

  return (
    <div style={{ padding: 24, background:'#fff', color:'#000' }}>
      <h2>Booking Details</h2>
      <div style={{ marginBottom: 16 }}>
        <strong>Mode:</strong> {instant ? 'Instant booking available' : 'Request-based booking'}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:16 }}>
        <div>
          <h3>Slot-based (Audio/Video)</h3>
          <div>
            <label>Date</label>
            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} style={{ marginLeft: 8 }} />
          </div>
          <div style={{ marginTop:12 }}>
            <div style={{ fontWeight:600, marginBottom:8 }}>Available slots</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
              {availableSlots.map(s => (
                <button key={s} onClick={()=>addSlot(s)} style={{ border:'1px solid #ddd', borderRadius:18, padding:'6px 10px', background: selected.includes(s) ? '#1976d2' : '#fff', color: selected.includes(s) ? '#fff' : '#000' }}>{s}</button>
              ))}
            </div>
          </div>
          <div style={{ marginTop:12 }}>
            <label>
              <input type="checkbox" checked={buffer} onChange={(e)=>setBuffer(e.target.checked)} disabled={!canBuffer} /> Extra buffer time for setup and recording
            </label>
            {!canBuffer && <div style={{ fontSize:12, color:'#555' }}>Buffer time not available for the selected slots.</div>}
          </div>
          <div style={{ marginTop:12 }}>
            <label>Special requirements:</label>
            <textarea value={notes} onChange={(e)=>setNotes(e.target.value)} rows={3} style={{ width:'100%', padding:6 }} placeholder="Enter custom equipment / request" />
          </div>
        </div>
        <aside style={{ border:'1px solid #eee', borderRadius:6, padding:12 }}>
          <div style={{ fontWeight:700 }}>₹{pricePerHour} / hour</div>
          <div style={{ marginTop:12 }}>Selected Slots: {selected.join(', ') || 'None'}</div>
          <div style={{ marginTop:12 }}>
            <div>Subtotal: ₹{subtotal.toFixed(0)}</div>
            <div>Service Charges: ₹{service}</div>
            <div>Tax: ₹{tax}</div>
            <div style={{ fontWeight:700 }}>Total: ₹{total.toFixed(0)}</div>
          </div>
          <button style={{ marginTop:12, width:'100%', background:'#1976d2', color:'#fff', border:'none', borderRadius:4, padding:'10px 12px' }} onClick={()=>{
            // simulate either instant payment or request flow
            if (instant) navigate('/confirmation'); else navigate('/confirmation?requested=true');
          }}>Continue to Booking</button>
        </aside>
      </div>
      {categoryName && categoryName.toLowerCase().includes('location') && (
        <>
          <hr style={{ margin: '24px 0' }} />
          <h3>Day-based (Shooting Locations)</h3>
          <BookingDay basePrice={pricePerHour} instantBooking={instant} />
        </>
      )}
    </div>
  );
}


