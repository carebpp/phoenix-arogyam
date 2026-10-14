import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  
  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/');
  };

  return (
    <div style={{padding: '40px', textAlign: 'center', marginTop: '50px'}}>
      <h2>Phoenix Arogyam Login</h2>
      <input placeholder='Phone' value={phone} onChange={e=>setPhone(e.target.value)} />
      <br/><br/>
      <button onClick={handleLogin} style={{padding: '10px 20px', background: '#0f766e', color: 'white', border: 'none', borderRadius: '5px'}}>
        Login
      </button>
    </div>
  );
}
