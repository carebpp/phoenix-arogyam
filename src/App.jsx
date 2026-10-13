import React from 'react'

export default function App() {
  return (
    <div style={{fontFamily:'Arial'}}>
      <div style={{background:'#2563eb', color:'white', padding:'20px', display:'flex', justifyContent:'space-between'}}>
        <h1 style={{margin:0}}>PHOENIX AROGYAM</h1>
        <button style={{background:'white', color:'#2563eb', padding:'8px 20px', borderRadius:'20px', border:'none', fontWeight:'bold'}}>Book Appointment</button>
      </div>
      <div style={{padding:'60px 20px', textAlign:'center', background:'#eff6ff'}}>
        <h1 style={{fontSize:'48px', margin:0}}>Your Health is Our Priority</h1>
        <p style={{fontSize:'20px', color:'#555'}}>Best Healthcare in Moradabad | 24/7 Emergency</p>
        <button style={{marginTop:'20px', background:'#2563eb', color:'white', padding:'15px 30px', borderRadius:'30px', border:'none', fontSize:'18px', fontWeight:'bold'}}>Emergency Call: 108</button>
      </div>
      <div style={{padding:'40px', textAlign:'center'}}>
        <h2>Our Specialities: Cardiology | Neurology | Orthopedics | Emergency</h2>
        <p style={{marginTop:'30px'}}>© 2026 Phoenix Arogyam Hospital, Moradabad</p>
      </div>
    </div>
  )
}