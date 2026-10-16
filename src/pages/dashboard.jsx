import { useState, useRef } from 'react'

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

export default function Dashboard({ onLogout }){
  const [activeTab, setActiveTab] = useState('janm')
  const samayRef = useRef(null)
  const [form, setForm] = useState({
    naam: '', dd: '', mm: '', yyyy: '', time: '', sthan: '', mobile: '', gotra: '', khana: 'Veg'
  })
  <button onClick={()=>{}} className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-xl font-bold mb-2">कुंडली देखें</button>
  const [result, setResult] = useState(null)

  const dobString = form.yyyy && form.mm && form.dd? `${form.yyyy}-${form.mm.padStart(2,'0')}-${form.dd.padStart(2,'0')}` : ''
<button onClick={()=>{}} className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-xl font-bold mb-2">कुंडली देखें</button>
  const handleSubmit = (e) => {
    e.preventDefault()
    const [mobileError, setMobileError] = useState('')
    const rashi = getRashi(dobString)
    setResult({...form, rashi, grahas: GRAHAS })
  }
  return (
    <div className="min-h-[100dvh] bg-[#fefce8] p-2 pb-20">
      <div className="max-w-[480px] mx-auto flex justify-between items-center py-3 px-2">
        <h1 className="text-[14px] font-bold text-amber-900 leading-tight">PHOENIX Arogyam JyotishाVidhya Kendra</h1>
        <button onClick={onLogout} className="text-[11px] bg-red-600 text-white px-3 py-1.5 rounded-full font-bold">Logout</button>
      </div>

      <div className="max-w-[480px] mx-auto flex gap-2 mb-4 px-2">
        <button onClick={()=>setActiveTab('janm')} className={`flex-1 py-2.5 rounded-xl text-sm font-bold border ${activeTab==='janm'?'bg-gradient-to-r from-amber-500 to-orange-600 text-white border-orange-400':'bg-white border-amber-200'}`}>जन्म कुंडली</button>
        <button onClick={()=>setActiveTab('vivah')} className={`flex-1 py-2.5 rounded-xl text-sm font-bold border ${activeTab==='vivah'?'bg-gradient-to-r from-amber-500 to-orange-600 text-white':'bg-white border-amber-200'}`}>विवाह लग्न</button>
        <button onClick={()=>setActiveTab('muhurat')} className={`flex-1 py-2.5 rounded-xl text-sm font-bold border ${activeTab==='muhurat'?'bg-gradient-to-r from-amber-500 to-orange-600 text-white':'bg-white border-amber-200'}`}>शुभ मुहूर्त</button>
      </div>

      {!result? (
        <div className="max-w-[480px] mx-auto bg-white rounded-2xl border-2 border-amber-300 p-4 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div><label className="text-sm font-bold">नाम</label><input value={form.naam} onChange={e=>setForm({...form, naam:e.target.value})} placeholder="पूरा नाम" required className="w-full mt-1 bg-amber-50 border border-amber-200 rounded-xl p-3 outline-none" /></div>
            <div>
              <label className="text-sm font-bold">जन्म तिथि DD/MM/YYYY</label>
              <div className="flex gap-2 mt-1">
                <input value={form.dd} onChange={e=>setForm({...form, dd:e.target.value.replace(/\D/g,'')})} placeholder="DD" maxLength={2} required className="w-1/3 bg-amber-50 border border-amber-200 rounded-xl p-3 text-center" />
                <input value={form.mm} onChange={e=>setForm({...form, mm:e.target.value.replace(/\D/g,'')})} placeholder="MM" maxLength={2} required className="w-1/3 bg-amber-50 border border-amber-200 rounded-xl p-3 text-center" />
                <input value={form.yyyy} onChange={e=>setForm({...form, yyyy:e.target.value.replace(/\D/g,'')})} placeholder="YYYY" maxLength={4} required className="w-1/3 bg-amber-50 border border-amber-200 rounded-xl p-3 text-center" />
              </div>
            </div>
            <div><label className="text-sm font-bold">जन्म समय</label><input ref={samayRef} type="time" value={form.time} onChange={e=>setForm({...form, time:e.target.value})} required className="w-full mt-1 bg-amber-50 border border-amber-200 rounded-xl p-3" /></div>
            <div><label className="text-sm font-bold">जन्म स्थान</label><input value={form.sthan} onChange={e=>setForm({...form, sthan:e.target.value})} placeholder="शहर / गाँव" required className="w-full mt-1 bg-amber-50 border border-amber-200 rounded-xl p-3" /></div>
            <div><label className="text-sm font-bold">गोत्र</label><input value={form.gotra} onChange={e=>setForm({...form, gotra:e.target.value})} placeholder="जैसे - भारद्वाज, कश्यप" required className="w-full mt-1 bg-amber-50 border border-amber-200 rounded-xl p-3" /></div>
            <div><label className="text-sm font-bold">खाना</label><select value={form.khana} onChange={e=>setForm({...form, khana:e.target.value})} className="w-full mt-1 bg-amber-50 border border-amber-200 rounded-xl p-3"><option>Veg</option><option>Non-Veg</option><option>Jain</option><option>Vegan</option></select></div>
            <div><label className="text-sm font-bold">मोबाइल {form.mobile.length}/10</label><input type="tel" value={form.mobile} onChange={e=>setForm({...form, mobile:e.target.value.replace(/\D/g,'')})} maxLength={10} placeholder="10 अंक" required className="w-full mt-1 bg-amber-50 border border-amber-200 rounded-xl p-3" /></div>
            <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3.5 rounded-xl">🔮 कुंडली देखें</button>
          </form>
        </div>
      ) : (
        <div className="max-w-[480px] mx-auto bg-white rounded-2xl border-2 border-amber-300 p-4">
          <h2 className="font-bold text-lg text-center text-amber-900">कुंडली - {result.naam}</h2>
          <p className="text-center text-sm mt-1">राशि: <b>{result.rashi}</b> | गोत्र: <b>{result.gotra}</b> | भोजन: <b>{result.khana}</b></p>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {result.grahas.map(g=><div key={g} className="bg-amber-50 border rounded-lg p-2 text-center text-xs">{g}</div>)}
          </div>
          <button onClick={()=>setResult(null)} className="w-full mt-4 bg-gray-100 py-2 rounded-xl">वापस</button>
        </div>
      )}
    </div>
  )
}
