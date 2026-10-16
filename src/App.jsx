    import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Dashboard from './pages/dashboard.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
// JyotishDashboard abhi alag file nahi hai, isliye comment rakho
// import JyotishDashboard from './pages/JyotishDashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Dashboard onLogout={() => { localStorage.clear(); window.location.href='/login' }} />
            </ProtectedRoute>
          } 
        />
        {/* <Route path="/jyotish" element={<JyotishDashboard/>} /> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Appimport JyotishDashboard from './pages/JyotishDashboard'
    // <Route path="/jyotish" element={<JyotishDashboard/>} />
vimport { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
