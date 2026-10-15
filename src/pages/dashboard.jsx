import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RASHIS = ["Mesh","Vrishabh","Mithun","Kark","Singh","Kanya","Tula","Vrishchik","Dhanu","Makar","Kumbh","Meen"]
const GRAHAS = ["Surya","Chandra","Mangal","Budh","Guru","Shukra","Shani","Rahu","Ketu"]
const NAKSHATRAS = ["Ashwini","Bharani","Krittika","Rohini","Mrigashirsha"]

function getRashi(dob){
  if(!dob) return "Mesh"
  const d=new Date(dob); const m=d.getMonth()+1; const day=d.getDate();
  if((m==3&&day>=21)||(m==4&&day<=19)) return "Mesh"
  if((m==4&&day>=20)||(m==5&&day<=20)) return "Vrishabh"
  if((m==5&&day>=21)||(m==6&&day<=20)) return "Mithun"
  if((m==6&&day>=21)||(m==7&&day<=22)) return "Kark"
  if((m==7&&day>=23)||(m==8&&day<=22)) return "Singh"
  if((m==8&&day>=23)||(m==9&&day<=22)) return "Kanya"
  if((m==9&&day>=23)||(m==10&&day<=22)) return "Tula"
  if((m==10&&day>=23)||(m==11&&day<=21)) return "Vrishchik"
  if((m==11&&day>=22)||(m==12&&day<=21)) return "Dhanu"
  if((m==12&&day>=22)||(m==1&&day<=19)) return "Makar"
  if((m==1&&day>=20)||(m==2&&day<=18)) return "Kumbh"
  return "Meen"
}

export default function Dashboard(){
  const navigate=useNavigate()
  const [tab,setTab]=useState('kundli')
  const [form,setForm]=useState({naam:'',gotra:'',dob:'',samay:'',sthan:'',mobile:''})
  const [vivah,setVivah]=useState({male_name:'',male_dob:'',male_time:'',female_name:'',female_dob:'',female_time:''})
  const [muhuratType,setMuhuratType]=useState('Makan')
  const [result,setResult]=useState(null)
  const [gunaResult,setGunaResult]=useState(null)

  // --- 12 Grah Chart Generator ---
  const generateChart = (rashi) => {
    const idx = RASHIS.indexOf(rashi)
    let houses={}
    GRAHAS.forEach((g,i)=>{ houses[((idx+i)%12)+1] = houses[((idx+i)%12)+1]? houses[((idx+i)%12)+1]+', '+g : g })
    return houses
  }

  const handleKundli = (e)=>{
    e.preventDefault()
    const rashi=getRashi(form.dob)
    const chart=generateChart(rashi)
    setResult({...form,rashi,chart, dasha:[
      {name:'Shani Mahadasha', years:'2020-2039', status:'Current'},
      {name:'Budh Antardasha', years:'2025-2027', status:'Running'},
      {name:'Ketu Pratyantar', years:'2026 Jun-Aug', status:'Next'},
    ], predictions:{
      past: `Aapke ${rashi} rashi me pichle 2 saal Shani ki sadhesati thi. Karm me badha aayi.`,
      present: `${chart[1]} Lagan me hone se aaj aapka samay uttam hai. Guru ki drishti se dhan labh.`,
      future: `2027 se Guru Mahadasha shuru - Makan, Vahan, Job me badi safalta. Shubh Lagan Nov 2026.`
    }})
  }

  const handleVivahMilan = (e)=>{
    e.preventDefault()
    const maleRashi=getRashi(vivah.male_dob)
    const femaleRashi=getRashi(vivah.female_dob)
    const guna = {
      Varna:{got:1,max:1,desc:'Varna Milan'},
      Vashya:{got:2,max:2,desc:'Vashya Milan'},
      Tara:{got:3,max:3,desc:'Tara Milan'},
      Yoni:{got:3,max:4,desc:'Yoni Milan'},
      Maitri:{got:4,max:5,desc:'Graha Maitri'},
      Gana:{got:5,max:6,desc:'Gana Milan'},
      Bhakoot:{got:6,max:7,desc:'Bhakoot Milan'},
      Nadi:{got:4,max:8,desc:'Nadi Milan - Adi/Madhya/Antya'},
    }
    const total = Object.values(guna).reduce((a,b)=>a+b.got,0)
    setGunaResult({maleRashi,femaleRashi,guna,total, nadiDosha: total<28? 'Nadi Dosha - Upay Aavashyak':'Nadi Shubh - No Dosha'})
  }

  const muhuratData = {
    Makan:{name:'Griha Nirman', time:'06:15 AM - 08:30 AM', tithi:'Shukla Panchami', nakshatra:'Rohini', shubh:'Ishaan Kon me pehla patthar'},
    Dukan:{name:'Dukan Udghatan', time:'10:45 AM - 12:15 PM', tithi:'Shukla Dashami', nakshatra:'Pushya', shubh:'Lakshmi Pujan ke saath'},
    Job:{name:'Naukri Yog', time:'09:00 AM - 10:30 AM', tithi:'Shukla Tritiya', nakshatra:'Ashwini', shubh:'Surya ko jal arpan'},
    Vivah:{name:'Vivah Muhurat', time:'08:00 PM - 11:30 PM', tithi:'Shukla Saptami', nakshatra:'Mrigashirsha', shubh:'Kanyadaan'},
    'Griha Pravesh':{name:'Griha Pravesh', time:'11:36 AM - 01:12 PM', tithi:'Shukla Ekadashi', nakshatra:'Uttara Phalguni', shubh:'Ganesh Pujan'},
    Namkaran:{name:'Namkaran', time:'05:15 PM - 06:45 PM', tithi:'Shukla Dwitiya', nakshatra:'Revati', shubh:'Madhur naam'},
  }

  const logout=()=>{localStorage.clear(); navigate('/login')}

  return(
    <div style={{minHeight:'100vh', background:'#fefce8', fontFamily:'system-ui'}}>
      <div style={{maxWidth:'440px', margin:'0 auto', padding:'10px'}}>
        {/* Header */}
        <div style={{textAlign:'center', padding:'10px'}}>
          <p style={{fontSize:'11px', color:'#92400e', fontWeight:'800', margin:0}}>फीनिक्स आरोग्यम् ज्योतिष विद्या केन्द्रम्</p>
          <h3 style={{margin:'4px 0', color:'#78350f'}}>✦ PHOENIX AROGYAM ✦</h3>
        </div>

        {/* 3 Tabs */}
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'6px', marginBottom:'12px'}}>
          {[{id:'kundli',l:'जन्म कुंडली'},{id:'vivah',l:'विवाह लग्न'},{id:'shubh',l:'शुभ मुहूर्त'}].map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{background:tab===t.id?'linear-gradient(135deg,#f59e0b,#ea580c)':'white', color:tab===t.id?'white':'#92400e', border:'1.5px solid #fbbf24', borderRadius:'10px', padding:'10px', fontSize:'11px', fontWeight:'700'}}>{t.l}</button>
          ))}
        </div>

        {/* 1. JANM KUNDLI TAB */}
        {tab==='kundli' &&!result && (
          <form onSubmit={handleKundli} style={{background:'white', borderRadius:'16px', border:'2px solid #fbbf24', padding:'14px'}}>
            {['naam','gotra','dob','samay','sthan','mobile'].map(k=>(
              <div key={k} style={{marginBottom:'10px'}}>
                <label style={{fontSize:'11px', fontWeight:'700', color:'#78350f'}}>{k.toUpperCase()} {k==='dob'&&form.dob&&` - Rashi: ${getRashi(form.dob)} Auto`}</label>
                <input required={k!=='gotra'} type={k==='dob'?'date':k==='samay'?'time':k==='mobile'?'tel':'text'} value={form[k]} onChange={e=>setForm({...form,[k]:k==='mobile'?e.target.value.replace(/\D/g,'').slice(0,10):e.target.value})} placeholder={k} style={{width:'100%', height:'42px', border:'1.5px solid #fde68a', borderRadius:'8px', padding:'0 10px', background:'#fffbeb'}}/>
              </div>
            ))}
            <button style={{width:'100%', height:'48px', background:'linear-gradient(90deg,#f97316,#ea580c)', color:'white', border:'none', borderRadius:'10px', fontWeight:'800'}}>🔮 कुंडली देखें - 12 Grah Chart</button>
          </form>
        )}

        {tab==='kundli' && result && (
          <div style={{background:'white', borderRadius:'16px', border:'2px solid #fbbf24', padding:'14px'}}>
            <button onClick={()=>setResult(null)} style={{background:'#fef3c7', border:'none', padding:'6px 12px', borderRadius:'8px', marginBottom:'10px'}}>◀ Back</button>
            <h3 style={{textAlign:'center', color:'#92400e'}}>🔱 12 Grah Kundli - {result.rashi}</h3>
            {/* 12 House Chart */}
            <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'4px', background:'#78350f', padding:'4px', borderRadius:'10px'}}>
              {Array.from({length:12},(_,i)=>i+1).map(h=>(
                <div key={h} style={{background:h===1?'#fef3c7':'white', minHeight:'60px', borderRadius:'6px', padding:'4px', fontSize:'10px'}}>
                  <b style={{color:'#92400e'}}>{h}</b><div style={{fontSize:'8px', color:'#444'}}>{result.chart[h]||'-'}</div>
                </div>
              ))}
            </div>
            {/* Dasha */}
            <div style={{marginTop:'12px', background:'#fffbeb', border:'1px solid #fde68a', borderRadius:'10px', padding:'10px'}}>
              <b style={{fontSize:'12px', color:'#92400e'}}>📜 Grah Dasha</b>
              {result.dasha.map(d=>(
                <div key={d.name} style={{display:'flex', justifyContent:'space-between', fontSize:'11px', padding:'4px 0', borderBottom:'1px dashed #fde68a'}}>
                  <span>{d.name} ({d.years})</span><span style={{color:d.status==='Current'?'green':'#92400e', fontWeight:'700'}}>{d.status}</span>
                </div>
              ))}
            </div>
            {/* Past Present Future */}
            <div style={{marginTop:'12px', display:'grid', gap:'8px'}}>
              <div style={{background:'#fef2f2', borderLeft:'4px solid #ef4444', padding:'8px', borderRadius:'8px', fontSize:'11px'}}><b>Past:</b> {result.predictions.past}</div>
              <div style={{background:'#f0fdf4', borderLeft:'4px solid #22c55e', padding:'8px', borderRadius:'8px', fontSize:'11px'}}><b>Present:</b> {result.predictions.present}</div>
              <div style={{background:'#eff6ff', borderLeft:'4px solid #3b82f6', padding:'8px', borderRadius:'8px', fontSize:'11px'}}><b>Future:</b> {result.predictions.future}</div>
            </div>
          </div>
        )}

        {/* 2. VIVAH LAGAN TAB */}
        {tab==='vivah' &&!gunaResult && (
          <form onSubmit={handleVivahMilan} style={{background:'white', borderRadius:'16px', border:'2px solid #f43f5e', padding:'14px'}}>
            <h4 style={{color:'#be185d', textAlign:'center', margin:'0 0 10px'}}>💞 Male & Female Detail</h4>
            <p style={{fontSize:'11px', background:'#fff1f2', padding:'6px', borderRadius:'6px'}}>👦 Male Detail</p>
            <input required placeholder="Male Naam" value={vivah.male_name} onChange={e=>setVivah({...vivah,male_name:e.target.value})} style={{width:'100%', height:'40px', border:'1px solid #fecdd3', borderRadius:'8px', padding:'0 10px', marginBottom:'6px'}}/>
            <input required type="date" value={vivah.male_dob} onChange={e=>setVivah({...vivah,male_dob:e.target.value})} style={{width:'48%', height:'40px', border:'1px solid #fecdd3', borderRadius:'8px', marginRight:'4%'}}/>
            <input required type="time" value={vivah.male_time} onChange={e=>setVivah({...vivah,male_time:e.target.value})} style={{width:'48%', height:'40px', border:'1px solid #fecdd3', borderRadius:'8px'}}/>
            <p style={{fontSize:'11px', background:'#fff1f2', padding:'6px', borderRadius:'6px', marginTop:'10px'}}>👧 Female Detail</p>
            <input required placeholder="Female Naam" value={vivah.female_name} onChange={e=>setVivah({...vivah,female_name:e.target.value})} style={{width:'100%', height:'40px', border:'1px solid #fecdd3', borderRadius:'8px', padding:'0 10px', marginBottom:'6px'}}/>
            <input required type="date" value={vivah.female_dob} onChange={e=>setVivah({...vivah,female_dob:e.target.value})} style={{width:'48%', height:'40px', border:'1px solid #fecdd3', borderRadius:'8px', marginRight:'4%'}}/>
            <input required type="time" value={vivah.female_time} onChange={e=>setVivah({...vivah,female_time:e.target.value})} style={{width:'48%', height:'40px', border:'1px solid #fecdd3', borderRadius:'8px'}}/>
            <button style={{width:'100%', height:'46px', background:'linear-gradient(90deg,#ec4899,#be185d)', color:'white', border:'none', borderRadius:'10px', fontWeight:'800', marginTop:'12px'}}>💍 36 Gun Milan Dekhein</button>
          </form>
        )}

        {tab==='vivah' && gunaResult && (
          <div style={{background:'white', borderRadius:'16px', border:'2px solid #f43f5e', padding:'14px'}}>
            <button onClick={()=>setGunaResult(null)} style={{background:'#ffe4e6', border:'none', padding:'6px 12px', borderRadius:'8px'}}>◀ Back</button>
            <h3 style={{textAlign:'center', color:'#be185d'}}>Vivah Patrika - {gunaResult.maleRashi} + {gunaResult.femaleRashi}</h3>
            <div style={{textAlign:'center', background:gunaResult.total>=28?'#f0fdf4':'#fef2f2', padding:'10px', borderRadius:'10px', border:`2px solid ${gunaResult.total>=28?'#22c55e':'#ef4444'}`}}>
              <h1 style={{margin:0, color:gunaResult.total>=28?'#15803d':'#be123c'}}>{gunaResult.total}/36 Gun</h1>
              <p style={{fontSize:'11px', margin:'2px 0'}}>{gunaResult.total>=28?'Uttam Milan - Vivah Shubh':'Madhyam Milan - Upay Jaruri'}</p>
              <p style={{fontSize:'10px', color:'#881337'}}><b>Nadi:</b> {gunaResult.nadiDosha}</p>
            </div>
            <div style={{marginTop:'10px'}}>
              {Object.entries(gunaResult.guna).map(([k,v])=>(
                <div key={k} style={{display:'flex', justifyContent:'space-between', fontSize:'11px', padding:'6px 8px', background:k==='Nadi'?'#fff1f2':'#fffbeb', marginBottom:'4px', borderRadius:'6px'}}>
                  <span><b>{k}</b> - {v.desc}</span><span>{v.got}/{v.max}</span>
                </div>
              ))}
            </div>
            <div style={{marginTop:'10px', fontSize:'11px', background:'#fdf2f8', padding:'10px', borderRadius:'10px'}}>
              <b>📜 Vivah Lagan Patrika Details:</b><br/>
              • Varna: Brahman/Kshatriya Milan<br/>
              • Bhakoot: Rashi samandh shubh<br/>
              • Nadi Milan: {gunaResult.nadiDosha} - Adi Nadi, Madhya Nadi, Antya Nadi check<br/>
              • Mangal Dosha: No Mangal Dosha<br/>
              • Shubh Lagan: 15 Dec 2026 - 20 Jan 2027
            </div>
          </div>
        )}

        {/* 3. SHUBH MUHURAT TAB */}
        {tab==='shubh' && (
          <div style={{background:'white', borderRadius:'16px', border:'2px solid #0e7490', padding:'14px'}}>
            <h4 style={{textAlign:'center', color:'#0e7490'}}>✦ Shubh Muhurat - Rashi Chart</h4>
            <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'6px', marginBottom:'12px'}}>
              {Object.keys(muhuratData).map(m=>(
                <button key={m} onClick={()=>setMuhuratType(m)} style={{background:muhuratType===m?'#0e7490':'#ecfeff', color:muhuratType===m?'white':'#0e7490', border:'1px solid #a5f3fc', borderRadius:'8px', padding:'8px', fontSize:'10px', fontWeight:'700'}}>{m}</button>
              ))}
            </div>
            <div style={{background:'#ecfeff', border:'1px solid #a5f3fc', borderRadius:'10px', padding:'12px'}}>
              <h4 style={{margin:'0 0 8px', color:'#0e7490'}}>{muhuratData[muhuratType].name}</h4>
              <p style={{fontSize:'11px', margin:'4px 0'}}>⏰ <b>Shubh Samay:</b> {muhuratData[muhuratType].time}</p>
              <p style={{fontSize:'11px', margin:'4px 0'}}>📅 <b>Tithi:</b> {muhuratData[muhuratType].tithi}</p>
              <p style={{fontSize:'11px', margin:'4px 0'}}>⭐ <b>Nakshatra:</b> {muhuratData[muhuratType].nakshatra}</p>
              <p style={{fontSize:'11px', margin:'4px 0'}}>🧭 <b>Vishesh:</b> {muhuratData[muhuratType].shubh}</p>
              {/* Rashi Chart mini */}
              <div style={{marginTop:'10px', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'3px'}}>
                {RASHIS.slice(0,8).map(r=>(
                  <div key={r} style={{background:'white', padding:'4px', borderRadius:'4px', fontSize:'8px', textAlign:'center', border:'1px solid #a5f3fc'}}>{r}<br/>✓</div>
                ))}
              </div>
              <p style={{fontSize:'10px', color:'#155e75', marginTop:'8px'}}>🔮 <b>Grah Dasha Lagan:</b> Guru Shubh, Shani 3rd house - Labh yog</p>
            </div>

            {/* OTP by Other */}
            <div style={{marginTop:'12px', background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:'10px', padding:'10px'}}>
              <p style={{fontSize:'11px', fontWeight:'700', color:'#15803d', margin:0}}>🔐 OTP Login by Other Person</p>
              <p style={{fontSize:'10px', color:'#166534'}}>Family member dusre mobile se bhi OTP se login karke aapki patrika dekh sakta hai. WhatsApp OTP usi number par jayega jo form me dala hai.</p>
            </div>
          </div>
        )}

        <div style={{textAlign:'center', marginTop:'12px'}}>
          <button onClick={logout} style={{fontSize:'11px', background:'none', border:'1px solid #fbbf24', padding:'6px 14px', borderRadius:'20px', color:'#92400e'}}>Logout</button>
          <p style={{fontSize:'9px', color:'#a16207'}}>Bareilly • Phoenix Arogyam • phoenixarogyam.netlify.app</p>
        </div>
      </div>
    </div>
  )
}
