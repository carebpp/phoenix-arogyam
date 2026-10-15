import { useState } from 'react'

export default function Dashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('janm')
  const [form, setForm] = useState({
    naam: '', dd: '', mm: '', yyyy: '', time: '', sthan: '', mobile: '', gotra: '', khana: 'Veg'
  })

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(form.mobile.length!==10) return alert('10 ank ka mobile dalo')
    alert(`Kundli taiyaar hai - ${form.naam} ji, Gotra: ${form.gotra}, Khana: ${form.khana}`)
  }

  return (
    <div className="min-h-[100dvh] bg-[#fefce8] p-2 pb-10">
      {/* Header with Logout */}
      <div className="max-w-[480px] mx-auto flex justify-between items-center py-3 px-2">
        <h1 className="text-[15px] font-bold text-amber-900">फीनिक्स आरोग्यम ज्योतिष विद्या केन्द्रम्</h1>
        <button onClick={onLogout} className="text-xs bg-red-500 text-white px-3 py-1.5 rounded-full font-bold">Logout</button>
      </div>

      {/* Tabs */}
      <div className="max-w-[480px] mx-auto flex gap-2 mb-4 px-2">
        {[
          { id: 'janm', label: 'जन्म कुंडली' },
          { id: 'vivah', label: 'विवाह लग्न' },
          { id: 'muhurat', label: 'शुभ मुहूर्त' },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold border ${activeTab===tab.id? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white border-orange-400' : 'bg-white text-gray-700 border-amber-200'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form Card */}
      <div className="max-w-[480px] mx-auto bg-white rounded-2xl border-2 border-amber-300 p-4 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="text-sm font-bold">नाम</label>
            <input name="naam" value={form.naam} onChange={handleChange} placeholder="पूरा नाम" required
              className="w-full mt-1 bg-amber-50 border border-amber-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-amber-400" />
          </div>

          <div>
            <label className="text-sm font-bold">जन्म तिथि DD/MM/YYYY</label>
            <div className="flex gap-2 mt-1">
              <input name="dd" value={form.dd} onChange={handleChange} placeholder="DD" maxLength={2} required
                className="w-1/3 bg-amber-50 border border-amber-200 rounded-xl p-3 text-center outline-none" />
              <input name="mm" value={form.mm} onChange={handleChange} placeholder="MM" maxLength={2} required
                className="w-1/3 bg-amber-50 border border-amber-200 rounded-xl p-3 text-center outline-none" />
              <input name="yyyy" value={form.yyyy} onChange={handleChange} placeholder="YYYY" maxLength={4} required
                className="w-1/3 bg-amber-50 border border-amber-200 rounded-xl p-3 text-center outline-none" />
            </div>
          </div>

          <div>
            <label className="text-sm font-bold">जन्म समय</label>
            <input type="time" name="time" value={form.time} onChange={handleChange} required
              className="w-full mt-1 bg-amber-50 border border-amber-200 rounded-xl p-3 outline-none" />
          </div>

          <div>
            <label className="text-sm font-bold">जन्म स्थान</label>
            <input name="sthan" value={form.sthan} onChange={handleChange} placeholder="शहर / गाँव" required
              className="w-full mt-1 bg-amber-50 border border-amber-200 rounded-xl p-3 outline-none" />
          </div>

          {/* Gotra - Missing tha */}
          <div>
            <label className="text-sm font-bold">गोत्र</label>
            <input name="gotra" value={form.gotra} onChange={handleChange} placeholder="जैसे - भारद्वाज, कश्यप" required
              className="w-full mt-1 bg-amber-50 border border-amber-200 rounded-xl p-3 outline-none" />
          </div>

          {/* Khana - Missing tha */}
          <div>
            <label className="text-sm font-bold">खाना / भोजन</label>
            <select name="khana" value={form.khana} onChange={handleChange}
              className="w-full mt-1 bg-amber-50 border border-amber-200 rounded-xl p-3 outline-none">
              <option value="Veg">शाकाहारी (Veg)</option>
              <option value="Non-Veg">मांसाहारी (Non-Veg)</option>
              <option value="Vegan">Vegan</option>
              <option value="Jain">जैन भोजन</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-bold">मोबाइल {form.mobile.length}/10</label>
            <input name="mobile" type="tel" maxLength={10} value={form.mobile} onChange={(e)=>setForm({...form, mobile: e.target.value.replace(/\D/g,'')})} placeholder="10 अंक" required
              className="w-full mt-1 bg-amber-50 border border-amber-200 rounded-xl p-3 outline-none" />
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3.5 rounded-xl mt-2">
            🔮 कुंडली देखें
          </button>
        </form>
      </div>
    </div>
  )
}
