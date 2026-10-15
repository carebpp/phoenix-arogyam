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
    try{
      const list = JSON.parse(localStorage.getItem('phoenix_mobiles')||'[]')
      setSavedMobiles(list)
    }catch{}
  },[])

  const handleMobileSubmit = async (e) => {
    e.preventDefault()
    setError(''); setMessage(''); setLoading(true)
    setTimeout(()=>{
      setMessage('OTP sent to '+mobile)
      setStep('otp')
      setLoading(false)
    }, 800)
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(()=>{
      const list = [mobile,...savedMobiles.filter(m=>m!==mobile)].slice(0,3)
      localStorage.setItem('phoenix_mobiles', JSON.stringify(list))
      localStorage.setItem('phoenix_token', 'logged_in')
      window.location.href = '/'
      setLoading(false)
    }, 800)
  }

  return (
    <div className="min-h-screen h-[100dvh] w-full flex items-center justify-center bg-slate-50 p-4 overflow-hidden">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 md:p-8 min-h-[520px] flex flex-col justify-center">
        <h1 className="text-2xl font-bold text-center mb-2">Phoenix Arogyam</h1>
        <p className="text-gray-500 text-center text-sm mb-6">Login to continue</p>
        {step==='mobile'? (
          <form onSubmit={handleMobileSubmit} className="space-y-4">
            <input type="tel" value={mobile} onChange={e=>setMobile(e.target.value)} placeholder="Mobile number" className="w-full border rounded-lg p-3" required />
            <button disabled={loading} className="w-full bg-blue-600 text-white p-3 rounded-lg">{loading?'Sending...':'Send OTP'}</button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <input type="text" value={otp} onChange={e=>setOtp(e.target.value)} placeholder="Enter OTP" className="w-full border rounded-lg p-3" required />
            <button disabled={loading} className="w-full bg-blue-600 text-white p-3 rounded-lg">{loading?'Verifying...':'Verify OTP'}</button>
            <button type="button" onClick={()=>setStep('mobile')} className="w-full text-sm text-gray-500">Change number</button>
          </form>
        )}
        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
        {message && <p className="text-green-600 text-sm mt-4 text-center">{message}</p>}
      </div>
    </div>
  )
}
