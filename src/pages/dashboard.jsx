import { useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'

const GRAHAS = ['Surya', 'Chandra', 'Mangal', 'Budh', 'Guru', 'Shukra', 'Shani', 'Rahu', 'Ketu']

function getRashi(dob) {
  if (!dob || dob.length < 10) return ''
  const d = new Date(dob)
  if (Number.isNaN(d.getTime())) return ''
  const m = d.getMonth() + 1
  const day = d.getDate()

  if ((m === 3 && day >= 21) || (m === 4 && day <= 19)) return 'Mesh'
  if ((m === 4 && day >= 20) || (m === 5 && day <= 20)) return 'Vrishabh'
  if ((m === 5 && day >= 21) || (m === 6 && day <= 20)) return 'Mithun'
  if ((m === 6 && day >= 21) || (m === 7 && day <= 22)) return 'Kark'
  if ((m === 7 && day >= 23) || (m === 8 && day <= 22)) return 'Singh'
  if ((m === 8 && day >= 23) || (m === 9 && day <= 22)) return 'Kanya'
  if ((m === 9 && day >= 23) || (m === 10 && day <= 22)) return 'Tula'
  if ((m === 10 && day >= 23) || (m === 11 && day <= 21)) return 'Vrishchik'
  if ((m === 11 && day >= 22) || (m === 12 && day <= 21)) return 'Dhanu'
  if ((m === 12 && day >= 22) || (m === 1 && day <= 19)) return 'Makar'
  if ((m === 1 && day >= 20) || (m === 2 && day <= 18)) return 'Kumbh'
  return 'Meen'
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('janm')
  const [form, setForm] = useState({
    naam: '',
    dd: '',
    mm: '',
    yyyy: '',
    time: '',
    sthan: '',
    gotra: '',
    mobile: '',
    khana: 'Veg'
  })

  const dobString = useMemo(() => {
    if (!form.yyyy || !form.mm || !form.dd) return ''
    return `${form.yyyy}-${form.mm.padStart(2, '0')}-${form.dd.padStart(2, '0')}`
  }, [form.dd, form.mm, form.yyyy])

  const rashi = useMemo(() => getRashi(dobString), [dobString])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.naam || !form.dd || !form.mm || !form.yyyy || !form.time || !form.sthan || !form.mobile) {
      alert('Sab fields fill karo')
      return
    }

    navigate('/jyotish', {
      state: {
        naam: form.naam,
        dob: dobString,
        time: form.time,
        sthan: form.sthan,
        gotra: form.gotra,
        mobile: form.mobile,
        khana: form.khana
      }
    })
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f1e6', padding: '12px 16px 40px' }}>
      <div style={{ maxWidth: '520px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#7c2d12' }}>PHOENIX AROGYAM</h1>
          <button
            onClick={() => {
              localStorage.removeItem('phoenix-auth')
              navigate('/login', { replace: true })
            }}
            style={{ background: '#dc2626', color: '#fff', border: 'none', borderRadius: '999px', padding: '8px 12px', fontWeight: 700, cursor: 'pointer' }}
          >
            Logout
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '14px' }}>
          {[
            { id: 'janm', label: 'जन्म कुंडली' },
            { id: 'vivah', label: 'विवाह लगा' },
            { id: 'muhurat', label: 'शुभ मुहूर्त' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? 'linear-gradient(135deg, #f59e0b, #ea580c)' : '#fff',
                border: '2px solid #fbbf24',
                color: activeTab === tab.id ? '#fff' : '#7c2d12',
                borderRadius: '12px',
                padding: '12px 8px',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#fff', border: '2px solid #fbbf24', borderRadius: '18px', padding: '16px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: '#7c2d12' }}>नाम</label>
              <input value={form.naam} onChange={(e) => setForm({ ...form, naam: e.target.value })} placeholder="पूरा नाम" required style={{ width: '100%', height: '42px', border: '1px solid #f5d0a8', borderRadius: '10px', padding: '0 12px', background: '#fffbeb' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: '#7c2d12' }}>जन्म तिथि DD/MM/YYYY</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr', gap: '8px' }}>
                <input value={form.dd} onChange={(e) => setForm({ ...form, dd: e.target.value.replace(/\D/g, '').slice(0, 2) })} placeholder="DD" required style={{ height: '42px', border: '1px solid #f5d0a8', borderRadius: '10px', padding: '0 12px', background: '#fffbeb' }} />
                <input value={form.mm} onChange={(e) => setForm({ ...form, mm: e.target.value.replace(/\D/g, '').slice(0, 2) })} placeholder="MM" required style={{ height: '42px', border: '1px solid #f5d0a8', borderRadius: '10px', padding: '0 12px', background: '#fffbeb' }} />
                <input value={form.yyyy} onChange={(e) => setForm({ ...form, yyyy: e.target.value.replace(/\D/g, '').slice(0, 4) })} placeholder="YYYY" required style={{ height: '42px', border: '1px solid #f5d0a8', borderRadius: '10px', padding: '0 12px', background: '#fffbeb' }} />
              </div>
              {rashi && <div style={{ fontSize: '12px', marginTop: '6px', color: '#92400e', fontWeight: 700 }}>Detected Rashi: {rashi}</div>}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: '#7c2d12' }}>जन्म समय</label>
              <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} required style={{ width: '100%', height: '42px', border: '1px solid #f5d0a8', borderRadius: '10px', padding: '0 12px', background: '#fffbeb' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: '#7c2d12' }}>जन्म स्थान</label>
              <input value={form.sthan} onChange={(e) => setForm({ ...form, sthan: e.target.value })} placeholder="शहर / स्थान" required style={{ width: '100%', height: '42px', border: '1px solid #f5d0a8', borderRadius: '10px', padding: '0 12px', background: '#fffbeb' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: '#7c2d12' }}>गोत्र</label>
              <input value={form.gotra} onChange={(e) => setForm({ ...form, gotra: e.target.value })} placeholder="जैसे - Kashyapa" style={{ width: '100%', height: '42px', border: '1px solid #f5d0a8', borderRadius: '10px', padding: '0 12px', background: '#fffbeb' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: '#7c2d12' }}>खाना</label>
              <select value={form.khana} onChange={(e) => setForm({ ...form, khana: e.target.value })} style={{ width: '100%', height: '42px', border: '1px solid #f5d0a8', borderRadius: '10px', padding: '0 12px', background: '#fffbeb' }}>
                <option value="Veg">Veg</option>
                <option value="NonVeg">Non Veg</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: '#7c2d12' }}>मोबाइल</label>
              <input value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) })} placeholder="मोबाइल नंबर" required style={{ width: '100%', height: '42px', border: '1px solid #f5d0a8', borderRadius: '10px', padding: '0 12px', background: '#fffbeb' }} />
            </div>

            <button type="submit" style={{ width: '100%', height: '48px', border: 'none', borderRadius: '10px', background: 'linear-gradient(135deg, #f59e0b, #ea580c)', color: '#fff', fontWeight: 800, fontSize: '18px', cursor: 'pointer' }}>
              🔮 कुंडली देखें
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
