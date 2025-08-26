import React, { useEffect, useMemo, useState } from 'react';

const tasks = [
  { key: 'recce', label: 'Recce', price: 300 },
  { key: 'shoot', label: 'Shooting', price: 600 },
  { key: 'post', label: 'Post-Processing', price: 500 },
];

export default function BookingDay({ basePrice, instantBooking }) {
  const [dates, setDates] = useState([]);
  const [selected, setSelected] = useState([]); // array of YYYY-MM-DD
  const [task, setTask] = useState('shoot');
  const [requirements, setRequirements] = useState('');
  const [service, setService] = useState(100);

  useEffect(() => {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const res = [];
    for (let d=1; d<=28; d++) {
      const dt = new Date(year, month, d);
      res.push(dt.toISOString().slice(0,10));
    }
    setDates(res);
  }, []);

  const toggleDate = (d) => {
    setSelected(prev => prev.includes(d) ? prev.filter(x=>x!==d) : [...prev, d]);
  };

  const taskPrice = useMemo(() => (tasks.find(t=>t.key===task)?.price || 0), [task]);
  const subtotal = (basePrice + taskPrice) * selected.length;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + service + tax;

  return (
    <div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(7, 1fr)', gap:6 }}>
        {dates.map(d => (
          <button key={d} onClick={()=>toggleDate(d)} style={{ padding:8, border:'1px solid #ddd', background: selected.includes(d) ? '#1976d2' : '#fff', color: selected.includes(d) ? '#fff' : '#000' }}>
            {d.slice(8)}<div style={{ fontSize:12 }}>₹{basePrice}</div>
          </button>
        ))}
      </div>
      <div style={{ marginTop:12 }}>
        <div>Selected dates: {selected.join(', ') || 'None'}</div>
      </div>
      <div style={{ marginTop:12 }}>
        <label>Task</label>
        <select value={task} onChange={(e)=>setTask(e.target.value)} style={{ marginLeft:8 }}>
          {tasks.map(t => <option key={t.key} value={t.key}>{t.label}</option>)}
        </select>
      </div>
      <div style={{ marginTop:12 }}>
        <label>Requirements</label>
        <textarea value={requirements} onChange={(e)=>setRequirements(e.target.value)} rows={2} style={{ width:'100%', padding:6 }} placeholder="Lighting, props, etc." />
      </div>
      <div style={{ marginTop:12 }}>
        <div>Subtotal: ₹{subtotal.toFixed(0)}</div>
        <div>Service Charges: ₹{service}</div>
        <div>Tax: ₹{tax}</div>
        <div style={{ fontWeight:700 }}>Total: ₹{total.toFixed(0)}</div>
      </div>
      <button style={{ marginTop:12, background:'#1976d2', color:'#fff', border:'none', borderRadius:4, padding:'10px 12px' }} onClick={()=>{
        if (instantBooking) {
          alert('Redirecting to payment...');
        } else {
          alert('Booking requested');
        }
      }}>Continue booking</button>
    </div>
  );
}


