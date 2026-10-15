import { useState, useEffect } from 'react'

export default function Login({ onLogin }){
  const [mobile,setMobile]=useState('')
  const [otp,setOtp]=useState('')
  const [step,setStep]=useState('mobile')
  const [loading,setLoading]=useState(false)
  const [savedMobiles,setSavedMobiles]=useState([])

  useEffect(()=>{
    try{ const list = JSON.parse(localStorage.getItem('phoenix_mobiles')||'[]'); setSavedMobiles(list) }catch{}
  },[])

  const isValidMobile = mobile.length===10

  const handleSend = async (e) => {
    e.preventDefault()
    if(!isValidMobile) return
    setLoading(true)
    setTimeout(()=>{ setStep('otp'); setLoading(false) }, 500)
  }

  const handleVerify = (e) => {
    e.preventDefault()
    localStorage.setItem('phoenix_mobiles', JSON.stringify([mobile,...savedMobiles.filter(m=>m!==mobile)].slice(0,3)))
    localStorage.setItem('phoenix_current_mobile', mobile)
    localStorage.setItem('phoenix_token', 'login_'+Date.now())
    if(onLogin) onLogin(); else window.location.href='/'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fefce8] p-4">
      <div className="w-full max-w-[380px] bg-white rounded-2xl p-8 shadow-xl border border-amber-200">
        <h1 className="text-2xl font-extrabold text-center text-amber-900">Phoenix Arogyam</h1>
        <p className="text-center text-gray-500 text-sm mt-1 mb-6">Login to continue</p>

        {step==='mobile'? (
          <form onSubmit={handleSend} className="space-y-4">
            <div>
              <label className="text-sm font-bold text-gray-700">Mobile {mobile.length}/10</label>
              <input type="tel" value={mobile} onChange={e=>setMobile(e.target.value.replace(/\D/g,''))} maxLength={10} placeholder="97589XXXXX" required
                className="w-full mt-1 p-3 rounded-xl border-2 border-amber-200 bg-amber-50 outline-none focus:border-amber-500" />
            </div>
            <button disabled={!isValidMobile || loading} className={`w-full py-3 rounded-xl font-bold text-white ${isValidMobile? 'bg-gradient-to-r from-amber-500 to-orange-600' : 'bg-gray-300'}`}>
              {loading? 'Sending...' : 'Send OTP'}
            </button>
            {savedMobiles.length>0 && <div className="flex gap-2">{savedMobiles.map(m=><button key={m} type="button" onClick={()=>setMobile(m)} className="text-xs bg-gray-100 px-3 py-1 rounded-full">{m}</button>)}</div>}
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <p className="text-sm text-green-600 font-medium">OTP sent to {mobile} (Use 1234)</p>
            <input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="Enter OTP - 1234" required
              className="w-full p-3 rounded-xl border-2 border-amber-200 bg-amber-50 outline-none" />
            <div className="flex gap-2">
              <button type="submit" className="flex-1 py-3 rounded-xl font-bold bg-blue-600 text-white">Verify OTP</button>
              <button type="button" onClick={()=>setStep('mobile')} className="flex-1 py-3 rounded-xl bg-gray-100 font-bold">Change number</button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
