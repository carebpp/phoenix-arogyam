html, body {
  overflow-x: hidden;
  height: 100%;
  scroll-behavior: smooth;
}
import { useState, useEffect } from 'react'
import Dashboard from './pages/dashboard.jsx'
import Login from './pages/login.jsx'

function DashboardWithLogout() {
  const [currentMobile, setCurrentMobile] = useState('')
  const [allMobiles, setAllMobiles] = useState([])
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    setCurrentMobile(localStorage.getItem('phoenix_current_mobile') || '')
    try {
      const list = JSON.parse(localStorage.getItem('phoenix_mobiles') || '[]')
      setAllMobiles(list)
    } catch {}
  }, [])

  const logoutAll = async () => {
    try { await fetch("/api/logout", { method: "POST", credentials: "include" }) } catch {}
    localStorage.clear()
    sessionStorage.clear()
    window.location.replace("/")
  }

  const switchMobile = (m) => {
    localStorage.setItem('phoenix_current_mobile', m)
    setCurrentMobile(m)
    setShowMenu(false)
    window.location.reload()
  }

  const logoutOne = (m) => {
    let list = []
    try { list = JSON.parse(localStorage.getItem('phoenix_mobiles') || '[]') } catch {}
    list = list.filter((x) => x !== m)
    localStorage.setItem('phoenix_mobiles', JSON.stringify(list))
    if (localStorage.getItem('phoenix_current_mobile') === m) {
      localStorage.removeItem('phoenix_current_mobile')
      window.location.replace("/")
      return
    }
    setAllMobiles(list)
    setShowMenu(false)
  }

  return (
    <div>
      {/* LOGOUT KA BADA KHANA - WEB PAGE PAR */}
      <div style={{background:'white', padding:'10px 15px', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, zIndex:100, boxShadow:'0 2px 10px rgba(0,0,0,0.1)'}}>
        <div>
          <b style={{color:'#0f766e'}}>Phoenix Arogyam</b>
          <div style={{fontSize:'10px', color:'#64748b'}}>Current: +91 {currentMobile}</div>
        </div>
        <div style={{display:'flex', gap:'8px', alignItems:'center'}}>
          <div style={{position:'relative'}}>
            <button onClick={()=>setShowMenu(!showMenu)} style={{background:'#f0fdfa', border:'1px solid #99f6e0', padding:'6px 12px', borderRadius:'20px', fontSize:'11px', fontWeight:'700'}}>
              📱 {allMobiles.length} Mobiles ▼
            </button>
            {showMenu && (
              <div style={{position:'absolute', right:0, top:'38px', background:'white', border:'1px solid #e2e8f0', borderRadius:'12px', padding:'10px', minWidth:'220px', boxShadow:'0 10px 30px rgba(0,0,0,0.15)', zIndex:200}}>
                <p style={{fontSize:'10px', color:'#64748b', margin:'0 0 6px'}}>Multi Mobile Login:</p>
                {allMobiles.map((m)=>(
                  <div key={m} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'6px 0', borderBottom:'1px solid #f1f5f9'}}>
                    <button onClick={()=>switchMobile(m)} style={{border:'none', background:m===currentMobile?'#0f766e':'#f1f5f9', color:m===currentMobile?'white':'#334155', padding:'5px 10px', borderRadius:'6px', fontSize:'11px', fontWeight:'700'}}>+91 {m} {m===currentMobile?'✓':''}</button>
                    <button onClick={()=>logoutOne(m)} style={{background:'#fee2e2', color:'#dc2626', border:'none', padding:'4px 8px', borderRadius:'6px', fontSize:'10px'}}>Logout</button>
                  </div>
                ))}
                <button onClick={()=>window.location.replace("/")} style={{width:'100%', marginTop:'8px', background:'#ecfeff', border:'1px dashed #0e7490', padding:'8px', borderRadius:'8px', fontSize:'11px', fontWeight:'700'}}>+ Add New Mobile Number</button>
              </div>
            )}
          </div>
          <button onClick={logoutAll} style={{background:'#ef4444', color:'white', border:'none', padding:'8px 18px', borderRadius:'8px', fontWeight:'800', fontSize:'12px'}}>LOGOUT</button>
        </div>
      </div>
      
      {/* Aapka Jyotish Dashboard */}
      <Dashboard />
    </div>
  )
}

export default function App(){
  const [isLogin, setIsLogin] = useState(false)

  useEffect(()=>{
    const token = localStorage.getItem('phoenix_current_mobile') || localStorage.getItem('phoenix_token')
    setIsLogin(!!token)
  },[])

  const path = window.location.pathname

  // Dashboard page
  if(path==='/dashboard'){
    if(!isLogin){
      window.location.replace('/')
      return null
    }
    return <DashboardWithLogout />
  }

  // Login page - agar already login hai to dashboard bhejo
  if(isLogin && path==='/'){
    window.location.replace('/dashboard')
    return null
  }

  return <Login />
}
