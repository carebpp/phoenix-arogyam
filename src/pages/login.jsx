import { useState, useEffect } from 'react'

export default function Login(){
  const [mobile,setMobile]=useState('')
  const [otp,setOtp]=useState('')
  const [step,setStep]=useState('mobile')
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState('')
  const [message,setMessage]=useState('')
  const [savedMobiles,setSavedMobiles]=useState([])

  useEffect(()=>{
    try{ setSavedMobiles(JSON.parse(localStorage.getItem('phoenix_mobiles')||'[]')) }catch{}
  },[])

  const sendOtp=async(e)=>{
    e.preventDefault()
    const c=mobile.replace(/\D/g,'')
    if(!/^[6-9]\d{9}$/.test(c)){ setError('10 ank ka valid number'); return; }
    setLoading(true); setError(''); setMessage('')
    try{
      const r=await fetch('/api/send-otp',{method:'POST', credentials:'include', headers:{'Content-Type':'application/json'}, body:JSON.stringify({mobile:c})})
      const d=await r.json()
      if(!r.ok) throw new Error(d.message)
      sessionStorage.setItem('phoenix_otp_mobile',c)
      setStep('otp'); setMessage(`OTP ${c} par bheja gaya`)
    }catch(err){ setError(err.message) } finally{ setLoading(false) }
  }

  const verifyOtp=async(e)=>{
    e.preventDefault()
    const s=sessionStorage.getItem('phoenix_otp_mobile')
    if(!s){ setStep('mobile'); return; }
    setLoading(true); setError('')
    try{
      const r=await fetch('/api/verify-otp',{method:'POST', credentials:'include', headers:{'Content-Type':'application/json'}, body:JSON.stringify({mobile:s, otp})})
      const d=await r.json()
      if(!r.ok) throw new Error(d.message)
      let list=[]; try{ list=JSON.parse(localStorage.getItem('phoenix_mobiles')||'[]') }catch{}
      if(!list.includes(s)){ list.push(s); localStorage.setItem('phoenix_mobiles', JSON.stringify(list)) }
      localStorage.setItem('phoenix_current_mobile', s)
      localStorage.setItem('phoenix_token','true')
      sessionStorage.removeItem('phoenix_otp_mobile')
      window.location.replace('/dashboard')
    }catch(err){ setError(err.message) } finally{ setLoading(false) }
  }

  return(
    <main style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px', background:'#080b17'}}>
      <div style={{width:'100%', maxWidth:'430px', padding:'30px', borderRadius:'26px', background:'rgba(15,18,35,0.88)', color:'white'}}>
        <h1 style={{textAlign:'center', letterSpacing:'3px'}}>PHOENIX AROGYAM</h1>
        <p style={{textAlign:'center', color:'#aeb5ca', fontSize:'12px'}}>Multi Mobile OTP Login</p>
        {savedMobiles.length>0 && step==='mobile' && (
          <div style={{margin:'15px 0', background:'rgba(255,255,255,0.05)', padding:'12px', borderRadius:'12px'}}>
            <p style={{fontSize:'11px', color:'#aeb5ca', margin:'0 0 8px'}}>Pichle numbers:</p>
            <div style={{display:'flex', gap:'6px', flexWrap:'wrap'}}>
              {savedMobiles.map(m=>(<button key={m} onClick={()=>setMobile(m)} style={{background:'#20263c', color:'#cbd2e6', border:'1px solid #363c57', padding:'6px 10px', borderRadius:'20px', fontSize:'12px'}}>+91 {m}</button>))}
            </div>
          </div>
        )}
        {step==='mobile'?(
          <form onSubmit={sendOtp} style={{display:'flex', flexDirection:'column', gap:'12px', marginTop:'15px'}}>
            <input type="tel" value={mobile} maxLength={10} onChange={e=>setMobile(e.target.value.replace(/\D/g,'').slice(0,10))} placeholder="Mobile 10 digit" style={{height:'56px', borderRadius:'14px', background:'#101426', color:'white', padding:'0 15px', border:'1px solid #363c57'}}/>
            <button disabled={loading || mobile.length!==10} style={{height:'54px', borderRadius:'14px', background:'linear-gradient(135deg,#00a88f,#536dfe)', color:'white', fontWeight:'700', border:'none'}}>{loading?'Sending...':'Send OTP'}</button>
          </form>
        ):(
          <form onSubmit={verifyOtp} style={{display:'flex', flexDirection:'column', gap:'12px', marginTop:'15px'}}>
            <input type="text" value={otp} maxLength={6} onChange={e=>setOtp(e.target.value.replace(/\D/g,'').slice(0,6))} placeholder="OTP 6 digit" style={{height:'58px', borderRadius:'14px', background:'#101426', color:'white', textAlign:'center', fontSize:'22px', letterSpacing:'8px', border:'1px solid #363c57'}}/>
            <button disabled={loading} style={{height:'54px', borderRadius:'14px', background:'linear-gradient(135deg,#00a88f,#536dfe)', color:'white', fontWeight:'700', border:'none'}}>{loading?'Verifying...':'Verify OTP'}</button>
            <button type="button" onClick={()=>setStep('mobile')} style={{height:'48px', borderRadius:'14px', background:'#20263c', color:'white', border:'none'}}>Change Number</button>
          </form>
        )}
        {message && <div style={{marginTop:'10px', color:'#73e6ce', fontSize:'12px'}}>{message}</div>}
        {error && <div style={{marginTop:'10px', color:'#ff9ba7', fontSize:'12px'}}>{error}</div>}
      </div>
    </main>
  )
}
