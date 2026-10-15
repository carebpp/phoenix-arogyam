import React, { useState, useEffect } from "react";
import JyotishDashboard from "./components/JyotishDashboard";

function SecureLogin() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("mobile");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [savedMobiles, setSavedMobiles] = useState([]);

  useEffect(() => {
    try {
      const list = JSON.parse(localStorage.getItem('phoenix_mobiles') || '[]');
      setSavedMobiles(list);
    } catch {}
  }, []);

  const sendOtp = async (e) => {
    e.preventDefault();
    const cleanMobile = mobile.replace(/\D/g, "");
    if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      setError("10 ank ka valid number daliye");
      return;
    }
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: cleanMobile })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "OTP send fail");
      sessionStorage.setItem("phoenix_otp_mobile", cleanMobile);
      setStep("otp");
      setMessage("OTP " + cleanMobile + " par WhatsApp par bheja gaya");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    const savedMobile = sessionStorage.getItem("phoenix_otp_mobile");
    if (!savedMobile) {
      setStep("mobile");
      setError("Session expire");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: savedMobile, otp: otp })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Verify fail");

      let list = [];
      try { list = JSON.parse(localStorage.getItem('phoenix_mobiles') || '[]'); } catch { list = []; }
      if (!list.includes(savedMobile)) {
        list.push(savedMobile);
        localStorage.setItem('phoenix_mobiles', JSON.stringify(list));
      }
      localStorage.setItem('phoenix_current_mobile', savedMobile);
      sessionStorage.removeItem("phoenix_otp_mobile");
      
      try { await fetch("/api/notify-admin", { method: "POST", credentials: "include" }); } catch {}

      window.location.replace("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px', background:'radial-gradient(circle at top left,#283593,transparent 40%), radial-gradient(circle at bottom right,#00897b,transparent 40%), #080b17'}}>
      <div style={{width:'100%', maxWidth:'430px', padding:'30px', border:'1px solid rgba(255,255,255,0.13)', borderRadius:'26px', background:'rgba(15,18,35,0.88)', color:'white'}}>
        <div style={{textAlign:'center', marginBottom:'25px'}}>
          <div style={{width:'64px', height:'64px', margin:'0 auto 15px', display:'grid', placeItems:'center', borderRadius:'20px', background:'linear-gradient(135deg,#00c6a7,#536dfe)', fontSize:'28px'}}>✦</div>
          <h1 style={{margin:0, letterSpacing:'4px'}}>PHOENIX</h1>
          <h2 style={{margin:'4px 0', letterSpacing:'7px', color:'#6ee7d8', fontSize:'17px'}}>AROGYAM</h2>
          <p style={{color:'#aeb5ca', fontSize:'13px'}}>Multi Mobile OTP Login</p>
        </div>

        {savedMobiles.length > 0 && step === 'mobile' && (
          <div style={{marginBottom:'15px', background:'rgba(255,255,255,0.05)', padding:'12px', borderRadius:'12px'}}>
            <p style={{fontSize:'11px', color:'#aeb5ca', margin:'0 0 8px'}}>Pichle numbers:</p>
            <div style={{display:'flex', gap:'6px', flexWrap:'wrap'}}>
              {savedMobiles.map((m) => (
                <button key={m} onClick={() => setMobile(m)} style={{background:'#20263c', color:'#cbd2e6', border:'1px solid #363c57', padding:'6px 10px', borderRadius:'20px', fontSize:'12px', height:'auto'}}>+91 {m}</button>
              ))}
            </div>
          </div>
        )}

        {step === 'mobile' ? (
          <form onSubmit={sendOtp} style={{display:'flex', flexDirection:'column', gap:'12px'}}>
            <label style={{fontSize:'13px', fontWeight:'600'}}>Mobile Number</label>
            <div style={{display:'flex', height:'56px', border:'1px solid #363c57', borderRadius:'14px', background:'#101426', overflow:'hidden'}}>
              <span style={{padding:'0 14px', display:'grid', placeItems:'center', color:'#8992ac', fontWeight:'600'}}>+91</span>
              <input type="tel" value={mobile} maxLength={10} onChange={(e) => setMobile(e.target.value.replace(/\D/g,'').slice(0,10))} style={{flex:1, border:'0', background:'transparent', color:'white', outline:'none', fontSize:'17px'}} />
            </div>
            <button disabled={loading || mobile.length !== 10} style={{height:'54px', border:'0', borderRadius:'14px', background:'linear-gradient(135deg,#00a88f,#536dfe)', color:'white', fontWeight:'700'}}>{loading ? "Sending..." : "Send OTP"}</button>
          </form>
        ) : (
          <form onSubmit={verifyOtp} style={{display:'flex', flexDirection:'column', gap:'12px'}}>
            <label style={{fontSize:'13px', fontWeight:'600'}}>OTP</label>
            <input type="text" value={otp} maxLength={6} onChange={(e) => setOtp(e.target.value.replace(/\D/g,'').slice(0,6))} style={{height:'58px', border:'1px solid #363c57', borderRadius:'14px', background:'#101426', color:'white', textAlign:'center', fontSize:'22px', letterSpacing:'8px', outline:'none'}} />
            <button disabled={loading || otp.length < 4} style={{height:'54px', border:'0', borderRadius:'14px', background:'linear-gradient(135deg,#00a88f,#536dfe)', color:'white', fontWeight:'700'}}>{loading ? "Verifying..." : "Verify OTP"}</button>
            <button type="button" onClick={() => { setStep('mobile'); setOtp(''); }} style={{height:'48px', border:'0', borderRadius:'14px', background:'#20263c', color:'#cbd2e6'}}>Change Number</button>
          </form>
        )}

        {message && <div style={{marginTop:'15px', padding:'12px', borderRadius:'12px', background:'rgba(0,200,150,0.1)', color:'#73e6ce', fontSize:'12px'}}>{message}</div>}
        {error && <div style={{marginTop:'15px', padding:'12px', borderRadius:'12px', background:'rgba(255,80,100,0.1)', color:'#ff9ba7', fontSize:'12px'}}>{error}</div>}
      </div>
    </main>
  );
}

function DashboardWrapper() {
  const [currentMobile, setCurrentMobile] = useState('');
  const [allMobiles, setAllMobiles] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setCurrentMobile(localStorage.getItem('phoenix_current_mobile') || '');
    try {
      setAllMobiles(JSON.parse(localStorage.getItem('phoenix_mobiles') || '[]'));
    } catch {}
  }, []);

  const logoutOne = async (m) => {
    try { await fetch("/api/logout", { method: "POST", credentials: "include" }); } catch {}
    let list = [];
    try { list = JSON.parse(localStorage.getItem('phoenix_mobiles') || '[]'); } catch {}
    list = list.filter((x) => x !== m);
    localStorage.setItem('phoenix_mobiles', JSON.stringify(list));
    if (localStorage.getItem('phoenix_current_mobile') === m) {
      localStorage.removeItem('phoenix_current_mobile');
      window.location.replace("/");
      return;
    }
    setAllMobiles(list);
    setShowMenu(false);
  };

  const logoutAll = async () => {
    try { await fetch("/api/logout", { method: "POST", credentials: "include" }); } catch {}
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace("/");
  };

  const switchMobile = (m) => {
    localStorage.setItem('phoenix_current_mobile', m);
    setCurrentMobile(m);
    setShowMenu(false);
  };

  return (
    <div>
      <div style={{background:'white', padding:'10px 15px', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, zIndex:100, boxShadow:'0 2px 10px rgba(0,0,0,0.1)'}}>
        <div>
          <b style={{color:'#0f766e'}}>Phoenix Arogyam</b>
          <div style={{fontSize:'10px', color:'#64748b'}}>Current: +91 {currentMobile}</div>
        </div>
        <div style={{display:'flex', gap:'8px', alignItems:'center'}}>
          <div style={{position:'relative'}}>
            <button onClick={() => setShowMenu(!showMenu)} style={{background:'#f0fdfa', border:'1px solid #99f6e0', padding:'6px 10px', borderRadius:'20px', fontSize:'11px'}}>
              📱 {allMobiles.length} Mobiles
            </button>
            {showMenu && (
              <div style={{position:'absolute', right:0, top:'35px', background:'white', border:'1px solid #e2e8f0', borderRadius:'12px', padding:'10px', minWidth:'210px', boxShadow:'0 10px 30px rgba(0,0,0,0.15)'}}>
                {allMobiles.map((m) => (
                  <div key={m} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'6px 0', borderBottom:'1px solid #f1f5f9'}}>
                    <button onClick={() => switchMobile(m)} style={{background:m===currentMobile?'#0f766e':'#f1f5f9', color:m===currentMobile?'white':'#334155', border:'none', padding:'4px 8px', borderRadius:'6px', fontSize:'11px'}}>+91 {m}</button>
                    <button onClick={() => logoutOne(m)} style={{background:'#fee2e2', color:'#dc2626', border:'none', padding:'4px 8px', borderRadius:'6px', fontSize:'10px'}}>Logout</button>
                  </div>
                ))}
                <button onClick={() => { window.location.replace("/"); }} style={{width:'100%', marginTop:'8px', background:'#ecfeff', border:'1px dashed #0e7490', padding:'6px', borderRadius:'8px', fontSize:'11px'}}>+ Add New Mobile</button>
              </div>
            )}
          </div>
          <button onClick={logoutAll} style={{background:'#ef4444', color:'white', border:'none', padding:'8px 16px', borderRadius:'8px', fontWeight:'700', fontSize:'12px'}}>LOGOUT</button>
        </div>
      </div>
      <JyotishDashboard />
    </div>
  );
}

export default function App() {
  const isDashboard = window.location.pathname === "/dashboard";
  return isDashboard ? <DashboardWrapper /> : <SecureLogin />;
}
