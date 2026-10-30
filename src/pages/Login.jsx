import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [mobile, setMobile] = useState('9395000000')
  const [otp, setOtp] = useState('')

  const handleVerify = () => {
    const cleanOtp = otp.trim()
    if (!cleanOtp) return
    localStorage.setItem('phoenix-auth', 'true')
    localStorage.setItem('phoenix-mobile', mobile)
    navigate('/dashboard', { replace: true })
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f0efe9',
      fontFamily: 'Segoe UI, Arial, sans-serif',
      color: '#111827'
    }}>
      <div style={{
        background: '#2f2f2f',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 18px 0 12px',
        color: '#ffffff'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ color: '#d4d4d4', fontSize: '22px' }}>◀</div>
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#d9d5cf', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111827', fontWeight: 700, fontSize: '14px' }}>◍</div>
          <div style={{ fontSize: '22px', fontWeight: 600, letterSpacing: '-0.4px' }}>Phoenix Arogya</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <button style={{ border: 'none', background: 'transparent', color: '#f3f4f6', fontSize: '22px', cursor: 'pointer' }}>×</button>
          <button style={{ border: 'none', background: 'transparent', color: '#f3f4f6', fontSize: '28px', cursor: 'pointer' }}>＋</button>
        </div>
      </div>

      <div style={{
        background: '#f5f2ee',
        minHeight: 'calc(100vh - 64px)',
        padding: '24px 18px 40px'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{
            background: '#f0f0f0',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: '14px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#1f2937',
            fontSize: '16px',
            marginBottom: '18px'
          }}>
            <span style={{ fontSize: '19px' }}>🔒</span>
            <div style={{ fontWeight: 500 }}>https://phoenix-arogyam.vercel.app</div>
          </div>

          <div style={{ marginLeft: '6px' }}>
            <h1 style={{
              margin: 0,
              fontSize: '64px',
              lineHeight: 1,
              letterSpacing: '-2px',
              fontWeight: 800,
              color: '#0f172a'
            }}>Phoenix Arogyam</h1>

            <div style={{ marginTop: '26px', fontSize: '28px', color: '#000', fontWeight: 400 }}>Login to continue</div>

            <div style={{ marginTop: '28px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <input
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="Enter OTP"
                style={{
                  width: '420px',
                  maxWidth: '100%',
                  height: '54px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  background: '#f3f4f6',
                  padding: '0 14px',
                  fontSize: '22px',
                  outline: 'none'
                }}
              />
              <button
                type="button"
                onClick={() => {}}
                style={{
                  height: '54px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  background: '#f3f4f6',
                  padding: '0 20px',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#111827',
                  cursor: 'pointer'
                }}
              >
                Verify OTP
              </button>

              <button
                type="button"
                onClick={() => setMobile('')}
                style={{
                  height: '54px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  background: '#f3f4f6',
                  padding: '0 18px',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#111827',
                  cursor: 'pointer'
                }}
              >
                Change number
              </button>
            </div>

            <div style={{ marginTop: '20px', fontSize: '18px', color: '#111827' }}>
              OTP sent to {mobile || '9395000000'}
            </div>

            <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Enter OTP"
                style={{
                  width: '360px',
                  maxWidth: '100%',
                  height: '54px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  background: '#f3f4f6',
                  padding: '0 14px',
                  fontSize: '22px',
                  outline: 'none'
                }}
              />
              <button
                type="button"
                onClick={handleVerify}
                style={{
                  height: '54px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  background: '#f3f4f6',
                  padding: '0 20px',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#111827',
                  cursor: 'pointer'
                }}
              >
                Verify OTP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
