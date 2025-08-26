import React, { useState } from 'react';

export default function Account() {
  const [tab, setTab] = useState('details');
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
    <div style={{ display:'grid', gridTemplateColumns:'220px 1fr', gap:16, padding:24, background:'#fff', color:'#000' }}>
      <aside>
        <div style={{ fontWeight:700, marginBottom:12 }}>My Account</div>
        <div><button onClick={()=>setTab('details')}>Personal details</button></div>
        <div><button onClick={()=>setTab('password')}>Change password</button></div>
      </aside>
      <main>
        <div style={{ display:'flex', gap:8, marginBottom:12 }}>
          <button onClick={()=>setTab('details')} style={{ background: tab==='details' ? '#000' : '#f2f2f2', color: tab==='details' ? '#fff' : '#000', border:'none', borderRadius:4, padding:'6px 10px' }}>Personal details</button>
          <button onClick={()=>setTab('password')} style={{ background: tab==='password' ? '#000' : '#f2f2f2', color: tab==='password' ? '#fff' : '#000', border:'none', borderRadius:4, padding:'6px 10px' }}>Change password</button>
        </div>
        {tab==='details' && (
          <div>
            <div>
              <label>Profile photo URL</label>
              <input value={photo} onChange={(e)=>setPhoto(e.target.value)} placeholder="https://..." style={{ width:'100%', padding:8 }} />
              {photo && <img alt="profile" src={photo} style={{ width:80, height:80, borderRadius:'50%', objectFit:'cover', marginTop:8 }} />}
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:12 }}>
              <div>
                <label>First name</label>
                <input value={first} onChange={(e)=>setFirst(e.target.value)} style={{ width:'100%', padding:8 }} />
              </div>
              <div>
                <label>Last name</label>
                <input value={last} onChange={(e)=>setLast(e.target.value)} style={{ width:'100%', padding:8 }} />
              </div>
            </div>
            <div style={{ marginTop:12 }}>
              <label>Email</label>
              <input value={email} onChange={(e)=>setEmail(e.target.value)} style={{ width:'100%', padding:8 }} />
            </div>
            <div style={{ marginTop:12 }}>
              <label>Phone</label>
              <input value={phone} onChange={(e)=>setPhone(e.target.value)} style={{ width:'100%', padding:8 }} />
            </div>
            <button onClick={saveDetails} style={{ marginTop:12, background:'#000', color:'#fff', border:'none', borderRadius:4, padding:'10px 12px' }}>Save</button>
          </div>
        )}
        {tab==='password' && (
          <div>
            <div>
              <label>Old password</label>
              <input type="password" value={oldPw} onChange={(e)=>setOldPw(e.target.value)} style={{ width:'100%', padding:8 }} />
            </div>
            <div style={{ marginTop:12 }}>
              <label>New password</label>
              <input type="password" value={newPw} onChange={(e)=>setNewPw(e.target.value)} style={{ width:'100%', padding:8 }} />
            </div>
            <div style={{ marginTop:12 }}>
              <label>Confirm new password</label>
              <input type="password" value={newPw2} onChange={(e)=>setNewPw2(e.target.value)} style={{ width:'100%', padding:8 }} />
            </div>
            <button onClick={changePassword} style={{ marginTop:12, background:'#000', color:'#fff', border:'none', borderRadius:4, padding:'10px 12px' }}>Submit</button>
          </div>
        )}
      </main>
    </div>
  );
}


