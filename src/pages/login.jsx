import { useState, useEffect } from 'react'

export default function Login(){
  const [mobile,setMobile]=useState('')
  const [otp,setOtp]=useState('')
  const [step,setStep]=useState('mobile')
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState('')
  const [message,setMessage]=useState('')
  const [savedMobiles,setSavedMobiles]=useState([])
  const [generatedOtp,setGeneratedOtp]=useState('')

  useEffect(()=>{
    try{ setSavedMobiles(JSON.parse(localStorage.getItem('phoenix_mobiles')||'[]')) }catch{}
  },[])

  const sendOtp=async(e)=>{
    e.preventDefault()
    const c=mobile.replace(/\D/g,'')
    if(!/^[6-9]\d{9}$/.test(c)){ setError('10 ank ka valid number dalo'); return; }
    setLoading(true); setError(''); setMessage('')
    try{
      // Pehle real API try karo
      const r=await fetch('/api/send-otp',{method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({mobile:c})})
      const text = await r.text()
      let d
      try{
        d = JSON.parse(text)
      } catch {
        // Agar HTML aaya to Mock OTP banao - DEMO ke liye
        throw new Error('MOCK_MODE')
      }
      if(!r.ok) throw new Error(d.message || 'OTP fail')
      sessionStorage.setItem('phoenix_otp_mobile',c)
      setStep('otp'); setMessage(`OTP ${c} par bheja gaya`)
    }catch(err){
      if(err.message==='MOCK_MODE'){
        // ✅ BACKEND NAHI HAI TO MOCK OTP - 100% WORKING
        const mockOtp = Math.floor(100000 + Math.random()*900000).toString()
        setGeneratedOtp(mockOtp)
        sessionStorage.setItem('phoenix_otp_mobile',c)
        sessionStorage.setItem('phoenix_mock_otp',mockOtp)
        setStep('otp')
        setMessage(`Demo OTP: ${mockOtp} (Backend nahi hai isliye yahan dikha raha hu)`)
        // WhatsApp par bhejna ho to yahan alert
        alert(`🔐 PHOENIX AROGYAM\nMobile: +91 ${c}\nAapka OTP: ${mockOtp}\n\nYe demo OTP hai - Backend setup ke baad real SMS jayega`)
      } else {
        setError(err.message || 'Server error, par mock OTP try karo')
        // Phir bhi mock allow karo
        const mockOtp = '123456'
        sessionStorage.setItem('phoenix_otp_mobile',c)
        sessionStorage.setItem('phoenix_mock_otp',mockOtp)
        setStep('otp')
        setMessage(`Demo OTP: 123456 use karo`)
      }
    } finally{ setLoading(false) }
  }

  const verifyOtp=async(e)=>{
    e.preventDefault()
    const s=sessionStorage.getItem('phoenix_otp_mobile')
    const mockOtp = sessionStorage.getItem('phoenix_mock_otp')
    if(!s){ setStep('mobile'); return; }
    setLoading(true); setError('')
    try{
      // Pehle mock check
      if(mockOtp && otp===mockOtp){
        // Mock success
        let list=[]; try{ list=JSON.parse(localStorage.getItem('phoenix_mobiles')||'[]') }catch{}
        if(!list.includes(s)){ list.push(s); localStorage.setItem('phoenix_mobiles', JSON.stringify(list)) }
        localStorage.setItem('phoenix_current_mobile', s)
        localStorage.setItem('phoenix_token','true')
        sessionStorage.removeItem('phoenix_otp_mobile')
        sessionStorage.removeItem('phoenix_mock_otp')
        window.location.replace('/dashboard')
        return
      }

      // Real API try
      const r=await fetch('/api/verify-otp',{method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({mobile:s, otp})})
      const text = await r.text()
      let d
      try{ d=JSON.parse(text) } catch{ 
        // Agar backend nahi hai to mock hi check karo
        if(otp==='123456' || otp===mockOtp){
          let list=[]; try{ list=JSON.parse(localStorage.getItem('phoenix_mobiles')||'[]') }catch{}
          if(!list.includes(s)){ list.push(s); localStorage.setItem('phoenix_mobiles', JSON.stringify(list)) }
          localStorage.setItem('phoenix_current_mobile', s)
          localStorage.setItem('phoenix_token','true')
          window.location.replace('/dashboard')
          return
        } else {
          throw new Error('Galat OTP - Demo ke liye 123456 ya upar wala OTP dalo')
        }
      }
      if(!r.ok) throw new Error(d.message)
      
      let list=[]; try{ list=JSON.parse(localStorage.getItem('phoenix_mobiles')||'[]') }catch{}
      if(!list.includes(s)){ list.push(s); localStorage.setItem('phoenix_mobiles', JSON.stringify(list)) }
      localStorage.setItem('phoenix_current_mobile', s)
      localStorage.setItem('phoenix_token','true')
      window.location.replace('/dashboard')
    }catch(err){ setError(err.message) } finally{ setLoading(false) }
  }

  return(
    <main style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px', background:'radial-gradient(circle at top left,#283593,transparent 40%), radial-gradient(circle at bottom right,#00897b,transparent 40%), #080b17'}}>
      <div style={{width:'100%', maxWidth:'430px', padding:'30px', border:'1px solid rgba(255,255,255,0.13)', borderRadius:'26px', background:'rgba(15,18,35,0.88)', color:'white'}}>
        <h1 style={{textAlign:'center', letterSpacing:'3px', margin:'0'}}>PHOENIX AROGYAM</h1>
        <p style={{textAlign:'center', color:'#aeb5ca', fontSize:'12px', marginTop:'6px'}}>Multi Mobile OTP Login</p>
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
            <input type="tel" value={mobile} maxLength={10} onChange={e=>setMobile(e.target.value.replace(/\D/g,'').slice(0,10))} placeholder="9758959758" style={{height:'56px', borderRadius:'14px', background:'#101426', color:'white', padding:'0 15px', border:'1px solid #363c57', fontSize:'16px'}}/>
            <button disabled={loading || mobile.length!==10} style={{height:'54px', borderRadius:'14px', background:'linear-gradient(90deg,#14b8a6,#3b82f6)', color:'white', fontWeight:'700', border:'none', fontSize:'16px'}}>{loading?'Sending...':'Send OTP'}</button>
          </form>
        ):(
          <form onSubmit={verifyOtp} style={{display:'flex', flexDirection:'column', gap:'12px', marginTop:'15px'}}>
            <input type="text" value={otp} maxLength={6} onChange={e=>setOtp(e.target.value.replace(/\D/g,'').slice(0,6))} placeholder="OTP dalo" autoFocus style={{height:'58px', borderRadius:'14px', background:'#101426', color:'white', textAlign:'center', fontSize:'22px', letterSpacing:'8px', border:'1px solid #363c57'}}/>
            <button disabled={loading || otp.length<4} style={{height:'54px', borderRadius:'14px', background:'linear-gradient(90deg,#14b8a6,#3b82f6)', color:'white', fontWeight:'700', border:'none', fontSize:'16px'}}>{loading?'Verifying...':'Verify OTP'}</button>
            <button type="button" onClick={()=>{setStep('mobile'); setOtp(''); setError(''); setMessage('')}} style={{height:'48px', borderRadius:'14px', background:'#20263c', color:'white', border:'none'}}>Change Number</button>
          </form>
        )}
        {message && <div style={{marginTop:'15px', padding:'12px', borderRadius:'12px', background:'rgba(0,200,150,0.15)', color:'#5eead4', fontSize:'12px', border:'1px solid rgba(0,200,150,0.2)'}}>{message}</div>}
        {error && <div style={{marginTop:'15px', padding:'12px', borderRadius:'12px', background:'rgba(255,80,100,0.12)', color:'#ff9ba7', fontSize:'12px'}}>{error}</div>}
        <p style={{textAlign:'center', fontSize:'10px', color:'#64748b', marginTop:'15px'}}>Backend setup nahi hai to Demo OTP 123456 kaam karega</p>
      </div>
    </main>
  )
}
