export default function App(){
 return (
  <div style={{fontFamily:'Arial', padding:0, margin:0}}>
    <div style={{background:'#1e40af', color:'white', padding:'20px', textAlign:'center'}}>
      <h1 style={{margin:0}}>PHOENIX AROGYAM & JYOTISH KENDRA</h1>
      <p>Moradabad | Arogyam + Jyotish</p>
    </div>
    <div style={{display:'flex'}}>
      <div style={{flex:1, background:'#eff6ff', padding:'40px'}}>
        <h2>🏥 AROGYAM</h2>
        <p>Panchkarma, Ayurveda, Cardiology, Emergency 24/7</p>
        <button style={{background:'#1e40af', color:'white', padding:'10px 20px', border:'none', borderRadius:'20px'}}>Book Checkup</button>
      </div>
      <div style={{flex:1, background:'#fef2f2', padding:'40px'}}>
        <h2>🔮 JYOTISH</h2>
        <p>Kundali, Vastu, Rashi, Grah Shanti - Expert Acharya</p>
        <button style={{background:'#dc2626', color:'white', padding:'10px 20px', border:'none', borderRadius:'20px'}}>Kundali Dekho</button>
      </div>
    </div>
    <div style={{background:'black', color:'white', padding:'20px', textAlign:'center'}}>Call: 99999 99999 | Moradabad</div>
  </div>
 )
}