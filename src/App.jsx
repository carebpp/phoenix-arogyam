import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple login for demo - aap baad me asli auth lagana
    if(email && pass){
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/');
    }
  }

  return (
    <div style={{minHeight:'100vh', display:'flex', justifyContent:'center', alignItems:'center', background:'#f0f9ff'}}>
      <form onSubmit={handleLogin} style={{background:'white', padding:'40px', borderRadius:'16px', boxShadow:'0 10px 30px rgba(0,0,0,0.1)', width:'350px'}}>
        <h2 style={{textAlign:'center', color:'#0e7490', marginBottom:'5px'}}>Phoenix Arogyam</h2>
        <p style={{textAlign:'center', color:'#666', marginBottom:'25px'}}>Care Beyond Prescription</p>
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%', padding:'12px', marginBottom:'15px', borderRadius:'8px', border:'1px solid #ddd'}} required />
        <input type="password" placeholder="Password" value={pass} onChange={e=>setPass(e.target.value)} style={{width:'100%', padding:'12px', marginBottom:'20px', borderRadius:'8px', border:'1px solid #ddd'}} required />
        <button type="submit" style={{width:'100%', padding:'12px', background:'#0891b2', color:'white', border:'none', borderRadius:'8px', fontWeight:'bold', cursor:'pointer'}}>Login</button>
      </form>
    </div>
  )
}

function Dashboard() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  }
  return (
    <div style={{minHeight:'100vh', background:'#f8fafc'}}>
      <div style={{background:'white', padding:'15px 30px', display:'flex', justifyContent:'space-between', alignItems:'center', boxShadow:'0 2px 10px rgba(0,0,0,0.05)'}}>
        <h3 style={{color:'#0e7490', margin:0}}>Phoenix Arogyam Dashboard</h3>
        <button onClick={logout} style={{padding:'8px 16px', background:'#ef4444', color:'white', border:'none', borderRadius:'6px'}}>Logout</button>
      </div>
      <div style={{padding:'40px', textAlign:'center'}}>
        <h1 style={{color:'#334155'}}>Welcome! 🎉</h1>
        <p style={{color:'#64748b', fontSize:'18px'}}>Your site is LIVE at phoenixarogyam.netlify.app</p>
        <div style={{marginTop:'30px', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'20px', maxWidth:'800px', margin:'30px auto'}}>
          <div style={{background:'white', padding:'20px', borderRadius:'12px', boxShadow:'0 4px 12px rgba(0,0,0,0.05)'}}><h4>Patients</h4><h2>124</h2></div>
          <div style={{background:'white', padding:'20px', borderRadius:'12px', boxShadow:'0 4px 12px rgba(0,0,0,0.05)'}}><h4>Appointments</h4><h2>18</h2></div>
          <div style={{background:'white', padding:'20px', borderRadius:'12px', boxShadow:'0 4px 12px rgba(0,0,0,0.05)'}}><h4>Revenue</h4><h2>₹42k</h2></div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </HashRouter>
  )
}import { HashRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute.jsx'
import Login from './pages/login.jsx'
import Dashboard from './pages/dashboard.jsx'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </HashRouter>
  )
}
