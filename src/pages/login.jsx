import { useState, useEffect, useRef } from 'react'

function useLocalStorage(key, initial) {
  const [state, setState] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key) || '[]') }
    catch(e){ console.error(e); return initial }
  })
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(state)) }
    catch(e){ console.error(e) }
  }, [key, state])
  return [state, setState]
}

export default function Login({ onLogin }){
  const [mobile,setMobile]=useState('')
  const [otp,setOtp]=useState('')
  const [step,setStep]=useState('mobile')
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState('')
  const [savedMobiles, setSavedMobiles] = useLocalStorage('phoenix_mobiles', [])
  const timerRef = useRef(null)

  useEffect(() => { return () => clearTimeout(timerRef.current) }, [])

  const isValidMobile = mobile.length === 10
  const isValidOtp = otp.length === 6

  const handleSend = async (e) => {
    e.preventDefault(); setError('')
    if(!isValidMobile){ setError('10 digit mobile daalo'); return }
    setLoading(true)
    timerRef.current = setTimeout(()=>{ setStep('otp'); setLoading(false) }, 500)
  }

  const handleVerify = (e) => {
    e.preventDefault(); setError('')
    if(!isValidOtp){ setError('6 digit OTP daalo'); return }
    try {
      const next = [mobile,...savedMobiles.filter(m => m!== mobile)].slice(0,3)
      setSavedMobiles(next)
      localStorage.setItem('phoenix_current_mobile', mobile)
      localStorage.setItem('phoenix_token', 'login_'+Date.now())
      if(onLogin) onLogin(); else window.location.href='/'
    } catch(err){ setError('Storage error'); console.error(err) }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8 border border-amber-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl mx-auto flex items-center justify-center text-white text-2xl font-bold mb-4">P</div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Phoenix Arogyam</h1>
            <p className="text-gray-500 mt-2 text-sm">{step === 'mobile'? 'Enter mobile to continue' : `OTP sent to ${mobile}`}</p>
          </div>

          {step === 'mobile'? (
            <form onSubmit={handleSend} className="space-y-5" noValidate>
              <div>
                <label htmlFor="mobile" className="text-sm font-semibold text-gray-700 mb-2 block">Mobile Number</label>
                <input id="mobile" inputMode="numeric" value={mobile} onChange={e=>setMobile(e.target.value.replace(/\D/g,'').slice(0,10))} className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-amber-300 focus:ring-4 focus:ring-amber-100 outline-none transition-all" placeholder="10 digit mobile" aria-invalid={!!error} />
              </div>
              {error && <div role="alert" className="text-sm text-red-500">{error}</div>}
              <button disabled={!isValidMobile||loading} className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl font-semibold shadow-lg shadow-amber-200 disabled:opacity-50 transition-all" aria-busy={loading}>{loading?'Sending...':'Send OTP'}</button>
              {savedMobiles.length>0 && <div className="flex gap-2 flex-wrap">{savedMobiles.map(m=><button key={m} type="button" onClick={()=>setMobile(m)} className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-sm">{m}</button>)}</div>}
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-5" noValidate>
              <div>
                <label htmlFor="otp" className="text-sm font-semibold text-gray-700 mb-2 block">OTP</label>
                <input id="otp" inputMode="numeric" value={otp} onChange={e=>setOtp(e.target.value.replace(/\D/g,'').slice(0,6))} className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-amber-300 focus:ring-4 focus:ring-amber-100 outline-none tracking-[0.5em] text-center text-xl transition-all" placeholder="••••••" />
              </div>
              {error && <div role="alert" className="text-sm text-red-500">{error}</div>}
              <button disabled={!isValidOtp} className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl font-semibold shadow-lg shadow-amber-200 disabled:opacity-50 transition-all">Verify & Login</button>
              <button type="button" onClick={()=>{setStep('mobile'); setError('')}} className="w-full text-sm text-gray-500">Change number</button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
