import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RASHIS = ["Mesh","Vrishabh","Mithun","Kark","Singh","Kanya","Tula","Vrishchik","Dhanu","Makar","Kumbh","Meen"]

function getRashiFromDOB(dob) {
  if(!dob) return ""
  const d = new Date(dob)
  const m = d.getMonth()+1
  const day = d.getDate()
  // Simple rashi logic for demo
  if((m==3 && day>=21) || (m==4 && day<=19)) return "Mesh"
  if((m==4 && day>=20) || (m==5 && day<=20)) return "Vrishabh"
  if((m==5 && day>=21) || (m==6 && day<=20)) return "Mithun"
  if((m==6 && day>=21) || (m==7 && day<=22)) return "Kark"
  if((m==7 && day>=23) || (m==8 && day<=22)) return "Singh"
  if((m==8 && day>=23) || (m==9 && day<=22)) return "Kanya"
  if((m==9 && day>=23) || (m==10 && day<=22)) return "Tula"
  if((m==10 && day>=23) || (m==11 && day<=21)) return "Vrishchik"
  if((m==11 && day>=22) || (m==12 && day<=21)) return "Dhanu"
  if((m==12 && day>=22) || (m==1 && day<=19)) return "Makar"
  if((m==1 && day>=20) || (m==2 && day<=18)) return "Kumbh"
  return "Meen"
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('kundli') // kundli, vivah, shubh
  const [form, setForm] = useState({naam:'', gotra:'', dob:'', samay:'', sthan:'', mobile:''})
  const [result, setResult] = useState(null)
  const [page, setPage] = useState(1) // 1,2,3 for results

  const rashi = getRashiFromDOB(form.dob)

  const handleSubmit = (e) => {
    e.preventDefault()
    if(form.mobile.length!==10) { alert('10 ank ka mobile daliye'); return; }
    const grah = ['Surya','Chandra','Mangal','Budh','Guru','Shukra','Shani'][Math.floor(Math.random()*7)]
    setResult({...form, rashi, grah, dasha: 'Shani Mahadasha'})
    setPage(1)
  }

  const logout = () => { localStorage.clear(); navigate('/login') }

  if(result){
    return (
      <div style={{minHeight:'100vh', background:'#fef9ec', padding:'15px', fontFamily:'system-ui'}}>
        <div style={{maxWidth:'420px', margin:'0 auto', background:'white', borderRadius:'20px', border:'2px solid #f59e0b', overflow:'hidden'}}>
          <div style={{background:'linear-gradient(90deg,#f97316,#fb923c)', padding:'12px', display:'flex', justifyContent:'space-between'}}>
            <button onClick={()=>setPage(Math.max(1,page-1))} style={{background:'white', border:'none', padding:'6px 12px', borderRadius:'8px'}}>◀</button>
            <span style={{color:'white', fontWeight:'bold'}}>Page {page}/3</span>
            <button onClick={()=>{if(page<3) setPage(page+1); else setResult(null)}} style={{background:'white', border:'none', padding:'6px 12px', borderRadius:'8px'}}>{page<3?'▶':'✕'}</button>
          </div>
          
          {page===1 && (
            <div style={{padding:'20px'}}>
              <h2 style={{textAlign:'center', color:'#92400e'}}>🔱 Janm Kundli</h2>
              <div style={{background:'#fffbeb', padding:'15px', borderRadius:'12px', border:'1px solid #fde68a'}}>
                <p><b>Naam:</b> {result.naam}</p>
                <p><b>Gotra:</b> {result.gotra}</p>
                <p><b>Rashi:</b> {result.rashi} (Auto)</p>
                <p><b>Janm Tithi:</b> {result.dob}</p>
                <p><b>Grah:</b> {result.grah} Pradhan</p>
                <p style={{marginTop:'10px', color:'#b45309'}}><b>Jyotish Phal:</b> Aapki kundli me {result.grah} shubh sthan par hai. {result.dasha} chal rahi hai. Karm me safalta milegi.</p>
              </div>
            </div>
          )}
          {page===2 && (
            <div style={{padding:'20px'}}>
              <h2 style={{textAlign:'center', color:'#be185d'}}>💞 Shubh Vivah Lagan</h2>
              <div style={{background:'#fdf2f8', padding:'15px', borderRadius:'12px', border:'1px solid #fbcfe8'}}>
                <p><b>Rashi Milan:</b> {result.rashi} - Uttam</p>
                <p><b>Guna Milan:</b> 28/36 Guna</p>
                <p><b>Shubh Muhurat:</b> Nov 2026 - Jan 2027</p>
                <p style={{marginTop:'10px', color:'#9d174d'}}><b>Palmistry + Grah:</b> Shukra rekha prabal hai. Vivah yog shubh hai.</p>
                <div style={{height:'80px', background:'linear-gradient(135deg,#fce7f3,#fde68a)', borderRadius:'10px', marginTop:'10px', display:'grid', placeItems:'center'}}>💍 Vivah Rekha: Clear & Long</div>
              </div>
            </div>
          )}
          {page===3 && (
            <div style={{padding:'20px'}}>
              <h2 style={{textAlign:'center', color:'#0e7490'}}>✦ Shubh Lagan</h2>
              <div style={{background:'#ecfeff', padding:'15px', borderRadius:'12px', border:'1px solid #a5f3fc'}}>
                <p><b>Aaj ka Shubh Lagan:</b> Abhijit Muhurat</p>
                <p><b>Samay:</b> 11:45 AM - 12:30 PM</p>
                <p><b>Disha:</b> Uttar-Poorv</p>
                <p style={{marginTop:'10px', color:'#155e75'}}><b>Upay:</b> Hanuman Chalisa path karein. Rashi {result.rashi} ke liye aaj ka din shubh hai.</p>
                <div style={{height:'80px', background:'linear-gradient(135deg,#cffafe,#fde68a)', borderRadius:'10px', marginTop:'10px', display:'grid', placeItems:'center'}}>🪬 Hast Rekha: Bhagya Rekha Majboot</div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div style={{minHeight:'100vh', background:'#fefce8', fontFamily:'system-ui', paddingBottom:'20px'}}>
      <style>{`input:focus{outline:none; border-color:#f97316 !important; box-shadow:0 0 0 3px #ffedd5}`}</style>
      
      {/* Header */}
      <div style={{textAlign:'center', padding:'18px 10px 5px'}}>
        <p style={{fontSize:'11px', letterSpacing:'1px', color:'#92400e', fontWeight:'700', margin:0}}>फीनिक्स आरोग्यम् ज्योतिष विद्या केन्द्रम्</p>
      </div>

      <div style={{maxWidth:'420px', margin:'0 auto', padding:'10px'}}>
        {/* Tabs */}
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'8px', marginBottom:'15px'}}>
          {[
            {id:'kundli', label:'जन्म कुंडली', sub:'का रासी', icon:'卐'},
            {id:'vivah', label:'विवाह लग्न', sub:'शुभ-योग', icon:'🤝'},
            {id:'shubh', label:'शिव-इष्ट', sub:'का रास योग', icon:'💞'},
          ].map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{background: tab===t.id ? 'linear-gradient(135deg,#f59e0b,#ea580c)' : '#fff', color: tab===t.id?'white':'#92400e', border:'1.5px solid #fbbf24', borderRadius:'12px', padding:'10px 4px', fontSize:'11px', fontWeight:'700', lineHeight:'1.1'}}>
              <div style={{fontSize:'16px'}}>{t.icon}</div>{t.label}<div style={{fontSize:'8px', fontWeight:'400', opacity:0.8}}>{t.sub}</div>
            </button>
          ))}
        </div>

        {/* Form Card - EXACT like screenshot */}
        <form onSubmit={handleSubmit} style={{background:'white', borderRadius:'18px', border:'2px solid #fbbf24', padding:'16px', boxShadow:'0 8px 30px rgba(245,158,11,0.15)'}}>
          
          {[
            {key:'naam', label:'नाम', ph:'पूरा नाम लिखें', type:'text', icon:'👤'},
            {key:'gotra', label:'गोत्र', ph:'गोत्र लिखें', type:'text', icon:'🕉️'},
            {key:'dob', label:'जन्म तिथि', ph:'mm/dd/yyyy', type:'date', icon:'📅'},
            {key:'samay', label:'जन्म समय', ph:'--:-- --', type:'time', icon:'⏰'},
            {key:'sthan', label:'जन्म स्थान', ph:'शहर / गाँव', type:'text', icon:'📍'},
          ].map(f=>(
            <div key={f.key} style={{marginBottom:'12px'}}>
              <label style={{fontSize:'11px', fontWeight:'700', color:'#78350f', display:'flex', alignItems:'center', gap:'4px', marginBottom:'4px'}}>
                <span>{f.icon}</span> {f.label} {f.key==='dob' && rashi && <span style={{background:'#fef3c7', color:'#92400e', padding:'2px 6px', borderRadius:'6px', fontSize:'10px'}}>राशि: {rashi} (Auto)</span>}
              </label>
              <input required={f.key!=='gotra'} type={f.type} value={form[f.key]} onChange={e=>setForm({...form,[f.key]:e.target.value})}
                placeholder={f.ph}
                style={{width:'100%', height:'44px', border:'1.5px solid #fde68a', borderRadius:'10px', padding:'0 12px', background:'#fffbeb', fontSize:'14px', boxSizing:'border-box'}} />
            </div>
          ))}

          <div style={{marginBottom:'14px'}}>
            <label style={{fontSize:'11px', fontWeight:'700', color:'#78350f', display:'flex', justifyContent:'space-between'}}>
              <span>📱 मोबाइल नंबर</span> <span style={{fontWeight:'400', color:'#a16207'}}>{form.mobile.length}/10</span>
            </label>
            <input required type="tel" value={form.mobile} onChange={e=>setForm({...form,mobile:e.target.value.replace(/\D/g,'').slice(0,10)})}
              placeholder="10 अंकों का नंबर" maxLength={10}
              style={{width:'100%', height:'44px', border:'1.5px solid #fde68a', borderRadius:'10px', padding:'0 12px', background:'#fffbeb', fontSize:'14px', boxSizing:'border-box'}} />
            <p style={{fontSize:'9px', color:'#a16207', margin:'4px 0 0'}}>🔒 आपका डेटा सुरक्षित है, किसी दूसरे हेतु उपयोग नहीं होगा</p>
          </div>

          <button type="submit" style={{width:'100%', height:'50px', background:'linear-gradient(90deg,#f97316,#ea580c)', color:'white', border:'none', borderRadius:'12px', fontWeight:'800', fontSize:'16px', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', boxShadow:'0 6px 18px rgba(234,88,12,0.3)'}}>
            🔮 कुंडली देखें <span>→</span>
          </button>

          <div style={{display:'flex', justifyContent:'space-between', marginTop:'10px'}}>
            <button type="button" onClick={logout} style={{fontSize:'11px', background:'none', border:'none', color:'#a16207'}}>Logout</button>
            <span style={{fontSize:'10px', color:'#92400e'}}>phoenixarogyam.netlify.app • Bareilly</span>
          </div>
        </form>
      </div>
    </div>
  )
}
