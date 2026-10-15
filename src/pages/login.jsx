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
    // Input hamesha khali rakho
    setMobile('')
    try{ 
      const list = JSON.parse(localStorage.getItem('phoenix_mobiles')||'[]')
      setSavedMobiles(list)
    }catch{}
  },[])

  const sendOtp=async(e)=>{
    e.preventDefault()
    const c=mobile.replace(/\D/g,'')
    if(!/^[6-9]\d{9}$/.test(c)){ setError('10 ank ka valid number'); return; }
    setLoading(true); setError(''); setMessage('')
    try{
      const r=await fetch('/api/send-otp',{method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({mobile:c})})
      const text = await r.text()
      let d; try{ d=JSON.parse(text) } catch{ throw new Error('MOCK_MODE') }
      if(!r.ok) throw new Error(d.message)
      sessionStorage.setItem('phoenix_otp_mobile',c)
      setStep('otp'); setMessage(`OTP ${c} par bheja`)
    }catch(err){
      // Mock OTP - backend nahi hai to
      const mockOtp = Math.floor(100000 + Math.random()*900000).toString()
      sessionStorage.setItem('phoenix_otp_mobile',c)
      sessionStorage.setItem('phoenix_mock_otp',mockOtp)
      setStep('otp')
      setMessage(`Demo OTP: ${mockOtp}`)
      alert(`PHOENIX OTP: ${mockOtp}`)
    } finally{ setLoading(false) }
  }

  const verifyOtp=async(e)=>{
    e.preventDefault()
    const s=sessionStorage.getItem('phoenix_otp_mobile')
    const mockOtp = sessionStorage.getItem('phoenix_mock_otp')
    if(!s){ setStep('mobile'); return; }
    setLoading(true); setError('')
    try{
      if(mockOtp && otp===mockOtp){
        let list=[]; try{ list=JSON.parse(localStorage.getItem('phoenix_mobiles')||'[]') }catch{}
        if(!list.includes(s)){ list.push(s); localStorage.setItem('phoenix_mobiles', JSON.stringify(list)) }
        localStorage.setItem('phoenix_current_mobile', s)
        localStorage.setItem('phoenix_token','true')
        sessionStorage.clear()
        window.location.replace('/dashboard')
        return
      }
      const r=await fetch('/api/verify-otp',{method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({mobile:s, otp})})
      const text = await r.text()
      try{ JSON.parse(text) } catch{
        if(otp==='123456' || otp===mockOtp){
          let list=[]; try{ list=JSON.parse(localStorage.getItem('phoenix_mobiles')||'[]') }catch{}
          if(!list.includes(s)){ list.push(s); localStorage.setItem('phoenix_mobiles', JSON.stringify(list)) }
          localStorage.setItem('phoenix_current_mobile', s)
          localStorage.setItem('phoenix_token','true')
          window.location.replace('/dashboard')
          return
        } else throw new Error('Galat OTP - 123456 dalo')
      }
    }catch(err){ setError(err.message) } finally{ setLoading(false) }
  }

  const selectSaved = (m) => {
    // Number select karne par bhi box me set karo, par jumping nahi hoga
    setMobile(m)
    setError('')
  }

  const clearInput = () => {
    setMobile('')
    setError('')
  }

  return(
    <main style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px', background:'#080b17', overflow:'hidden'}}>
      <div style={{width:'100%', maxWidth:'430px', minHeight:'420px', padding:'30px', borderRadius:'26px', background:'rgba(15,18,35,0.88)', border:'1px solid rgba(255,255,255,0.13)', color:'white', display:'flex', flexDirection:'column'}}>
        
        <div style={{textAlign:'center', marginBottom:'20px'}}>
          <h1 style={{letterSpacing:'3px', margin:'0', fontSize:'26px'}}>PHOENIX AROGYAM</h1>
          <p style={{color:'#aeb5ca', fontSize:'12px', marginTop:'6px'}}>Multi Mobile OTP Login</p>
        </div>

        {/* FIXED HEIGHT AREA - Jumping rokne ke liye */}
        <div style={{minHeight:'75px', marginBottom:'10px'}}>
          {savedMobiles.length>0 && step==='mobile' && (
            <div style={{background:'rgba(255,255,255,0.05)', padding:'10px 12px', borderRadius:'12px'}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'8px'}}>
                <p style={{fontSize:'11px', color:'#aeb5ca', margin:'0'}}>Multi Login - Pichle numbers:</p>
                <button onClick={clearInput} style={{background:'transparent', color:'#5eead4', border:'none', fontSize:'11px', fontWeight:'700'}}>✕ Clear</button>
              </div>
              <div style={{display:'flex', gap:'6px', flexWrap:'wrap'}}>
                {savedMobiles.map(m=>(
                  <button key={m} type="button" onClick={()=>selectSaved(m)} style={{background:mobile===m?'#0f766e':'#20263c', color:mobile===m?'white':'#cbd2e6', border:mobile===m?'1px solid #14b8a6':'1px solid #363c57', padding:'6px 12px', borderRadius:'20px', fontSize:'12px', fontWeight:mobile===m?'700':'400'}}>+91 {m}</button>
                ))}
              </div>
            </div>
          )}
        </div>

        {step==='mobile'?(
          <form onSubmit={sendOtp} style={{display:'flex', flexDirection:'column', gap:'12px'}}>
            <div style={{position:'relative'}}>
              <input 
                type="tel" 
                value={mobile} 
                maxLength={10} 
                onChange={e=>setMobile(e.target.value.replace(/\D/g,'').slice(0,10))} 
                placeholder="Mobile number khali rakho - yahan likho"
                autoComplete="off"
                style={{width:'100%', height:'56px', borderRadius:'14px', background:'#101426', color:'white', padding:'0 45px 0 15px', border:'1px solid #363c57', fontSize:'16px', outline:'none', boxSizing:'border-box'}}/>
              {mobile && <button type="button" onClick={clearInput} style={{position:'absolute', right:'12px', top:'50%', transform:'translateY(-50%)', background:'#20263c', color:'white', border:'none', width:'28px', height:'28px', borderRadius:'50%', fontSize:'14px'}}>✕</button>}
            </div>
            <button disabled={loading || mobile.length!==10} style={{height:'54px', borderRadius:'14px', background:mobile.length===10?'linear-gradient(90deg,#14b8a6,#3b82f6)':'#2a2f45', color:'white', fontWeight:'700', border:'none', fontSize:'16px', opacity:mobile.length===10?1:0.6}}>{loading?'Sending...':'Send OTP'}</button>
            <p style={{fontSize:'10px', color:'#64748b', textAlign:'center', margin:'0'}}>Box hamesha khali rahega - multi login ke liye upar se number chun sakte ho</p>
          </form>
        ):(
          <form onSubmit={verifyOtp} style={{display:'flex', flexDirection:'column', gap:'12px'}}>
            <p style={{fontSize:'12px', color:'#aeb5ca', textAlign:'center', margin:'0'}}>+91 {sessionStorage.getItem('phoenix_otp_mobile')} par OTP bheja</p>
            <input type="text" value={otp} maxLength={6} onChange={e=>setOtp(e.target.value.replace(/\D/g,'').slice(0,6))} placeholder="OTP" autoFocus style={{height:'58px', borderRadius:'14px', background:'#101426', color:'white', textAlign:'center', fontSize:'22px', letterSpacing:'8px', border:'1px solid #363c57', outline:'none'}}/>
            <button disabled={loading || otp.length<4} style={{height:'54px', borderRadius:'14px', background:'linear-gradient(90deg,#14b8a6,#3b82f6)', color:'white', fontWeight:'700', border:'none', fontSize:'16px'}}>{loading?'Verifying...':'Verify OTP'}</button>
            <button type="button" onClick={()=>{setStep('mobile'); setOtp(''); setMobile(''); setError(''); setMessage('')}} style={{height:'48px', borderRadius:'14px', background:'#20263c', color:'white', border:'none'}}>← Dusra Number Se Login</button>
          </form>
        )}

        <div style={{minHeight:'50px', marginTop:'10px'}}>
          {message && <div style={{padding:'12px', borderRadius:'12px', background:'rgba(0,200,150,0.15)', color:'#5eead4', fontSize:'12px', border:'1px solid rgba(0,200,150,0.2)'}}>{message}</div>}
          {error && <div style={{padding:'12px', borderRadius:'12px', background:'rgba(255,80,100,0.12)', color:'#ff9ba7', fontSize:'12px'}}>{error}</div>}
        </div>
      </div>
    </main>
  )
}
