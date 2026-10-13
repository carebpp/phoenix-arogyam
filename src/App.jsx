import React from 'react'

export default function App() {
  return (
    <div style={{fontFamily:'sans-serif', margin:0}}>
      {/* HEADER */}
      <div style={{display:'flex', justifyContent:'space-between', padding:'15px 30px', background:'white', boxShadow:'0 2px 10px #eee', position:'sticky', top:0, zIndex:10}}>
        <h1 style={{margin:0, color:'#1e40af', fontWeight:900}}>PHOENIX <span style={{color:'#dc2626'}}>AROGYAM</span> & JYOTISH</h1>
        <div style={{display:'flex', gap:'10px'}}>
          <button style={{background:'#1e40af', color:'white', padding:'8px 18px', borderRadius:'20px', border:'none'}}>Arogyam</button>
          <button style={{background:'#dc2626', color:'white', padding:'8px 18px', borderRadius:'20px', border:'none'}}>Jyotish</button>
        </div>
      </div>

      {/* HERO - DONO */}
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0', minHeight:'500px'}}>
        {/* Arogyam Side */}
        <div style={{background:'#eff6ff', padding:'50px', display:'flex', flexDirection:'column', justifyContent:'center'}}>
          <span style={{background:'#dbeafe', color:'#1e40af', padding:'5px 15px', borderRadius:'20px', width:'fit-content', fontWeight:'bold'}}>🏥 AROGYAM</span>
          <h1 style={{fontSize:'42px', lineHeight:'1.1', margin:'15px 0'}}>Swasth Sharir,<br/>Swasth Jeevan</h1>
          <p style={{color:'#555'}}>Advanced Ayurveda + Modern Medicine. Panchkarma, Cardiology, Neurology. Best Doctors in Moradabad.</p>
          <button style={{marginTop:'20px', background:'#1e40af', color:'white', padding:'12px 25px', borderRadius:'25px', border:'none', width:'fit-content', fontWeight:'bold'}}>Book Health Checkup →</button>
        </div>
        {/* Jyotish Side */}
        <div style={{background:'#fef2f2', padding:'50px', display:'flex', flexDirection:'column', justifyContent:'center'}}>
          <span style={{background:'#fee2e2', color:'#dc2626', padding:'5px 15px', borderRadius:'20px', width:'fit-content', fontWeight:'bold'}}>🔮 JYOTISH</span>
          <h1 style={{fontSize:'42px', lineHeight:'1.1', margin:'15px 0'}}>Bhagya Ka Sahi<br/>Margdarshan</h1>
          <p style={{color:'#555'}}>Expert Jyotish Acharya. Kundali Milan, Vastu, Rashi. 100% Accurate Prediction & Upay.</p>
          <button style={{marginTop:'20px', background:'#dc2626', color:'white', padding:'12px 25px', borderRadius:'25px', border:'none', width:'fit-content', fontWeight:'bold'}}>Kundali Dikhao →</button>
        </div>
      </div>

      {/* SERVICES */}
      <div style={{padding:'50px 20px', textAlign:'center'}}>
        <h2 style={{fontSize:'32px'}}>Hamari Sewaayein</h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'20px', maxWidth:'1000px', margin:'30px auto'}}>
          <div style={{border:'1px solid #e5e7eb', padding:'25px', borderRadius:'15px'}}><h3>🩺 Arogyam</h3><p style={{fontSize:'13px', color:'#666'}}>Panchkarma, Nadi Pariksha, Ayurvedic Treatment</p></div>
          <div style={{border:'1px solid #e5e7eb', padding:'25px', borderRadius:'15px'}}><h3>🔮 Jyotish</h3><p style={{fontSize:'13px', color:'#666'}}>Janam Kundali, Hast Rekha, Vastu Shanti</p></div>
          <div style={{border:'1px solid #e5e7eb', padding:'25px', borderRadius:'15px'}}><h3>💊 Pharmacy</h3><p style={{fontSize:'13px', color:'#666'}}>Pure Ayurvedic Medicines & Herbs</p></div>
          <div style={{border:'1px solid #e5e7eb', padding:'25px', borderRadius:'15px'}}><h3>🕉️ Pooja Path</h3><p style={{fontSize:'13px', color:'#666'}}>Maha Mrityunjay, Grah Shanti Pooja</p></div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{background:'#111827', color:'white', padding:'30px', textAlign:'center'}}>
        <h3>PHOENIX AROGYAM & JYOTISH KENDRA, Moradabad</h3>
        <p style={{color:'#9ca3af'}}>Arogyam: 24/7 Emergency | Jyotish: 9AM - 8PM | Call: +91 99999 99999</p>
      </div>
    </div>
  )
}