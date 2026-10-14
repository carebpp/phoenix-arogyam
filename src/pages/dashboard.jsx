export default function Dashboard() {
  return (
    <div style={{padding:'40px', textAlign:'center'}}>
      <h1>Phoenix Arogyam</h1>
      <p>Offline OK</p>
      <button onClick={()=>{localStorage.clear(); location.href='/login'}}>Logout</button>
    </div>
  );
}
