import { useLocation, useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'

const RASHIS = ['Mesh', 'Vrishabh', 'Mithun', 'Kark', 'Singh', 'Kanya', 'Tula', 'Vrishchik', 'Dhanu', 'Makar', 'Kumbh', 'Meen']
const GRAHAS = ['Surya', 'Chandra', 'Mangal', 'Budh', 'Guru', 'Shukra', 'Shani', 'Rahu', 'Ketu']
const PAGE_META = [
  { key: 'kundli', label: '1. Janm Kundli' },
  { key: 'grah', label: '2. Grah Chal' },
  { key: 'future', label: '3. Bhagyafal' },
  { key: 'tithi', label: '4. Tithi Vimarsh' },
  { key: 'career', label: '5. Career / Business' }
]

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

function digitsSum(value) {
  return String(value)
    .replace(/\D/g, '')
    .split('')
    .reduce((sum, ch) => sum + Number(ch || 0), 0)
}

function generateChart(rashi) {
  const idx = RASHIS.indexOf(rashi)
  const houses = {}
  GRAHAS.forEach((g, i) => {
    const h = ((idx + i) % 12) + 1
    houses[h] = houses[h] ? `${houses[h]}, ${g}` : g
  })
  return Array.from({ length: 12 }, (_, i) => ({
    house: i + 1,
    grahas: houses[i + 1] || '—'
  }))
}

function generateFutureInsights(rashi, dob) {
  const seed = digitsSum(dob.replace(/-/g, ''))
  const base = [
    `Aapka ${rashi} rashi Shani aur Guru ki gati se 2026-2027 me dhan-samriddhi ko badhane wala hai.`,
    `Aapke jeevan me nayi takneek aur vyavsayik safalta ka avsar rahega.`,
    `Karma, satya aur niyat ke saath aapko sukh aur prabhav mil sakta hai.`,
    `Aapka man aajao se vishesh folling and focus will make the path smooth.`
  ]

  return base.map((line, i) => ({
    title: i === 0 ? 'Dhan / Bhugol' : i === 1 ? 'Vyavsay / Rozgar' : i === 2 ? 'Parivaar / Sukh' : 'Sanskar / Udaya',
    text: `${line} Ank yog: ${seed + i}`
  }))
}

function generateSudokuGrid(dob) {
  const raw = dob.replace(/-/g, '').split('').map(Number).filter((n) => !Number.isNaN(n))
  const base = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [4, 5, 6, 7, 8, 9, 1, 2, 3],
    [7, 8, 9, 1, 2, 3, 4, 5, 6],
    [2, 3, 4, 5, 6, 7, 8, 9, 1],
    [5, 6, 7, 8, 9, 1, 2, 3, 4],
    [8, 9, 1, 2, 3, 4, 5, 6, 7],
    [3, 4, 5, 6, 7, 8, 9, 1, 2],
    [6, 7, 8, 9, 1, 2, 3, 4, 5],
    [9, 1, 2, 3, 4, 5, 6, 7, 8]
  ]

  const offset = raw.length ? raw.reduce((sum, n) => sum + n, 0) % 9 : 3
  return base.map((row) => row.map((cell) => ((cell + offset - 1) % 9) + 1))
}

function buildCareerPrediction(dob, rashi) {
  const clean = dob.replace(/-/g, '')
  const total = clean.split('').reduce((sum, ch) => sum + Number(ch || 0), 0)
  const businessScore = (total + (RASHIS.indexOf(rashi) + 1) * 2) % 100
  const jobScore = (total + 18 + (RASHIS.indexOf(rashi) * 3)) % 100

  let path = businessScore >= jobScore ? 'Business' : 'Job'
  let note = path === 'Business'
    ? 'Aapko vyavsay aur swatantra kary ko adhik labh milega, pratyek nayi soch ko yojana ke saath follow karo.'
    : 'Aapko adhik suklad rahega jab aap ek stable prabandh, team aur discipline ke saath kaam karoge.'

  return {
    total,
    businessScore,
    jobScore,
    path,
    note,
    keywords: ['Leadership', 'Planning', 'Focus', 'Service', 'Network']
  }
}

export default function JyotishDashboard() {
  const location = useLocation()
  const navigate = useNavigate()
  const [page, setPage] = useState(0)

  const details = useMemo(() => {
    const userData = location.state || {
      naam: 'Demo User',
      dob: '2000-11-12',
      time: '08:30',
      sthan: 'Varanasi',
      gotra: 'Kashyapa',
      mobile: '9876543210'
    }

    const rashi = getRashi(userData.dob)
    const chart = generateChart(rashi)
    const future = generateFutureInsights(rashi, userData.dob)
    const sudoku = generateSudokuGrid(userData.dob)
    const career = buildCareerPrediction(userData.dob, rashi)

    return {
      ...userData,
      rashi,
      chart,
      future,
      sudoku,
      career,
      dobDisplay: userData.dob ? new Date(userData.dob).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '—'
    }
  }, [location.state])

  return (
    <div style={{ minHeight: '100vh', background: '#fefce8', padding: '16px 12px 40px' }}>
      <div style={{ maxWidth: '520px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#9a4d00', fontWeight: 700 }}>PHOENIX AROGYAM</div>
            <h2 style={{ margin: 0, color: '#7c2d12', fontSize: '22px' }}>Jyotish Pradarshan</h2>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            style={{ background: '#facc15', border: 'none', borderRadius: '999px', padding: '8px 12px', fontWeight: 700, color: '#7c2d12' }}
          >
            Back
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: '6px', marginBottom: '16px' }}>
          {PAGE_META.map((item, idx) => (
            <button
              key={item.key}
              onClick={() => setPage(idx)}
              style={{
                border: page === idx ? '2px solid #f59e0b' : '1px solid #fcd34d',
                background: page === idx ? 'linear-gradient(135deg, #f59e0b, #ea580c)' : '#fff',
                color: page === idx ? '#fff' : '#7c2d12',
                borderRadius: '12px',
                padding: '8px 4px',
                fontWeight: 700,
                fontSize: '10px',
                minHeight: '52px'
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {page === 0 && (
          <div style={{ background: '#fff', border: '2px solid #fbbf24', borderRadius: '18px', padding: '16px' }}>
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
              <h3 style={{ margin: 0, color: '#7c2d12', fontSize: '24px' }}>{details.naam}</h3>
              <p style={{ margin: '8px 0 0', color: '#92400e', fontSize: '12px' }}>
                <b>Rashi:</b> {details.rashi} &nbsp; | &nbsp; <b>Janm Sthan:</b> {details.sthan}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: '6px', marginBottom: '12px' }}>
              <div style={{ background: '#fef3c7', borderRadius: '10px', padding: '8px', fontSize: '11px' }}><b>DOB</b><br />{details.dobDisplay}</div>
              <div style={{ background: '#fef3c7', borderRadius: '10px', padding: '8px', fontSize: '11px' }}><b>Samay</b><br />{details.time}</div>
              <div style={{ background: '#fef3c7', borderRadius: '10px', padding: '8px', fontSize: '11px' }}><b>Gotra</b><br />{details.gotra}</div>
              <div style={{ background: '#fef3c7', borderRadius: '10px', padding: '8px', fontSize: '11px' }}><b>Mobile</b><br />{details.mobile}</div>
            </div>

            <h4 style={{ margin: '0 0 8px', color: '#7c2d12' }}>12 Rashi Grah Chart</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: '8px' }}>
              {details.chart.map((item) => (
                <div key={item.house} style={{ background: item.house === 1 ? '#fef3c7' : '#fff7ed', border: '1px solid #fdba74', borderRadius: '8px', padding: '8px 6px', minHeight: '56px' }}>
                  <div style={{ fontSize: '9px', fontWeight: 700, color: '#9a4d00' }}>Ghar {item.house}</div>
                  <div style={{ fontSize: '10px', marginTop: '4px', color: '#7c2d12' }}>{item.grahas}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {page === 1 && (
          <div style={{ background: '#fff', border: '2px solid #fbbf24', borderRadius: '18px', padding: '16px' }}>
            <h3 style={{ textAlign: 'center', marginTop: 0, color: '#7c2d12' }}>Grah Chal / Rashi Analysis</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: '8px' }}>
              {GRAHAS.map((grah, idx) => (
                <div key={grah} style={{ background: '#f3f4f6', borderRadius: '10px', padding: '8px', border: '1px solid #d1d5db' }}>
                  <div style={{ fontWeight: 700, fontSize: '11px', color: '#374151' }}>{grah}</div>
                  <div style={{ fontSize: '10px', marginTop: '6px', color: '#4b5563' }}>
                    {details.chart[(idx + RASHIS.indexOf(details.rashi)) % 12]?.house || '—'} house position
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '16px', background: '#fffbeb', borderRadius: '12px', padding: '12px' }}>
              <div style={{ fontWeight: 800, color: '#7c2d12' }}>Grah Samanya Fal</div>
              <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#52473b' }}>
                {details.rashi} rashi ka janm grah chal aapko seva, vivek aur drishti me sadharan bal dikhata hai. Aapki pragati vahin hogi jahan aap apni soch ko niyamit aur parampara ke saath lekar chaloge.
              </p>
            </div>
          </div>
        )}

        {page === 2 && (
          <div style={{ background: '#fff', border: '2px solid #fbbf24', borderRadius: '18px', padding: '16px' }}>
            <h3 style={{ textAlign: 'center', marginTop: 0, color: '#7c2d12' }}>Bhagyafal / Future</h3>
            {details.future.map((item) => (
              <div key={item.title} style={{ background: '#f0fdf4', borderLeft: '4px solid #22c55e', borderRadius: '10px', padding: '10px', marginBottom: '10px' }}>
                <div style={{ fontWeight: 800, color: '#166534', fontSize: '12px' }}>{item.title}</div>
                <p style={{ margin: '6px 0 0', fontSize: '12px', color: '#14532d' }}>{item.text}</p>
              </div>
            ))}
          </div>
        )}

        {page === 3 && (
          <div style={{ background: '#fff', border: '2px solid #fbbf24', borderRadius: '18px', padding: '16px' }}>
            <h3 style={{ textAlign: 'center', marginTop: 0, color: '#7c2d12' }}>Janm Tithi Vimarsh + Sudoku Chart</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: '8px', marginBottom: '14px' }}>
              <div style={{ background: '#fef2f2', borderRadius: '10px', padding: '8px', fontSize: '11px' }}><b>Tithi Number</b><br />{digitsSum(details.dob.replace(/-/g, ''))}</div>
              <div style={{ background: '#f0fdf4', borderRadius: '10px', padding: '8px', fontSize: '11px' }}><b>Rashi</b><br />{details.rashi}</div>
              <div style={{ background: '#eff6ff', borderRadius: '10px', padding: '8px', fontSize: '11px' }}><b>Shakti Index</b><br />{(digitsSum(details.dob.replace(/-/g, '')) % 27) + 9}</div>
            </div>

            <p style={{ fontSize: '12px', color: '#6b7280', marginTop: 0 }}>
              Janm tithi ke ank aur rashi ka prabhav aapke manasik sakti, niyamitata aur pravratti ko darshata hai. Neeche 9x9 Sudoku chart ank-bhed se bana hua hai, jo sadharan jod aur uthhan ka sanket deta hai.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: '3px', background: '#111827', padding: '6px', borderRadius: '12px', marginTop: '12px' }}>
              {details.sudoku.flat().map((n, idx) => (
                <div key={`${idx}-${n}`} style={{ background: '#fff', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#7c2d12', fontSize: '10px' }}>
                  {n}
                </div>
              ))}
            </div>
          </div>
        )}

        {page === 4 && (
          <div style={{ background: '#fff', border: '2px solid #fbbf24', borderRadius: '18px', padding: '16px' }}>
            <h3 style={{ textAlign: 'center', marginTop: 0, color: '#7c2d12' }}>Naukri / Business Kary Faladesh</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: '8px', marginBottom: '12px' }}>
              <div style={{ background: '#fef3c7', borderRadius: '10px', padding: '10px' }}>
                <div style={{ fontSize: '10px', color: '#92400e' }}>Job Score</div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#7c2d12' }}>{details.career.jobScore}</div>
              </div>
              <div style={{ background: '#f0fdf4', borderRadius: '10px', padding: '10px' }}>
                <div style={{ fontSize: '10px', color: '#166534' }}>Business Score</div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#166534' }}>{details.career.businessScore}</div>
              </div>
            </div>

            <div style={{ background: '#f8fafc', border:'1px solid #cbd5e1', borderRadius:'12px', padding:'12px' }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>Recommended Path</div>
              <div style={{ marginTop: '8px', fontSize: '24px', fontWeight: 800, color: '#7c2d12' }}>{details.career.path}</div>
              <p style={{ fontSize: '12px', color: '#334155', margin: '8px 0 0' }}>{details.career.note}</p>
            </div>

            <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {details.career.keywords.map((word) => (
                <span key={word} style={{ background: '#e2e8f0', borderRadius: '999px', padding: '6px 10px', fontSize: '11px', color: '#334155', fontWeight: 700 }}>
                  {word}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
