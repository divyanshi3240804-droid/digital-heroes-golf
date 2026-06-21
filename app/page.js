export default function Home() {
  return (
    <main style={{minHeight: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: 'sans-serif'}}>
      
      {/* NAVBAR */}
      <nav style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 48px', borderBottom: '1px solid #1f2937'}}>
        <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#4ade80'}}>
          GolfHeroes ⛳
        </div>
        <div style={{display: 'flex', gap: '24px', alignItems: 'center'}}>
          <a href="/charities" style={{color: '#fff', textDecoration: 'none'}}>Charities</a>
          <a href="/how-it-works" style={{color: '#fff', textDecoration: 'none'}}>How It Works</a>
          <a href="/login" style={{backgroundColor: '#4ade80', color: '#000', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none'}}>Login</a>
          <a href="/signup" style={{backgroundColor: '#fff', color: '#000', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none'}}>Sign Up</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{textAlign: 'center', padding: '100px 48px'}}>
        <div style={{color: '#4ade80', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px'}}>
          Play Golf. Support Charity. Win Prizes.
        </div>
        <h1 style={{fontSize: '4rem', fontWeight: 'bold', lineHeight: '1.2', marginBottom: '24px'}}>
          Golf that gives back <br/>
          <span style={{color: '#4ade80'}}>to the world</span>
        </h1>
        <p style={{color: '#9ca3af', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 40px'}}>
          Enter your golf scores, support a charity you love, 
          and win monthly prizes — all in one place.
        </p>
        <div className = "hero-buttons" style={{display: 'flex', gap: '16px', justifyContent: 'center'}}>
          <a href="/signup" style={{backgroundColor: '#4ade80', color: '#000', padding: '16px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '1.1rem', textDecoration: 'none'}}>
            Start Playing →
          </a>
          <a href="/how-it-works" style={{border: '2px solid #fff', color: '#fff', padding: '16px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '1.1rem', textDecoration: 'none'}}>
            How It Works
          </a>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{padding: '80px 48px', backgroundColor: '#111'}}>
        <h2 style={{textAlign: 'center', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '60px'}}>
          How it <span style={{color: '#4ade80'}}>works</span>
        </h2>
        <div className = "three-cols" style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', maxWidth: '900px', margin: '0 auto'}}>
          <div style={{textAlign: 'center', padding: '40px', backgroundColor: '#000', borderRadius: '16px'}}>
            <div style={{fontSize: '3rem', marginBottom: '16px'}}>⛳</div>
            <h3 style={{fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '12px'}}>Enter Your Scores</h3>
            <p style={{color: '#9ca3af'}}>Submit your last 5 golf scores in Stableford format to enter monthly draws</p>
          </div>
          <div style={{textAlign: 'center', padding: '40px', backgroundColor: '#000', borderRadius: '16px'}}>
            <div style={{fontSize: '3rem', marginBottom: '16px'}}>❤️</div>
            <h3 style={{fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '12px'}}>Support Charity</h3>
            <p style={{color: '#9ca3af'}}>A portion of your subscription goes directly to a charity of your choice</p>
          </div>
          <div style={{textAlign: 'center', padding: '40px', backgroundColor: '#000', borderRadius: '16px'}}>
            <div style={{fontSize: '3rem', marginBottom: '16px'}}>🏆</div>
            <h3 style={{fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '12px'}}>Win Monthly Prizes</h3>
            <p style={{color: '#9ca3af'}}>Match numbers in our monthly draw and win from the prize pool</p>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section style={{padding: '80px 48px'}}>
        <h2 style={{textAlign: 'center', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '60px'}}>
          Choose your <span style={{color: '#4ade80'}}>plan</span>
        </h2>
        <div  className = "two-cols" style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px', maxWidth: '700px', margin: '0 auto'}}>
          <div style={{padding: '40px', backgroundColor: '#111', borderRadius: '16px', border: '1px solid #1f2937'}}>
            <h3 style={{fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px'}}>Monthly</h3>
            <div style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#4ade80', marginBottom: '24px'}}>£9.99<span style={{fontSize: '1rem', color: '#9ca3af'}}>/mo</span></div>
            <ul style={{color: '#9ca3af', listStyle: 'none', padding: 0, marginBottom: '32px', lineHeight: '2'}}>
              <li>✅ Enter monthly draws</li>
              <li>✅ Support your charity</li>
              <li>✅ Score tracking</li>
              <li>✅ Cancel anytime</li>
            </ul>
            <a href="/signup" style={{display: 'block', textAlign: 'center', backgroundColor: '#4ade80', color: '#000', padding: '14px', borderRadius: '10px', fontWeight: 'bold', textDecoration: 'none'}}>
              Get Started
            </a>
          </div>
          <div style={{padding: '40px', backgroundColor: '#4ade80', borderRadius: '16px', color: '#000'}}>
            <h3 style={{fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px'}}>Yearly</h3>
            <div style={{fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '24px'}}>£99.99<span style={{fontSize: '1rem'}}>/yr</span></div>
            <ul style={{listStyle: 'none', padding: 0, marginBottom: '32px', lineHeight: '2'}}>
              <li>✅ Everything in Monthly</li>
              <li>✅ 2 months free</li>
              <li>✅ Priority support</li>
              <li>✅ Exclusive draws</li>
            </ul>
            <a href="/signup" style={{display: 'block', textAlign: 'center', backgroundColor: '#000', color: '#fff', padding: '14px', borderRadius: '10px', fontWeight: 'bold', textDecoration: 'none'}}>
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{padding: '40px', borderTop: '1px solid #1f2937', textAlign: 'center', color: '#9ca3af'}}>
        <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#4ade80', marginBottom: '16px'}}>GolfHeroes ⛳</div>
        <p>© 2026 GolfHeroes. Built for Digital Heroes.</p>
      </footer>

    </main>
  )
}