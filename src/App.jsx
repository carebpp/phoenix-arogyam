import './index.css'
import { useState, useEffect } from 'react'
import Dashboard from './pages/dashboard.jsx'
import Login from './pages/login.jsx'

function DashboardWithLogout() {
  const [currentMobile, setCurrentMobile] = useState('')
  const [allMobiles, setAllMobiles] = useState([])
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    setCurrentMobile(localStorage.getItem('phoenix_current_mobile') || '')
    try {
      const list = JSON.parse(localStorage.getItem('phoenix_mobiles') || '[]')
      setAllMobiles(list)
    } catch {}
  }, [])

  const logoutAll = async () => {
    try { await fetch("/api/logout", { method: "POST", credentials: "include" }) } catch {}
    localStorage.clear()
    sessionStorage.clear()
    window.location.replace("/")
  }

  return <Dashboard currentMobile={currentMobile} allMobiles={allMobiles} showMenu={showMenu} setShowMenu={setShowMenu} onLogoutAll={logoutAll} />
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('phoenix_token')
    if (token) setIsLoggedIn(true)
  }, [])

  return isLoggedIn ? <DashboardWithLogout /> : <Login />
}

export default App
