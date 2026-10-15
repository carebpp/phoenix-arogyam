import React, { useState, useEffect, useRef } from "react";

// ===== JYOTISH DASHBOARD CODE - SAME FILE ME =====
const RASHIS = ["Mesh","Vrishabh","Mithun","Kark","Singh","Kanya","Tula","Vrishchik","Dhanu","Makar","Kumbh","Meen"]
const GRAHAS = ["Surya","Chandra","Mangal","Budh","Guru","Shukra","Shani","Rahu","Ketu"]

function getRashi(dob){
  if(!dob || dob.length<10) return ""
  const d=new Date(dob); if(isNaN(d)) return ""
  const m=d.getMonth()+1; const day=d.getDate();
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

function JyotishDashboard() {
  const [tab,setTab]=useState('kundli')
  const samayRef=useRef(null)
  const [dobDay,setDobDay]=useState('')
  const [dobMonth,setDobMonth]=useState('')
  const [dobYear,setDobYear]=useState('')
  const [yearLocked,setYearLocked]=useState(false)
  const [form,setForm]=useState({naam:'',gotra:'',sthan:'',samay:'',mobile:''})
  const [vivah,setVivah]=useState({male_name:'',male_dob:'',male_time:'',male_sthan:'',female_name:'',female_dob:'',female_time:'',female_sthan:''})
  const [muhuratForm,setMuhuratForm]=useState({naam:'', type:'Makan'})
  const [result,setResult]=useState(null)
  const [gunaResult,setGunaResult]=useState(null)

  const fullDOB = dobDay && dobMonth && dobYear? `${dobYear}-${dobMonth.padStart(2,'0')}-${dobDay.padStart(2,'0')}` : ''
  const rashiAuto = getRashi(fullDOB)

  const handleYearChange = (e)=>{
    let v=e.target.value.replace(/\D/g,'').slice(0,4)
    setDobYear(v)
    if(v.length===4){ setYearLocked(true); setTimeout(()=>samayRef.current?.focus(),100) }
    else { setYearLocked(false) }
  }

  const generateChart = (rashi)=>{
    const idx=RASHIS.indexOf(rashi); let houses={}
    GRAHAS.forEach((g,i)=>{ const h=((idx+i)%12)+1; houses[h]=houses[h]?houses[h]+', '+g:g })
    return houses
  }

  const handleKundli = (e)=>{
    e.preventDefault()
    if(!fullDOB || dobYear.length!==4){ alert('Year 4 ank jaruri'); return; }
    const rashi=getRashi(fullDOB)
    const chart=generateChart(rashi)
    setResult({...form, dob:fullDOB, dobDisplay:`${dobDay}/${dobMonth}/${dobYear}`, rashi, chart})
  }

  const handleVivahMilan = (e)=>{
    e.preventDefault()
    const maleRashi=getRashi(vivah.male_dob)
    const femaleRashi=getRashi(vivah.female_dob)
    const total=28
    setGunaResult({maleRashi,femaleRashi,total, maleSthan:vivah.male_sthan, femaleSthan:vivah.female_sthan})
  }

  const muhuratData={
    Makan:{name:'Griha Nirman', time:'06:15 AM - 08:30 AM', tithi:'Shukla Panchami', nakshatra:'Rohini', upay:'Ishaan kon me pehli eent'},
    Dukan:{name:'Dukan Udghatan', time:'10:45 AM - 12:15 PM', tithi:'Shukla Dashami', nakshatra:'Pushya', upay:'Lakshmi pujan'},
    Job:{name:'Naukri Yog', time:'09:00 AM - 10:30 AM', tithi:'Shukla Tritiya', nakshatra:'Ashwini', upay:'Surya ko jal'},
    Vivah:{name:'Vivah Muhurat', time:'08:00 PM - 11:30 PM', tithi:'Shukla Saptami', nakshatra:'Mrigashirsha', upay:'Kanyadaan'},
    'Grah Pravesh':{name:'Grah Pravesh', time:'11:36 AM - 01:12 PM', tithi:'Shukla Ekadashi', nakshatra:'Uttara Phalguni', upay:'Ganesh pujan'},
    Namkaran:{name:'Namkaran', time:'05:15 PM - 06:45 PM', tithi:'Shukla Dwitiya', nakshatra:'Revati', upay:'Madhur naam'},
  }

  return(
    <div style={{background:'#fefce8', minHeight:'calc(100vh - 60px)', padding:'10px'}}>
      <div style={{maxWidth:'440px', margin:'0 auto'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'6px', marginBottom:'12px'}}>
          {[{id:'kundli',l:'जन्म कुंडली'},{id:'vivah',l:'विवाह लग्न'},{id:'shubh',l:'शुभ मुहूर्त'}].map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{background:tab===t.id?'linear-gradient(135deg,#f59e0b,#ea580c)':'white', color:tab===t.id?'white':'#92400e', border:'1.5px solid #fbbf24', borderRadius:'10px', padding:'10px', fontSize:'11px', fontWeight:'700'}}>{t.l}</button>
          ))}
        </div>

        {tab==='kundli' &&!result && (
          <form onSubmit={handleKundli} style={{background:'white', borderRadius:'16px', border:'2px solid #fbbf24', padding:'14px'}}>
            <div style={{marginBottom:'10px'}}><label style={{fontSize:'11px', fontWeight:'700'}}>नाम</label><input required value={form.naam} onChange={e=>setForm({...form,naam:e.target.value})} placeholder="पूरा नाम" style={{width:'100%', height:'42px', border:'1.5px solid #fde68a', borderRadius:'8px', padding:'0 10px', background:'#fffbeb'}}/></div>
            <div style={{marginBottom:'10px'}}><label style={{fontSize:'11px', fontWeight:'700'}}>गोत्र</label><input value={form.gotra} onChange={e=>setForm({...form,gotra:e.target.value})} placeholder="गोत्र" style={{width:'100%', height:'42px', border:'1.5px solid #fde68a', borderRadius:'8px', padding:'0 10px', background:'#fffbeb'}}/></div>
            <div style={{marginBottom:'10px'}}>
              <label style={{fontSize:'11px', fontWeight:'700'}}>जन्म तिथि DD/MM/YYYY {rashiAuto && <span style={{background:'#fef3c7', padding:'2px 6px', borderRadius:'4px', color:'#92400e'}}>Rashi: {rashiAuto}</span>}</label>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1.5fr', gap:'6px'}}>
                <input required type="tel" placeholder="DD" value={dobDay} onChange={e=>setDobDay(e.target.value.replace(/\D/g,'').slice(0,2))} style={{height:'42px', border:'1.5px solid #fde68a', borderRadius:'8px', textAlign:'center', background:'#fffbeb'}}/>
                <input required type="tel" placeholder="MM" value={dobMonth} onChange={e=>setDobMonth(e.target.value.replace(/\D/g,'').slice(0,2))} style={{height:'42px', border:'1.5px solid #fde68a', borderRadius:'8px', textAlign:'center', background:'#fffbeb'}}/>
                <input required type="tel" placeholder="YYYY" value={dobYear} onChange={handleYearChange} readOnly={yearLocked} style={{height:'42px', border:yearLocked?'1.5px solid #22c55e':'1.5px solid #f59e0b', borderRadius:'8px', textAlign:'center', background:yearLocked?'#f0fdf4':'#fffbeb', fontWeight:'700'}}/>
              </div>
              {yearLocked && <p style={{fontSize:'9px', color:'#16a34a', margin:'4px 0 0'}}>✓ Year lock - 4 ank pure</p>}
            </div>
            <div style={{marginBottom:'10px'}}><label style={{fontSize:'11px', fontWeight:'700'}}>जन्म समय</label><input ref={samayRef} required type="time" value={form.samay} onChange={e=>setForm({...form,samay:e.target.value})} style={{width:'100%', height:'42px', border:'1.5px solid #fde68a', borderRadius:'8px', padding:'0 10px', background:'#fffbeb'}}/></div>
            <div style={{marginBottom:'10px'}}><label style={{fontSize:'11px', fontWeight:'700'}}>जन्म स्थान</label><input required value={form.sthan} onChange={e=>setForm({...form,sthan:e.target.value})} placeholder="शहर / गाँव" style={{width:'100%', height:'42px', border:'1.5px solid #fde68a', borderRadius:'8px', padding:'0 10px', background:'#fffbeb'}}/></div>
            <div style={{marginBottom:'12px'}}><label style={{fontSize:'11px', fontWeight:'700'}}>मोबाइल {form.mobile.length}/10</label><input required type="tel" value={form.mobile} onChange={e=>setForm({...form,mobile:e.target.value.replace(/\D/g,'').slice(0,10)})} placeholder="10 अंक" style={{width:'100%', height:'42px', border:'1.5px solid #fde68a', borderRadius:'8px', padding:'0 10px', background:'#fffbeb'}}/></div>
            <button style={{width:'100%', height:'48px', background:'linear-gradient(90deg,#f97316,#ea580c)', color:'white', border:'none', borderRadius:'10px', fontWeight:'800'}}>🔮 कुंडली देखें</button>
          </form>
        )}

        {tab==='kundli' && result && (
          <div style={{background:'white', borderRadius:'16px', border:'2px solid #fbbf24', padding:'14px'}}>
            <button onClick={()=>{setResult(null); setDobYear(''); setYearLocked(false)}} style={{background:'#fef3c7', border:'none', padding:'6px 12px', borderRadius:'8px'}}>◀ Back</button>
            <h3 style={{textAlign:'center', color:'#92400e'}}>12 Grah Chart - {result.rashi}</h3>
            <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'4px', background:'#78350f', padding:'4px', borderRadius:'10px'}}>
              {Array.from({length:12},(_,i)=>i+1).map(h=>(<div key={h} style={{background:h===1?'#fef3c7':'white', minHeight:'55px', borderRadius:'6px', padding:'4px', fontSize:'9px'}}><b>{h}</b><div style={{fontSize:'7px'}}>{result.chart[h]||'-'}</div></div>))}
            </div>
            <div style={{marginTop:'10px', display:'grid', gap:'6px'}}>
              <div style={{background:'#fef2f2', borderLeft:'4px solid #ef4444', padding:'8px', borderRadius:'6px', fontSize:'11px'}}><b>Past:</b> Shani sadhesati khatam</div>
              <div style={{background:'#f0fdf4', borderLeft:'4px solid #22c55e', padding:'8px', borderRadius:'6px', fontSize:'11px'}}><b>Present:</b> Guru labh yog</div>
              <div style={{background:'#eff6ff', borderLeft:'4px solid #3b82f6', padding:'8px', borderRadius:'6px', fontSize:'11px'}}><b>Future:</b> Makan yog 2027</div>
            </div>
          </div>
        )}

        {tab==='vivah' &&!gunaResult && (
          <form onSubmit={handleVivahMilan} style={{background:'white', borderRadius:'16px', border:'2px solid #f43f5e', padding:'14px'}}>
            <h4 style={{textAlign:'center', color:'#be185d', margin:'0 0 8px'}}>Male Detail + Janm Sthan</h4>
            <input required placeholder="Male Naam" value={vivah.male_name} onChange={e=>setVivah({...vivah,male_name:e.target.value})} style={{width:'100%', height:'40px', border:'1px solid #fecdd3', borderRadius:'8px', padding:'0 10px', marginBottom:'6px'}}/>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'6px', marginBottom:'6px'}}><input required type="date" value={vivah.male_dob} onChange={e=>setVivah({...vivah,male_dob:e.target.value})} style={{height:'40px', border:'1px solid #fecdd3', borderRadius:'8px'}}/><input required type="time" value={vivah.male_time} onChange={e=>setVivah({...vivah,male_time:e.target.value})} style={{height:'40px', border:'1px solid #fecdd3', borderRadius:'8px'}}/></div>
            <input required placeholder="Male Janm Sthan" value={vivah.male_sthan} onChange={e=>setVivah({...vivah,male_sthan:e.target.value})} style={{width:'100%', height:'40px', border:'1px solid #fecdd3', borderRadius:'8px', padding:'0 10px', marginBottom:'12px'}}/>
            <h4 style={{textAlign:'center', color:'#be185d', margin:'8px 0'}}>Female Detail + Janm Sthan</h4>
            <input required placeholder="Female Naam" value={vivah.female_name} onChange={e=>setVivah({...vivah,female_name:e.target.value})} style={{width:'100%', height:'40px', border:'1px solid #fecdd3', borderRadius:'8px', padding:'0 10px', marginBottom:'6px'}}/>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'6px', marginBottom:'6px'}}><input required type="date" value={vivah.female_dob} onChange={e=>setVivah({...vivah,female_dob:e.target.value})} style={{height:'40px', border:'1px solid #fecdd3', borderRadius:'8px'}}/><input required type="time" value={vivah.female_time} onChange={e=>setVivah({...vivah,female_time:e.target.value})} style={{height:'40px', border:'1px solid #fecdd3', borderRadius:'8px'}}/></div>
            <input required placeholder="Female Janm Sthan" value={vivah.female_sthan} onChange={e=>setVivah({...vivah,female_sthan:e.target.value})} style={{width:'100%', height:'40px', border:'1px solid #fecdd3', borderRadius:'8px', padding:'0 10px', marginBottom:'12px'}}/>
            <button style={{width:'100%', height:'46px', background:'linear-gradient(90deg,#ec4899,#be185d)', color:'white', border:'none', borderRadius:'10px', fontWeight:'800'}}>💍 36 Gun + Nadi Milan</button>
          </form>
        )}

        {tab==='vivah' && gunaResult && (
          <div style={{background:'white', borderRadius:'16px', border:'2px solid #f43f5e', padding:'14px'}}>
            <button onClick={()=>setGunaResult(null)} style={{background:'#ffe4e6', border:'none', padding:'6px 12px', borderRadius:'8px'}}>◀ Back</button>
            <h3 style={{textAlign:'center', color:'#be185d'}}>{gunaResult.total}/36 Gun - {gunaResult.maleRashi}+{gunaResult.femaleRashi}</h3>
            <p style={{fontSize:'10px', textAlign:'center'}}>Male: {gunaResult.maleSthan} | Female: {gunaResult.femaleSthan}</p>
          </div>
        )}

        {tab==='shubh' && (
          <div style={{background:'white', borderRadius:'16px', border:'2px solid #0e7490', padding:'14px'}}>
            <div style={{marginBottom:'10px'}}><label style={{fontSize:'11px', fontWeight:'700'}}>नाम का खाना</label><input value={muhuratForm.naam} onChange={e=>setMuhuratForm({...muhuratForm,naam:e.target.value})} placeholder="अपना नाम" style={{width:'100%', height:'42px', border:'1.5px solid #a5f3fc', borderRadius:'8px', padding:'0 10px', background:'#ecfeff'}}/></div>
            <div style={{marginBottom:'12px'}}>
              <label style={{fontSize:'11px', fontWeight:'700'}}>एक ही खाने में कार्य चुनें</label>
              <select value={muhuratForm.type} onChange={e=>setMuhuratForm({...muhuratForm,type:e.target.value})} style={{width:'100%', height:'46px', border:'2px solid #0e7490', borderRadius:'10px', padding:'0 12px', background:'#ecfeff', fontWeight:'700', color:'#0e7490'}}>
                <option value="Makan">🏠 Makan</option>
                <option value="Dukan">🏪 Dukan</option>
                <option value="Job">💼 Job</option>
                <option value="Vivah">💍 Vivah</option>
                <option value="Grah Pravesh">🏡 Grah Pravesh</option>
                <option value="Namkaran">👶 Namkaran</option>
              </select>
            </div>
            <div style={{background:'#ecfeff', border:'1px solid #a5f3fc', borderRadius:'10px', padding:'12px'}}>
              <h4 style={{margin:'0 0 8px', color:'#0e7490'}}>{muhuratForm.naam? `${muhuratForm.naam} - `:''}{muhuratData[muhuratForm.type].name}</h4>
              <p style={{fontSize:'11px', margin:'4px 0'}}>⏰ Samay: {muhuratData[muhuratForm.type].time}</p>
              <p style={{fontSize:'11px', margin:'4px 0'}}>📅 Tithi: {muhuratData[muhuratForm.type].tithi}</p>
              <p style={{fontSize:'11px', margin:'4px 0'}}>⭐ Nakshatra: {muhuratData[muhuratForm.type].nakshatra}</p>
              <p style={{fontSize:'11px', margin:'4px 0'}}>💊 Upay: {muhuratData[muhuratForm.type].upay}</p>
              <p style={{fontSize:'11px', fontWeight:'800', marginTop:'12px'}}>12 Rashi Chart</p>
              <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'4px'}}>{RASHIS.map(r=>(<div key={r} style={{background:'white', padding:'6px', borderRadius:'6px', fontSize:'9px', textAlign:'center', border:'1px solid #a5f3fc'}}>{r}</div>))}</div>
              <p style={{fontSize:'11px', fontWeight:'800', marginTop:'12px'}}>9 Grah Chart</p>
              <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'4px'}}>{GRAHAS.map(g=>(<div key={g} style={{background:'#0e7490', color:'white', padding:'6px', borderRadius:'6px', fontSize:'10px', textAlign:'center'}}>{g}</div>))}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ===== LOGIN + MULTI MOBILE + LOGOUT =====
function SecureLogin() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("mobile");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const sendOtp = async (e) => {
    e.preventDefault();
    const cleanMobile = mobile.replace(/\D/g, "");
    if (!/^[6-9]\d{9}$/.test(cleanMobile)) { setError("10 ank valid"); return; }
    setLoading(true); setError(""); setMessage("");
    try {
      const res = await fetch("/api/send-otp", { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ mobile: cleanMobile }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      sessionStorage.setItem("phoenix_otp_mobile", cleanMobile);
      setStep("otp"); setMessage("OTP bheja gaya");
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    const savedMobile = sessionStorage.getItem("phoenix_otp_mobile");
    if (!savedMobile) { setStep("mobile"); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/verify-otp", { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ mobile: savedMobile, otp }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      let list = [];
      try { list = JSON.parse(localStorage.getItem('phoenix_mobiles') || '[]'); } catch {}
      if (!list.includes(savedMobile)) { list.push(savedMobile); localStorage.setItem('phoenix_mobiles', JSON.stringify(list)); }
      localStorage.setItem('phoenix_current_mobile', savedMobile);
      sessionStorage.removeItem("phoenix_otp_mobile");
      window.location.replace("/dashboard");
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  return (
    <main style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px', background:'#080b17'}}>
      <div style={{width:'100%', maxWidth:'430px', padding:'30px', borderRadius:'26px', background:'rgba(15,18,35,0.88)', color:'white'}}>
        <h1 style={{textAlign:'center'}}>PHOENIX AROGYAM</h1>
        {step==='mobile'?(
          <form onSubmit={sendOtp} style={{display:'flex', flexDirection:'column', gap:'12px', marginTop:'20px'}}>
            <input type="tel" value={mobile} maxLength={10} onChange={(e)=>setMobile(e.target.value.replace(/\D/g,'').slice(0,10))} placeholder="Mobile 10 digit" style={{height:'56px', borderRadius:'14px', background:'#101426', color:'white', padding:'0 15px'}}/>
            <button disabled={loading || mobile.length!==10} style={{height:'54px', borderRadius:'14px', background:'#00a88f', color:'white', fontWeight:'700'}}>{loading?"Sending...":"Send OTP"}</button>
          </form>
        ):(
          <form onSubmit={verifyOtp} style={{display:'flex', flexDirection:'column', gap:'12px', marginTop:'20px'}}>
            <input type="text" value={otp} maxLength={6} onChange={(e)=>setOtp(e.target.value.replace(/\D/g,'').slice(0,6))} placeholder="OTP" style={{height:'58px', borderRadius:'14px', background:'#101426', color:'white', textAlign:'center', fontSize:'22px'}}/>
            <button disabled={loading} style={{height:'54px', borderRadius:'14px', background:'#00a88f', color:'white', fontWeight:'700'}}>Verify</button>
            <button type="button" onClick={()=>setStep('mobile')} style={{height:'48px', borderRadius:'14px', background:'#20263c', color:'white'}}>Change Number</button>
          </form>
        )}
        {message && <div style={{marginTop:'10px', color:'#73e6ce'}}>{message}</div>}
        {error && <div style={{marginTop:'10px', color:'#ff9ba7'}}>{error}</div>}
      </div>
    </main>
  );
}

function DashboardWrapper() {
  const [currentMobile, setCurrentMobile] = useState('');
  const [allMobiles, setAllMobiles] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    setCurrentMobile(localStorage.getItem('phoenix_current_mobile') || '');
    try { setAllMobiles(JSON.parse(localStorage.getItem('phoenix_mobiles') || '[]')); } catch {}
  }, []);
  const logoutAll = async () => {
    try { await fetch("/api/logout", { method: "POST", credentials: "include" }); } catch {}
    localStorage.clear(); sessionStorage.clear(); window.location.replace("/");
  };
  const switchMobile = (m) => { localStorage.setItem('phoenix_current_mobile', m); setCurrentMobile(m); setShowMenu(false); };
  return (
    <div>
      <div style={{background:'white', padding:'10px 15px', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, zIndex:100, boxShadow:'0 2px 10px rgba(0,0,0,0.1)'}}>
        <div><b style={{color:'#0f766e'}}>Phoenix Arogyam</b><div style={{fontSize:'10px', color:'#64748b'}}>+91 {currentMobile}</div></div>
        <div style={{display:'flex', gap:'8px'}}>
          <div style={{position:'relative'}}>
            <button onClick={()=>setShowMenu(!showMenu)} style={{background:'#f0fdfa', border:'1px solid #99f6e0', padding:'6px 10px', borderRadius:'20px', fontSize:'11px'}}>📱 {allMobiles.length} Mobiles</button>
            {showMenu && (
              <div style={{position:'absolute', right:0, top:'35px', background:'white', border:'1px solid #e2e8f0', borderRadius:'12px', padding:'10px', minWidth:'210px', boxShadow:'0 10px 30px rgba(0,0,0,0.15)'}}>
                {allMobiles.map((m)=>(
                  <div key={m} style={{display:'flex', justifyContent:'space-between', padding:'6px 0'}}><button onClick={()=>switchMobile(m)} style={{border:'none', background:m===currentMobile?'#0f766e':'#f1f5f9', color:m===currentMobile?'white':'black', padding:'4px 8px', borderRadius:'6px'}}>+91 {m}</button></div>
                ))}
                <button onClick={()=>window.location.replace("/")} style={{width:'100%', marginTop:'8px', background:'#ecfeff', border:'1px dashed #0e7490', padding:'6px', borderRadius:'8px', fontSize:'11px'}}>+ Add New Mobile</button>
              </div>
            )}
          </div>
          <button onClick={logoutAll} style={{background:'#ef4444', color:'white', border:'none', padding:'8px 16px', borderRadius:'8px', fontWeight:'700', fontSize:'12px'}}>LOGOUT</button>
        </div>
      </div>
      <JyotishDashboard />
    </div>
  );
}

export default function App() {
  const isDashboard = window.location.pathname === "/dashboard";
  return isDashboard? <DashboardWrapper /> : <SecureLogin />;
}
