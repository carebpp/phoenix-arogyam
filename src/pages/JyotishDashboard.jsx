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
    `Aapka man aur sankalp aaj ke yug me ek nayi unchai ko chhoo sakta hai.`
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

  const outerShell = {
    minHeight: '100vh',
    background: 'radial-gradient(circle at top, #fff7c2 0%, #fef3c7 20%, #f5d0fe 45%, #1e1b4b 100%)',
    padding: '18px 12px 40px',
    fontFamily: 'Segoe UI, Arial, sans-serif'
  }

  const panel = {
    maxWidth: '520px',
    margin: '0 auto',
    perspective: '1200px'
  }

  const topCard = {
    background: 'linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.04))',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255,255,255,0.28)',
    borderRadius: '24px',
    padding: '16px 16px 14px',
    boxShadow: '0 20px 45px rgba(17, 24, 39, 0.45), inset 0 2px 8px rgba(255,255,255,0.28)',
    transform: 'rotateX(8deg)',
    transformStyle: 'preserve-3d'
  }

  const navButton = (active) => ({
    border: active ? '1px solid rgba(251,191,36,0.9)' : '1px solid rgba(255,255,255,0.25)',
    background: active ? 'linear-gradient(135deg, #f59e0b, #ea580c)' : 'linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,255,255,0.05))',
    color: active ? '#fff' : '#fff7ed',
    borderRadius: '14px',
    padding: '10px 6px',
    fontWeight: 800,
    fontSize: '10px',
    minHeight: '58px',
    boxShadow: active ? '0 12px 22px rgba(249,115,22,0.38)' : '0 8px 18px rgba(15, 23, 42, 0.18)',
    transform: active ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
    transition: 'all 0.2s ease'
  })

  const infoCard = {
    background: 'linear-gradient(145deg, rgba(255,255,255,0.26), rgba(255,255,255,0.08))',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '18px',
    padding: '14px',
    boxShadow: '0 16px 28px rgba(0, 0, 0, 0.18)',
    transform: 'translateZ(18px)',
    backdropFilter: 'blur(5px)'
  }

  return (
    <div style={outerShell}>
      <div style={panel}>
        <div style={topCard}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div>
              <div style={{ fontSize: '11px', letterSpacing: '1.5px', color: '#fef3c7', fontWeight: 800 }}>PHOENIX AROGYAM</div>
              <h2 style={{ margin: '4px 0 0', color: '#fff7ed', fontSize: '24px', textShadow: '0 4px 14px rgba(0,0,0,0.28)' }}>Jyotish Dashboard</h2>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              style={{
                background: 'linear-gradient(135deg, #fde68a, #f59e0b)',
                border: 'none',
                borderRadius: '999px',
                padding: '8px 14px',
                fontWeight: 800,
                color: '#4c1d00',
                boxShadow: '0 10px 20px rgba(245,158,11,0.45)'
              }}
            >
              Back
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: '8px', marginBottom: '16px' }}>
            {PAGE_META.map((item, idx) => (
              <button
                key={item.key}
                onClick={() => setPage(idx)}
                style={navButton(page === idx)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '18px' }}>
          {page === 0 && (
            <div style={{ ...infoCard, background: 'linear-gradient(155deg, rgba(255,255,255,0.28), rgba(254,240,138,0.16))' }}>
              <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                <h3 style={{ margin: 0, color: '#fff7ed', fontSize: '28px', textShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>{details.naam}</h3>
                <p style={{ margin: '8px 0 0', color: '#fef9c3', fontSize: '12px' }}>
                  <b>Rashi:</b> {details.rashi} &nbsp; | &nbsp; <b>Janm Sthan:</b> {details.sthan}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: '8px', marginBottom: '14px' }}>
                <div style={{ background: 'linear-gradient(180deg, #fef3c7, #fcd34d)', borderRadius: '12px', padding: '10px 8px', color: '#7c2d12', boxShadow: 'inset 0 2px 8px rgba(255,255,255,0.5)' }}>
                  <div style={{ fontSize: '9px', fontWeight: 800 }}>DOB</div>
                  <div style={{ fontSize: '11px', marginTop: '4px', fontWeight: 700 }}>{details.dobDisplay}</div>
                </div>
                <div style={{ background: 'linear-gradient(180deg, #fef3c7, #fcd34d)', borderRadius: '12px', padding: '10px 8px', color: '#7c2d12' }}>
                  <div style={{ fontSize: '9px', fontWeight: 800 }}>Samay</div>
                  <div style={{ fontSize: '11px', marginTop: '4px', fontWeight: 700 }}>{details.time}</div>
                </div>
                <div style={{ background: 'linear-gradient(180deg, #fef3c7, #fcd34d)', borderRadius: '12px', padding: '10px 8px', color: '#7c2d12' }}>
                  <div style={{ fontSize: '9px', fontWeight: 800 }}>Gotra</div>
                  <div style={{ fontSize: '11px', marginTop: '4px', fontWeight: 700 }}>{details.gotra}</div>
                </div>
                <div style={{ background: 'linear-gradient(180deg, #fef3c7, #fcd34d)', borderRadius: '12px', padding: '10px 8px', color: '#7c2d12' }}>
                  <div style={{ fontSize: '9px', fontWeight: 800 }}>Mobile</div>
                  <div style={{ fontSize: '11px', marginTop: '4px', fontWeight: 700 }}>{details.mobile}</div>
                </div>
              </div>

              <h4 style={{ margin: '0 0 10px', color: '#fef3c7', fontSize: '16px' }}>12 Rashi Grah Chart</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: '8px' }}>
                {details.chart.map((item) => (
                  <div key={item.house} style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.32), rgba(255,255,255,0.08))',
                    border: '1px solid rgba(253,224,71,0.38)',
                    borderRadius: '12px',
                    padding: '8px 6px',
                    minHeight: '62px',
                    boxShadow: '0 10px 18px rgba(0,0,0,0.12)',
                    transform: 'translateZ(10px)'
                  }}>
                    <div style={{ fontSize: '9px', fontWeight: 800, color: '#fef3c7' }}>Ghar {item.house}</div>
                    <div style={{ fontSize: '10px', marginTop: '4px', color: '#fffaf0' }}>{item.grahas}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {page === 1 && (
            <div style={{ ...infoCard, background: 'linear-gradient(155deg, rgba(255,255,255,0.28), rgba(59,130,246,0.12))' }}>
              <h3 style={{ textAlign: 'center', margin: '0 0 14px', color: '#fef3c7', fontSize: '20px' }}>Grah Chal / Rashi Analysis</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: '8px' }}>
                {GRAHAS.map((grah, idx) => (
                  <div key={grah} style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.18), rgba(15, 23, 42, 0.12))',
                    borderRadius: '12px',
                    padding: '10px',
                    border: '1px solid rgba(255,255,255,0.18)',
                    transform: 'translateZ(12px)',
                    boxShadow: '0 12px 18px rgba(15,23,42,0.18)'
                  }}>
                    <div style={{ fontWeight: 800, fontSize: '11px', color: '#f8fafc' }}>{grah}</div>
                    <div style={{ fontSize: '10px', marginTop: '6px', color: '#e2e8f0' }}>
                      {details.chart[(idx + RASHIS.indexOf(details.rashi)) % 12]?.house || '—'} house
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '14px', background: 'linear-gradient(180deg, rgba(255,251,235,0.18), rgba(251,191,36,0.1))', borderRadius: '14px', padding: '12px', border: '1px solid rgba(253,224,71,0.34)' }}>
                <div style={{ fontWeight: 900, color: '#fef3c7', fontSize: '12px' }}>Grah Samanya Fal</div>
                <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#fef9c3', lineHeight: '1.5' }}>
                  {details.rashi} rashi ka janm grah chal aapko seva, vivek aur drishti me sadharan bal dikhata hai. Aapki pragati vahin hogi jahan aap apni soch ko niyamit aur parampara ke saath lekar chaloge.
                </p>
              </div>
            </div>
          )}

          {page === 2 && (
            <div style={{ ...infoCard, background: 'linear-gradient(155deg, rgba(255,255,255,0.28), rgba(34,197,94,0.12))' }}>
              <h3 style={{ textAlign: 'center', margin: '0 0 14px', color: '#fef3c7', fontSize: '20px' }}>Bhagyafal / Future</h3>
              {details.future.map((item) => (
                <div key={item.title} style={{ background: 'linear-gradient(180deg, rgba(240,253,244,0.2), rgba(22,163,74,0.08))', borderLeft: '4px solid #4ade80', borderRadius: '12px', padding: '10px 10px 10px 12px', marginBottom: '10px', boxShadow: '0 10px 20px rgba(34,197,94,0.1)' }}>
                  <div style={{ fontWeight: 900, color: '#dcfce7', fontSize: '12px' }}>{item.title}</div>
                  <p style={{ margin: '6px 0 0', fontSize: '12px', color: '#ecfdf5', lineHeight: '1.5' }}>{item.text}</p>
                </div>
              ))}
            </div>
          )}

          {page === 3 && (
            <div style={{ ...infoCard, background: 'linear-gradient(155deg, rgba(255,255,255,0.28), rgba(244,114,182,0.12))' }}>
              <h3 style={{ textAlign: 'center', margin: '0 0 14px', color: '#fef3c7', fontSize: '20px' }}>Janm Tithi Vimarsh + Sudoku Chart</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: '8px', marginBottom: '12px' }}>
                <div style={{ background: 'linear-gradient(180deg, rgba(254,226,226,0.24), rgba(251,113,133,0.08))', borderRadius: '12px', padding: '10px', color: '#fef2f2' }}>
                  <div style={{ fontSize: '9px', fontWeight: 800 }}>Tithi Number</div>
                  <div style={{ fontSize: '18px', fontWeight: 900, marginTop: '6px' }}>{digitsSum(details.dob.replace(/-/g, ''))}</div>
                </div>
                <div style={{ background: 'linear-gradient(180deg, rgba(240,253,244,0.2), rgba(34,197,94,0.08))', borderRadius: '12px', padding: '10px', color: '#f0fdf4' }}>
                  <div style={{ fontSize: '9px', fontWeight: 800 }}>Rashi</div>
                  <div style={{ fontSize: '18px', fontWeight: 900, marginTop: '6px' }}>{details.rashi}</div>
                </div>
                <div style={{ background: 'linear-gradient(180deg, rgba(239,246,255,0.2), rgba(59,130,246,0.08))', borderRadius: '12px', padding: '10px', color: '#eff6ff' }}>
                  <div style={{ fontSize: '9px', fontWeight: 800 }}>Shakti Index</div>
                  <div style={{ fontSize: '18px', fontWeight: 900, marginTop: '6px' }}>{(digitsSum(details.dob.replace(/-/g, '')) % 27) + 9}</div>
                </div>
              </div>

              <p style={{ fontSize: '12px', color: '#e2e8f0', marginTop: 0, lineHeight: '1.6' }}>
                Janm tithi ke ank aur rashi ka prabhav aapke manasik sakti, niyamitata aur pravratti ko darshata hai. Neeche 9x9 Sudoku chart ank-bhed se bana hua hai, jo sadharan jod aur uthhan ka sanket deta hai.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: '3px', background: 'rgba(17, 24, 39, 0.9)', padding: '6px', borderRadius: '12px', marginTop: '12px', boxShadow: 'inset 0 2px 8px rgba(255,255,255,0.1)' }}>
                {details.sudoku.flat().map((n, idx) => (
                  <div key={`${idx}-${n}`} style={{ background: 'linear-gradient(180deg, #fff, #f5f3ff)', minHeight: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#7c2d12', fontSize: '10px', borderRadius: '4px' }}>
                    {n}
                  </div>
                ))}
              </div>
            </div>
          )}

          {page === 4 && (
            <div style={{ ...infoCard, background: 'linear-gradient(155deg, rgba(255,255,255,0.28), rgba(15,118,110,0.12))' }}>
              <h3 style={{ textAlign: 'center', margin: '0 0 14px', color: '#fef3c7', fontSize: '20px' }}>Naukri / Business Kary Faladesh</h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: '10px', marginBottom: '12px' }}>
                <div style={{ background: 'linear-gradient(180deg, rgba(254,243,199,0.2), rgba(251,191,36,0.08))', borderRadius: '12px', padding: '12px', border: '1px solid rgba(253,224,71,0.28)' }}>
                  <div style={{ fontSize: '10px', color: '#fef3c7' }}>Job Score</div>
                  <div style={{ fontSize: '24px', fontWeight: 900, color: '#fff7ed', marginTop: '6px' }}>{details.career.jobScore}</div>
                </div>
                <div style={{ background: 'linear-gradient(180deg, rgba(240,253,244,0.2), rgba(34,197,94,0.08))', borderRadius: '12px', padding: '12px', border: '1px solid rgba(74,222,128,0.3)' }}>
                  <div style={{ fontSize: '10px', color: '#dcfce7' }}>Business Score</div>
                  <div style={{ fontSize: '24px', fontWeight: 900, color: '#fff7ed', marginTop: '6px' }}>{details.career.businessScore}</div>
                </div>
              </div>

              <div style={{ background: 'linear-gradient(180deg, rgba(15,23,42,0.25), rgba(15,23,42,0.1))', border:'1px solid rgba(255,255,255,0.18)', borderRadius:'14px', padding:'12px' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#fef3c7' }}>Recommended Path</div>
                <div style={{ marginTop: '8px', fontSize: '24px', fontWeight: 900, color: '#fff7ed' }}>{details.career.path}</div>
                <p style={{ fontSize: '12px', color: '#e2e8f0', margin: '8px 0 0', lineHeight: '1.6' }}>{details.career.note}</p>
              </div>

              <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {details.career.keywords.map((word) => (
                  <span key={word} style={{ background: 'rgba(148,163,184,0.18)', borderRadius: '999px', padding: '6px 10px', fontSize: '11px', color: '#f8fafc', fontWeight: 800, border: '1px solid rgba(255,255,255,0.12)' }}>
                    {word}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
