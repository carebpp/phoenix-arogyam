import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [phone, setPhone] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if(phone.length >= 10){
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('phone', phone)
      navigate('/')
    } else {
      alert('10 digit phone number daliye')
    }
  }

  return (
    <div style={{minHeight:'100vh', display:'flex', justifyContent:'center', alignItems:'center', background:'linear-gradient(135deg, #e0f2f1, #f0f9ff)', fontFamily:'sans-serif'}}>
      <form onSubmit={handleLogin} style={{background:'white', padding:'40px', borderRadius:'20px', boxShadow:'0 20px 60px rgba(0,0,0,0.1)', width:'380px', textAlign:'center'}}>
        <h1 style={{color:'#0f766e', marginBottom:'5px'}}>Phoenix Arogyam</h1>
        <p style={{color:'#64748b', marginBottom:'30px'}}>Care Beyond Prescription</p>
        <h3 style={{marginBottom:'20px'}}>Login</h3>
        <input 
          type="tel" 
          placeholder="Phone Number" 
          value={phone}
          onChange={e=>setPhone(e.target.value)}
          style={{width:'100%', padding:'14px', borderRadius:'10px', border:'1px solid #cbd5e1', marginBottom:'20px', fontSize:'16px', boxSizing:'border-box'}} 
          required
        />
        <button type="submit" style={{width:'100%', padding:'14px', background:'#0f766e', color:'white', border:'none', borderRadius:'10px', fontSize:'16px', fontWeight:'bold', cursor:'pointer'}}>
          Login
        </button>
        <p style={{marginTop:'20px', fontSize:'13px', color:'#94a3b8'}}>Bareilly • Live at phoenixarogyam.netlify.app</p>
      </form>
    </div>
  )
}
