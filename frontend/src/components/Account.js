import React, { useState } from 'react';
import MyBookings from './MyBookings';
import SavedStudios from './SavedStudios';

const salutationOptions = ['Mr.', 'Ms.', 'Mrs.', 'Dr.', 'Prof.'];

export default function Account() {
  const [tab, setTab] = useState('details');
  const [salutation, setSalutation] = useState('Ms.');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState('');
  const [oldPw, setOldPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [newPw2, setNewPw2] = useState('');

  const saveDetails = () => {
    alert('Saved personal details (demo).');
  };
  const changePassword = () => {
    if (newPw !== newPw2) { alert('Passwords do not match'); return; }
    alert('Password updated (demo).');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fff', color: '#000', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 0, flex: 1, background: '#fff' }}>
        <aside style={{ background: '#fafbfc', borderRight: '1px solid #eee', padding: '32px 0 0 0', minHeight: 600 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start', paddingLeft: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: 18, marginBottom: 24 }}>
              <svg width="22" height="22" fill="none" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="7" r="4"/><path d="M3 20c0-2.5 4-4 8-4s8 1.5 8 4"/></svg>
              My Account
            </div>
            <button onClick={()=>setTab('details')} style={{ background: tab==='details' ? '#e3f0fd' : 'none', color: '#222', border: 'none', borderRadius: 8, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, width: '100%', fontWeight: 600, cursor: 'pointer' }}>
              <svg width="18" height="18" fill="none" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="5" r="3"/><path d="M2 16c0-2.2 3-4 7-4s7 1.8 7 4"/></svg>
              Personal details
            </button>
            <button onClick={()=>setTab('password')} style={{ background: tab==='password' ? '#e3f0fd' : 'none', color: '#222', border: 'none', borderRadius: 8, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, width: '100%', fontWeight: 600, cursor: 'pointer' }}>
              <svg width="18" height="18" fill="none" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="12" height="8" rx="2"/><path d="M7 8V6a2 2 0 1 1 4 0v2"/></svg>
              Change password
            </button>
            <button onClick={()=>setTab('bookings')} style={{ background: tab==='bookings' ? '#e3f0fd' : 'none', color: '#222', border: 'none', borderRadius: 8, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, width: '100%', fontWeight: 600, cursor: 'pointer' }}>
              <svg width="18" height="18" fill="none" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="12" height="8" rx="2"/><path d="M7 8V6a2 2 0 1 1 4 0v2"/></svg>
              My Bookings
            </button>
            <button onClick={()=>setTab('saved')} style={{ background: tab==='saved' ? '#e3f0fd' : 'none', color: '#222', border: 'none', borderRadius: 8, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, width: '100%', fontWeight: 600, cursor: 'pointer' }}>
              <svg width="18" height="18" fill="none" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6a4 4 0 0 1 8 0c0 2.2-2 4-4 4s-4-1.8-4-4z"/><path d="M2 16c0-2.2 3-4 7-4s7 1.8 7 4"/></svg>
              Saved studios
            </button>
          </div>
        </aside>
        <main style={{ padding: '48px 48px 0 48px', minHeight: 600 }}>
          {tab==='details' && (
            <div style={{ maxWidth: 520 }}>
              <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 24 }}>Personal Details</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 24 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <div style={{ fontSize: 13, marginBottom: 4 }}>Change photo</div>
                  <input value={photo} onChange={(e)=>setPhoto(e.target.value)} placeholder="Photo URL" style={{ width: 120, padding: 6, fontSize: 13 }} />
                  {photo && <img alt="profile" src={photo} style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', marginTop: 8 }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontWeight: 500, fontSize: 15 }}>Salutation</label>
                    <select value={salutation} onChange={e=>setSalutation(e.target.value)} style={{ width: '100%', padding: 8, fontSize: 15, borderRadius: 6, border: '1px solid #ddd', marginTop: 4 }}>
                      {salutationOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontWeight: 500, fontSize: 15 }}>First Name</label>
                      <input value={first} onChange={e=>setFirst(e.target.value)} style={{ width: '100%', padding: 8, fontSize: 15, borderRadius: 6, border: '1px solid #ddd', marginTop: 4 }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontWeight: 500, fontSize: 15 }}>Last Name</label>
                      <input value={last} onChange={e=>setLast(e.target.value)} style={{ width: '100%', padding: 8, fontSize: 15, borderRadius: 6, border: '1px solid #ddd', marginTop: 4 }} />
                    </div>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontWeight: 500, fontSize: 15 }}>Email address</label>
                    <input value={email} onChange={e=>setEmail(e.target.value)} style={{ width: '100%', padding: 8, fontSize: 15, borderRadius: 6, border: '1px solid #ddd', marginTop: 4 }} />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontWeight: 500, fontSize: 15 }}>Phone Number</label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <input value={'+44'} disabled style={{ width: 60, padding: 8, fontSize: 15, borderRadius: 6, border: '1px solid #ddd', background: '#f2f2f2', color: '#888', marginTop: 4 }} />
                      <input value={phone} onChange={e=>setPhone(e.target.value)} style={{ flex: 1, padding: 8, fontSize: 15, borderRadius: 6, border: '1px solid #ddd', marginTop: 4 }} />
                    </div>
                  </div>
                </div>
              </div>
              <button onClick={saveDetails} style={{ marginTop: 12, background: '#222', color: '#fff', border: 'none', borderRadius: 6, padding: '14px 0', width: 240, fontWeight: 700, fontSize: 16, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>Save</button>
            </div>
          )}
          {tab==='password' && (
            <div style={{ maxWidth: 420 }}>
              <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 24 }}>Change Password</div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontWeight: 500, fontSize: 15 }}>Old password</label>
                <input type="password" value={oldPw} onChange={(e)=>setOldPw(e.target.value)} style={{ width: '100%', padding: 8, fontSize: 15, borderRadius: 6, border: '1px solid #ddd', marginTop: 4 }} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontWeight: 500, fontSize: 15 }}>New password</label>
                <input type="password" value={newPw} onChange={(e)=>setNewPw(e.target.value)} style={{ width: '100%', padding: 8, fontSize: 15, borderRadius: 6, border: '1px solid #ddd', marginTop: 4 }} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontWeight: 500, fontSize: 15 }}>Confirm new password</label>
                <input type="password" value={newPw2} onChange={(e)=>setNewPw2(e.target.value)} style={{ width: '100%', padding: 8, fontSize: 15, borderRadius: 6, border: '1px solid #ddd', marginTop: 4 }} />
              </div>
              <button onClick={changePassword} style={{ marginTop: 12, background: '#222', color: '#fff', border: 'none', borderRadius: 6, padding: '14px 0', width: 180, fontWeight: 700, fontSize: 16, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>Submit</button>
            </div>
          )}
          {tab==='bookings' && (
            <div style={{ maxWidth: 1000 }}>
              <MyBookings />
            </div>
          )}
          {tab==='saved' && (
            <div style={{ maxWidth: 1000 }}>
              <SavedStudios />
            </div>
          )}
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


