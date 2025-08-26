import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Confirmation() {
  const navigate = useNavigate();
  const params = new URLSearchParams(useLocation().search);
  const requested = params.get('requested') === 'true';

  return (
    <div style={{ display:'flex', minHeight:'80vh', alignItems:'center', justifyContent:'center', background:'#fff', color:'#000' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ width:72, height:72, borderRadius:'50%', background: requested ? '#000' : '#1976d2', color:'#fff', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:32, marginBottom:16 }}>
          {requested ? 'i' : '✓'}
        </div>
        <h2 style={{ margin:0 }}>{requested ? 'Your booking has been requested' : 'Payment successful'}</h2>
        {!requested && <p>We have sent you a confirmation email with the booking details.</p>}
        {requested && <p>We will notify you once the studio confirms your request.</p>}
        <button onClick={()=>navigate('/studios')} style={{ marginTop:16, background:'#fff', color:'#000', border:'1px solid #000', borderRadius:20, padding:'10px 18px' }}>Back to Home</button>
      </div>
    </div>
  );
}


