import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// ProtectedRoute isi file me - import ka error khatam
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const phoenixUser = localStorage.getItem('phoenix_user');
  const isOffline = !navigator.onLine;

  if (isOffline && phoenixUser) {
    return children;
  }
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Aapke pages - naam check kar lena
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}
export default App;