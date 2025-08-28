import React, { useState } from 'react';

export default function MyBookings() {
  const [tab, setTab] = useState('ongoing');
  const demo = [
    {
      id: 'A025421', studioName: 'Metal Dubbing House', studioType: 'Audio', total: 18000, status: 'Pending request', date: '01 Jan 2023', time: '10:00 - 11:00 AM', requirements: 'Vocal editor role', canEdit: true
    },
    {
      id: 'A025422', studioName: 'AWIC Dubbing studio', studioType: 'Audio', total: 18000, status: 'Pending request', date: '20 Jan 2023', time: '10:00 - 11:00 AM', requirements: 'Vocal editor role', canEdit: true
    },
    {
      id: 'A025423', studioName: 'Mansi Shooting House', studioType: 'Shooting', total: 15000, status: 'Confirmed', date: '01 Jan 2023', time: '10:00 - 11:00 AM', requirements: 'Manual shooting role', canReschedule: true
    },
    {
      id: 'A025424', studioName: 'AWIC Dubbing studio', studioType: 'Audio', total: 18000, status: 'Confirmed', date: '02 Jan 2023', time: '10:00 - 11:00 AM', requirements: 'Junior mixing engineer', canReschedule: true
    },
  ];
  return (
    <div style={{ minHeight: '100vh', background: '#fff', color: '#000', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 0, flex: 1, background: '#fff' }}>
        <aside style={{ background: '#fafbfc', borderRight: '1px solid #eee', padding: '32px 0 0 0', minHeight: 600 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start', paddingLeft: 32 }}>
            <button style={{ background: 'none', color: '#222', border: 'none', borderRadius: 8, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, width: '100%', fontWeight: 600, cursor: 'pointer' }}>
              <svg width="18" height="18" fill="none" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="5" r="3"/><path d="M2 16c0-2.2 3-4 7-4s7 1.8 7 4"/></svg>
              My Account
            </button>
            <button style={{ background: '#e3f0fd', color: '#222', border: 'none', borderRadius: 8, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, width: '100%', fontWeight: 700, cursor: 'pointer' }}>
              <svg width="18" height="18" fill="none" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="12" height="8" rx="2"/><path d="M7 8V6a2 2 0 1 1 4 0v2"/></svg>
              My Bookings
            </button>
            <button style={{ background: 'none', color: '#222', border: 'none', borderRadius: 8, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, width: '100%', fontWeight: 600, cursor: 'pointer' }}>
              <svg width="18" height="18" fill="none" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6a4 4 0 0 1 8 0c0 2.2-2 4-4 4s-4-1.8-4-4z"/><path d="M2 16c0-2.2 3-4 7-4s7 1.8 7 4"/></svg>
              Saved studios
            </button>
          </div>
        </aside>
        <main style={{ padding: '48px 48px 0 48px', minHeight: 600 }}>
          <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
            <button onClick={()=>setTab('ongoing')} style={{ background: tab==='ongoing' ? '#1976d2' : '#f2f2f2', color: tab==='ongoing' ? '#fff' : '#000', border:'none', borderRadius: 6, padding:'10px 24px', fontWeight: 600, fontSize: 16 }}>Ongoing</button>
            <button onClick={()=>setTab('past')} style={{ background: tab==='past' ? '#1976d2' : '#f2f2f2', color: tab==='past' ? '#fff' : '#000', border:'none', borderRadius: 6, padding:'10px 24px', fontWeight: 600, fontSize: 16 }}>Past booking</button>
          </div>
          <div style={{ maxWidth: 900 }}>
            {demo.filter(b => tab==='ongoing' ? b.status!=='Completed' : b.status==='Completed').map(b => (
              <div key={b.id} style={{ border:'1px solid #eee', borderRadius:12, padding:24, marginBottom:24, background:'#fff', boxShadow:'0 2px 8px #0001' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 8 }}>
                  <div style={{ fontWeight:700, fontSize:16 }}>Booking ID <span style={{ color:'#1976d2' }}>{b.id}</span></div>
                  <div style={{ fontWeight:600, fontSize:15 }}>{b.studioType} Studio</div>
                  <div style={{ fontWeight:600, fontSize:15 }}>Total charge <span style={{ color:'#1976d2' }}>₹ {b.total}</span></div>
                  <div style={{ fontWeight:600, fontSize:15 }}>{b.date}</div>
                  <div style={{ fontWeight:600, fontSize:15 }}>{b.time}</div>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 8 }}>
                  <div style={{ fontWeight:500, fontSize:15 }}>Studio Name: <span style={{ color:'#222' }}>{b.studioName}</span></div>
                  <div style={{ fontWeight:500, fontSize:15 }}>Status: <span style={{ color:'#1976d2' }}>{b.status}</span></div>
                </div>
                <div style={{ fontSize:14, color:'#555', marginBottom: 8 }}>Requirements: <span style={{ color:'#222' }}>{b.requirements}</span></div>
                <div style={{ display:'flex', gap:8, justifyContent:'flex-end' }}>
                  {b.canEdit && <button style={{ border:'1px solid #1976d2', background:'#fff', color:'#1976d2', borderRadius:6, padding:'6px 18px', fontWeight:600, cursor:'pointer' }}>Edit</button>}
                  {b.canEdit && <button style={{ border:'1px solid #ddd', background:'#fff', color:'#222', borderRadius:6, padding:'6px 18px', fontWeight:600, cursor:'pointer' }}>Cancel</button>}
                  {b.canReschedule && <button style={{ border:'1px solid #1976d2', background:'#fff', color:'#1976d2', borderRadius:6, padding:'6px 18px', fontWeight:600, cursor:'pointer' }}>Reschedule</button>}
                  {b.canReschedule && <button style={{ border:'1px solid #ddd', background:'#fff', color:'#222', borderRadius:6, padding:'6px 18px', fontWeight:600, cursor:'pointer' }}>Cancel</button>}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      <footer style={{ background: '#f5f5f5', borderTop: '1px solid #eee', padding: '32px 0 0 0', marginTop: 48 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', maxWidth: 1200, margin: '0 auto', padding: '0 48px' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>LOGO</div>
            <div style={{ fontSize: 14, margin: '8px 0' }}>20 XYZ Road, India<br/>A81 2CD</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <span>🌐</span><span>🔗</span><span>🔗</span><span>🔗</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14 }}>
            <a href="#">About Us</a>
            <a href="#">Contact Us</a>
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
        <div style={{ textAlign: 'center', fontSize: 13, color: '#888', marginTop: 24, paddingBottom: 12 }}>
          Privacy | Terms | Legal<br/>
          Product Name © 2023
        </div>
      </footer>
    </div>
  );
}


