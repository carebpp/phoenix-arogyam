import './index.css'
import { useState, useEffect } from 'react'
import Dashboard from './pages/dashboard.jsx'
import Login from './pages/login.jsx'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('phoenix_token')
    if (token) setIsLoggedIn(true)
    setChecking(false)
  }, [])

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = async () => {
    try { await fetch("/api/logout", { method: "POST", credentials: "include" }) } catch {}
    localStorage.clear()
    sessionStorage.clear()
    setIsLoggedIn(false)
    window.location.replace("/")
  }

  if (checking) return <div style={{display:'flex',height:'100vh',alignItems:'center',justifyContent:'center'}}>Loading...</div>

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />
  }

  return <Dashboard onLogout={handleLogout} />
}

export default App
