    import JyotishDashboard from './pages/JyotishDashboard'
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
