export default function Login(){
  return (
    <div className="container" style={{padding:"100px 0"}}>
      <h2>Login</h2>
      <input placeholder="Email" style={{display:"block",margin:"10px 0",padding:"10px"}} />
      <input placeholder="Password" type="password" style={{display:"block",margin:"10px 0",padding:"10px"}} />
      <button className="btn-primary">Login</button>
    </div>
  )
}