import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Dashboard from './pages/dashboard.jsx'
import JyotishDashboard from './pages/JyotishDashboard.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/jyotish" element={<ProtectedRoute><JyotishDashboard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
