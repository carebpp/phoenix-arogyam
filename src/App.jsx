import { HashRouter, Routes, Route } from 'react-router-dom'

function Login() {
  return <h1 style={{textAlign:'center', marginTop:'100px'}}>Login Page - Phoenix Arogyam</h1>
}
function Dashboard() {
  return <h1 style={{textAlign:'center', marginTop:'100px'}}>Dashboard - Live Hai!</h1>
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </HashRouter>
  )
}
import { HashRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute.jsx'
import Login from './pages/login.jsx'
import Dashboard from './pages/dashboard.jsx'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </HashRouter>
  )
}
