import React, { useState } from 'react';

export default function MyBookings() {
  const [tab, setTab] = useState('ongoing');
  const demo = [
    { id: 'BKG-0001', studioName: 'Studio 1', studioType: 'Audio', dates: 'Aug 28, 2:00-3:30 PM', total: 840, status: 'Pending request' },
    { id: 'BKG-0002', studioName: 'Studio 2', studioType: 'Video', dates: 'Aug 29, 11:00-1:00 PM', total: 1320, status: 'Approved' },
  ];
  return (
    <div style={{ display:'grid', gridTemplateColumns:'220px 1fr', gap:16, padding:24, background:'#fff', color:'#000' }}>
      <aside>
        <div style={{ fontWeight:700, marginBottom:12 }}>My Bookings</div>
        <div><button onClick={()=>setTab('ongoing')}>Ongoing</button></div>
        <div><button onClick={()=>setTab('past')}>Past booking</button></div>
      </aside>
      <main>
        <div style={{ display:'flex', gap:8, marginBottom:12 }}>
          <button onClick={()=>setTab('ongoing')} style={{ background: tab==='ongoing' ? '#000' : '#f2f2f2', color: tab==='ongoing' ? '#fff' : '#000', border:'none', borderRadius:4, padding:'6px 10px' }}>Ongoing</button>
          <button onClick={()=>setTab('past')} style={{ background: tab==='past' ? '#000' : '#f2f2f2', color: tab==='past' ? '#fff' : '#000', border:'none', borderRadius:4, padding:'6px 10px' }}>Past booking</button>
        </div>
        {demo.map(b => (
          <div key={b.id} style={{ border:'1px solid #eee', borderRadius:8, padding:12, marginBottom:12 }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr auto', alignItems:'center' }}>
              <div>
                <div style={{ fontWeight:700 }}>{b.id}</div>
                <div>{b.studioName} · {b.studioType}</div>
                <div>{b.dates}</div>
                <div>Total ₹{b.total}</div>
                <div>Status: {b.status}</div>
              </div>
              <div style={{ display:'flex', gap:8 }}>
                {b.status==='Pending request' && (<>
                  <button>Edit</button><button>Cancel</button>
                </>)}
                {b.status==='Approved' && (<>
                  <button>Reschedule</button><button>Cancel</button>
                </>)}
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}


