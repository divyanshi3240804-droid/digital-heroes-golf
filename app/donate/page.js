'use client'

export default function Donate() {
  return (
    <main style={{
      minHeight:'100vh',
      backgroundColor:'#000',
      color:'#fff',
      padding:'40px',
      textAlign:'center'
    }}>
      <h1 style={{fontSize:'3rem', color:'#4ade80'}}>
        ❤️ Support a Charity
      </h1>

      <p style={{
        color:'#9ca3af',
        maxWidth:'600px',
        margin:'20px auto'
      }}>
        Make an independent donation directly to support our charity partners.
      </p>

      <div style={{
        maxWidth:'500px',
        margin:'0 auto',
        backgroundColor:'#111',
        padding:'30px',
        borderRadius:'16px',
        border:'1px solid #1f2937'
      }}>
        <h2>Donate £10</h2>

        <button
          style={{
            backgroundColor:'#4ade80',
            color:'#000',
            border:'none',
            padding:'12px 24px',
            borderRadius:'10px',
            fontWeight:'bold',
            cursor:'pointer'
          }}
        >
          Donate Now
        </button>
      </div>
    </main>
  )
}