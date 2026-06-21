export default function HowItWorks() {
  return (
    <main style={{minHeight: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: 'sans-serif'}}>
      
      {/* NAVBAR */}
      <nav style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 48px', borderBottom: '1px solid #1f2937'}}>
        <a href="/" style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#4ade80', textDecoration: 'none'}}>GolfHeroes ⛳</a>
        <div style={{display: 'flex', gap: '24px'}}>
          <a href="/login" style={{backgroundColor: '#4ade80', color: '#000', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none'}}>Login</a>
          <a href="/signup" style={{backgroundColor: '#fff', color: '#000', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none'}}>Sign Up</a>
        </div>
      </nav>

      <div style={{maxWidth: '900px', margin: '0 auto', padding: '60px 24px'}}>
        
        <div style={{textAlign: 'center', marginBottom: '60px'}}>
          <h1 style={{fontSize: '3rem', fontWeight: 'bold', marginBottom: '16px'}}>
            How it <span style={{color: '#4ade80'}}>works</span>
          </h1>
          <p style={{color: '#9ca3af', fontSize: '1.1rem'}}>
            Everything you need to know about GolfHeroes
          </p>
        </div>

        {/* STEPS */}
        <div style={{marginBottom: '80px'}}>
          
          <div style={{display: 'flex', gap: '32px', alignItems: 'flex-start', marginBottom: '48px'}}>
            <div style={{backgroundColor: '#4ade80', color: '#000', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.5rem', flexShrink: 0}}>1</div>
            <div>
              <h3 style={{fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '12px'}}>Subscribe to GolfHeroes</h3>
              <p style={{color: '#9ca3af', lineHeight: '1.8'}}>Choose a monthly or yearly plan. Your subscription unlocks access to score tracking, monthly draws, and charity contributions. Cancel anytime.</p>
            </div>
          </div>

          <div style={{display: 'flex', gap: '32px', alignItems: 'flex-start', marginBottom: '48px'}}>
            <div style={{backgroundColor: '#4ade80', color: '#000', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.5rem', flexShrink: 0}}>2</div>
            <div>
              <h3 style={{fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '12px'}}>Choose Your Charity</h3>
              <p style={{color: '#9ca3af', lineHeight: '1.8'}}>Select a charity you care about from our directory. A minimum of 10% of your subscription goes directly to your chosen charity. You can increase this percentage anytime.</p>
            </div>
          </div>

          <div style={{display: 'flex', gap: '32px', alignItems: 'flex-start', marginBottom: '48px'}}>
            <div style={{backgroundColor: '#4ade80', color: '#000', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.5rem', flexShrink: 0}}>3</div>
            <div>
              <h3 style={{fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '12px'}}>Enter Your Golf Scores</h3>
              <p style={{color: '#9ca3af', lineHeight: '1.8'}}>Submit your last 5 golf scores in Stableford format (1-45). Only one score per date is allowed. Your 5 most recent scores are used for monthly draws.</p>
            </div>
          </div>

          <div style={{display: 'flex', gap: '32px', alignItems: 'flex-start', marginBottom: '48px'}}>
            <div style={{backgroundColor: '#4ade80', color: '#000', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.5rem', flexShrink: 0}}>4</div>
            <div>
              <h3 style={{fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '12px'}}>Monthly Draw</h3>
              <p style={{color: '#9ca3af', lineHeight: '1.8'}}>Every month, 5 winning numbers are drawn. Match 3, 4, or all 5 numbers to win prizes from the prize pool. Jackpot rolls over if no one matches all 5!</p>
            </div>
          </div>

          <div style={{display: 'flex', gap: '32px', alignItems: 'flex-start'}}>
            <div style={{backgroundColor: '#4ade80', color: '#000', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.5rem', flexShrink: 0}}>5</div>
            <div>
              <h3 style={{fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '12px'}}>Win and Get Paid</h3>
              <p style={{color: '#9ca3af', lineHeight: '1.8'}}>Winners are notified directly. Upload proof of your scores from your golf platform and our admin team verifies and processes your payment!</p>
            </div>
          </div>
        </div>

        {/* PRIZE POOL */}
        <div style={{backgroundColor: '#111', padding: '40px', borderRadius: '20px', border: '1px solid #1f2937', marginBottom: '60px'}}>
          <h2 style={{fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '32px', textAlign: 'center'}}>
            Prize Pool <span style={{color: '#4ade80'}}>Distribution</span>
          </h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px'}}>
            <div style={{textAlign: 'center', padding: '24px', backgroundColor: '#000', borderRadius: '12px'}}>
              <div style={{fontSize: '2rem', marginBottom: '8px'}}>🏆</div>
              <h3 style={{fontWeight: 'bold', marginBottom: '8px'}}>5 Number Match</h3>
              <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#4ade80'}}>40%</div>
              <p style={{color: '#9ca3af', fontSize: '0.85rem', marginTop: '8px'}}>Jackpot — rolls over if unclaimed!</p>
            </div>
            <div style={{textAlign: 'center', padding: '24px', backgroundColor: '#000', borderRadius: '12px'}}>
              <div style={{fontSize: '2rem', marginBottom: '8px'}}>🥈</div>
              <h3 style={{fontWeight: 'bold', marginBottom: '8px'}}>4 Number Match</h3>
              <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#4ade80'}}>35%</div>
              <p style={{color: '#9ca3af', fontSize: '0.85rem', marginTop: '8px'}}>Split among all 4-match winners</p>
            </div>
            <div style={{textAlign: 'center', padding: '24px', backgroundColor: '#000', borderRadius: '12px'}}>
              <div style={{fontSize: '2rem', marginBottom: '8px'}}>🥉</div>
              <h3 style={{fontWeight: 'bold', marginBottom: '8px'}}>3 Number Match</h3>
              <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#4ade80'}}>25%</div>
              <p style={{color: '#9ca3af', fontSize: '0.85rem', marginTop: '8px'}}>Split among all 3-match winners</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{textAlign: 'center'}}>
          <h2 style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '16px'}}>Ready to start? 🚀</h2>
          <p style={{color: '#9ca3af', marginBottom: '32px'}}>Join thousands of golfers making a difference!</p>
          <a href="/signup" style={{backgroundColor: '#4ade80', color: '#000', padding: '16px 48px', borderRadius: '12px', fontWeight: 'bold', fontSize: '1.1rem', textDecoration: 'none'}}>
            Get Started Today →
          </a>
        </div>

      </div>

      {/* FOOTER */}
      <footer style={{padding: '40px', borderTop: '1px solid #1f2937', textAlign: 'center', color: '#9ca3af', marginTop: '60px'}}>
        <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#4ade80', marginBottom: '16px'}}>GolfHeroes ⛳</div>
        <p>© 2026 GolfHeroes. Built for Digital Heroes.</p>
      </footer>

    </main>
  )
}