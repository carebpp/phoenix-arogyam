import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()
  const phone = localStorage.getItem('phone') || 'User'

  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div style={{minHeight:'100vh', background:'#f0fdfa', fontFamily:'sans-serif'}}>
      {/* Header */}
      <div style={{background:'white', padding:'15px 30px', display:'flex', justifyContent:'space-between', alignItems:'center', boxShadow:'0 2px 10px rgba(0,0,0,0.05)'}}>
        <div>
          <h2 style={{margin:0, color:'#0f766e'}}>Phoenix Arogyam</h2>
          <small style={{color:'#64748b'}}>Care Beyond Prescription • Bareilly</small>
        </div>
        <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
          <span style={{fontSize:'14px', color:'#334155'}}>{phone}</span>
          <button onClick={logout} style={{padding:'8px 16px', background:'#ef4444', color:'white', border:'none', borderRadius:'8px', cursor:'pointer'}}>Logout</button>
        </div>
      </div>

      {/* Content */}
      <div style={{padding:'30px', maxWidth:'1000px', margin:'0 auto'}}>
        <h1 style={{color:'#134e4a'}}>Welcome! 🎉</h1>
        <p style={{color:'#475569'}}>Status: <b style={{color:'green'}}>Offline OK</b> - Your app is working perfectly!</p>

        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:'20px', marginTop:'30px'}}>
          <div style={{background:'white', padding:'25px', borderRadius:'16px', boxShadow:'0 4px 20px rgba(0,0,0,0.05)'}}>
            <p style={{margin:0, color:'#64748b'}}>Total Patients</p>
            <h2 style={{margin:'10px 0', color:'#0f766e'}}>124</h2>
            <small style={{color:'#10b981'}}>+12 this week</small>
          </div>
          <div style={{background:'white', padding:'25px', borderRadius:'16px', boxShadow:'0 4px 20px rgba(0,0,0,0.05)'}}>
            <p style={{margin:0, color:'#64748b'}}>Appointments</p>
            <h2 style={{margin:'10px 0', color:'#0f766e'}}>18</h2>
            <small style={{color:'#f59e0b'}}>5 Today</small>
          </div>
          <div style={{background:'white', padding:'25px', borderRadius:'16px', boxShadow:'0 4px 20px rgba(0,0,0,0.05)'}}>
            <p style={{margin:0, color:'#64748b'}}>Revenue</p>
            <h2 style={{margin:'10px 0', color:'#0f766e'}}>₹42,000</h2>
            <small style={{color:'#10b981'}}>+8% growth</small>
          </div>
          <div style={{background:'white', padding:'25px', borderRadius:'16px', boxShadow:'0 4px 20px rgba(0,0,0,0.05)'}}>
            <p style={{margin:0, color:'#64748b'}}>Live Status</p>
            <h2 style={{margin:'10px 0', color:'#10b981'}}>● Online</h2>
            <small>phoenixarogyam.netlify.app</small>
          </div>
        </div>

        <div style={{background:'white', padding:'25px', borderRadius:'16px', marginTop:'25px', boxShadow:'0 4px 20px rgba(0,0,0,0.05)'}}>
          <h3 style={{marginTop:0, color:'#334155'}}>Next Steps</h3>
          <ul style={{color:'#475569', lineHeight:'1.8'}}>
            <li>✅ Login Page - DONE (Beautiful)</li>
            <li>✅ Dashboard - DONE (Now Premium)</li>
            <li>🔜 Patient Management Add Karna</li>
            <li>🔜 Supabase Connect Karna</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
