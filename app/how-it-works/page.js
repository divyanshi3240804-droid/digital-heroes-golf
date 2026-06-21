'use client'
import { useResponsive } from '../../lib/useResponsive'

export default function HowItWorks() {
  const { getResponsive } = useResponsive()
  
  return (
    <main style={{minHeight: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: 'sans-serif'}}>
      
      {/* NAVBAR */}
      <nav style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: getResponsive('12px 16px', '14px 20px', '16px 24px', '18px 32px', '24px 48px', '24px 48px'), borderBottom: '1px solid #1f2937', gap: getResponsive('8px', '10px', '12px', '16px', '24px', '24px'), flexWrap: 'wrap'}}>
        <a href="/" style={{fontSize: getResponsive('1.2rem', '1.3rem', '1.4rem', '1.5rem', '1.5rem', '1.5rem'), fontWeight: 'bold', color: '#4ade80', textDecoration: 'none'}}>GolfHeroes ⛳</a>
        <div style={{display: 'flex', gap: getResponsive('8px', '10px', '12px', '16px', '24px', '24px')}}>
          <a href="/login" style={{backgroundColor: '#4ade80', color: '#000', padding: getResponsive('8px 12px', '9px 14px', '10px 16px', '10px 18px', '10px 20px', '10px 20px'), borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none', fontSize: getResponsive('0.75rem', '0.8rem', '0.85rem', '0.9rem', '1rem', '1rem')}}>Login</a>
          <a href="/signup" style={{backgroundColor: '#fff', color: '#000', padding: getResponsive('8px 12px', '9px 14px', '10px 16px', '10px 18px', '10px 20px', '10px 20px'), borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none', fontSize: getResponsive('0.75rem', '0.8rem', '0.85rem', '0.9rem', '1rem', '1rem')}}>Sign Up</a>
        </div>
      </nav>

      <div style={{maxWidth: '900px', margin: '0 auto', padding: getResponsive('30px 12px', '40px 14px', '48px 18px', '56px 24px', '60px 24px', '60px 24px')}}>
        
        <div style={{textAlign: 'center', marginBottom: getResponsive('40px', '48px', '56px', '64px', '60px', '60px')}}>
          <h1 style={{fontSize: getResponsive('1.8rem', '2rem', '2.2rem', '2.4rem', '3rem', '3rem'), fontWeight: 'bold', marginBottom: getResponsive('10px', '12px', '14px', '16px', '16px', '16px')}}>
            How it <span style={{color: '#4ade80'}}>works</span>
          </h1>
          <p style={{color: '#9ca3af', fontSize: getResponsive('0.9rem', '0.95rem', '1rem', '1.05rem', '1.1rem', '1.1rem')}}>
            Everything you need to know about GolfHeroes
          </p>
        </div>

        {/* STEPS */}
        <div style={{marginBottom: getResponsive('50px', '56px', '62px', '70px', '80px', '80px')}}>
          
          <div style={{display: 'flex', gap: getResponsive('16px', '18px', '20px', '24px', '32px', '32px'), alignItems: 'flex-start', marginBottom: getResponsive('30px', '36px', '40px', '44px', '48px', '48px'), flexWrap: 'wrap'}}>
            <div style={{backgroundColor: '#4ade80', color: '#000', width: getResponsive('45px', '50px', '55px', '60px', '60px', '60px'), height: getResponsive('45px', '50px', '55px', '60px', '60px', '60px'), borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: getResponsive('1.2rem', '1.3rem', '1.4rem', '1.5rem', '1.5rem', '1.5rem'), flexShrink: 0}}>1</div>
            <div>
              <h3 style={{fontSize: getResponsive('1.1rem', '1.2rem', '1.3rem', '1.4rem', '1.4rem', '1.4rem'), fontWeight: 'bold', marginBottom: getResponsive('8px', '10px', '12px', '12px', '12px', '12px')}}>Subscribe to GolfHeroes</h3>
              <p style={{color: '#9ca3af', lineHeight: '1.8', fontSize: getResponsive('0.85rem', '0.9rem', '0.95rem', '1rem', '1rem', '1rem')}}>Choose a monthly or yearly plan. Your subscription unlocks access to score tracking, monthly draws, and charity contributions. Cancel anytime.</p>
            </div>
          </div>

          <div style={{display: 'flex', gap: getResponsive('16px', '18px', '20px', '24px', '32px', '32px'), alignItems: 'flex-start', marginBottom: getResponsive('30px', '36px', '40px', '44px', '48px', '48px'), flexWrap: 'wrap'}}>
            <div style={{backgroundColor: '#4ade80', color: '#000', width: getResponsive('45px', '50px', '55px', '60px', '60px', '60px'), height: getResponsive('45px', '50px', '55px', '60px', '60px', '60px'), borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: getResponsive('1.2rem', '1.3rem', '1.4rem', '1.5rem', '1.5rem', '1.5rem'), flexShrink: 0}}>2</div>
            <div>
              <h3 style={{fontSize: getResponsive('1.1rem', '1.2rem', '1.3rem', '1.4rem', '1.4rem', '1.4rem'), fontWeight: 'bold', marginBottom: getResponsive('8px', '10px', '12px', '12px', '12px', '12px')}}>Choose Your Charity</h3>
              <p style={{color: '#9ca3af', lineHeight: '1.8', fontSize: getResponsive('0.85rem', '0.9rem', '0.95rem', '1rem', '1rem', '1rem')}}>Select a charity you care about from our directory. A minimum of 10% of your subscription goes directly to your chosen charity. You can increase this percentage anytime.</p>
            </div>
          </div>

          <div style={{display: 'flex', gap: getResponsive('16px', '18px', '20px', '24px', '32px', '32px'), alignItems: 'flex-start', marginBottom: getResponsive('30px', '36px', '40px', '44px', '48px', '48px'), flexWrap: 'wrap'}}>
            <div style={{backgroundColor: '#4ade80', color: '#000', width: getResponsive('45px', '50px', '55px', '60px', '60px', '60px'), height: getResponsive('45px', '50px', '55px', '60px', '60px', '60px'), borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: getResponsive('1.2rem', '1.3rem', '1.4rem', '1.5rem', '1.5rem', '1.5rem'), flexShrink: 0}}>3</div>
            <div>
              <h3 style={{fontSize: getResponsive('1.1rem', '1.2rem', '1.3rem', '1.4rem', '1.4rem', '1.4rem'), fontWeight: 'bold', marginBottom: getResponsive('8px', '10px', '12px', '12px', '12px', '12px')}}>Enter Your Golf Scores</h3>
              <p style={{color: '#9ca3af', lineHeight: '1.8', fontSize: getResponsive('0.85rem', '0.9rem', '0.95rem', '1rem', '1rem', '1rem')}}>Submit your last 5 golf scores in Stableford format (1-45). Only one score per date is allowed. Your 5 most recent scores are used for monthly draws.</p>
            </div>
          </div>

          <div style={{display: 'flex', gap: getResponsive('16px', '18px', '20px', '24px', '32px', '32px'), alignItems: 'flex-start', marginBottom: getResponsive('30px', '36px', '40px', '44px', '48px', '48px'), flexWrap: 'wrap'}}>
            <div style={{backgroundColor: '#4ade80', color: '#000', width: getResponsive('45px', '50px', '55px', '60px', '60px', '60px'), height: getResponsive('45px', '50px', '55px', '60px', '60px', '60px'), borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: getResponsive('1.2rem', '1.3rem', '1.4rem', '1.5rem', '1.5rem', '1.5rem'), flexShrink: 0}}>4</div>
            <div>
              <h3 style={{fontSize: getResponsive('1.1rem', '1.2rem', '1.3rem', '1.4rem', '1.4rem', '1.4rem'), fontWeight: 'bold', marginBottom: getResponsive('8px', '10px', '12px', '12px', '12px', '12px')}}>Monthly Draw</h3>
              <p style={{color: '#9ca3af', lineHeight: '1.8', fontSize: getResponsive('0.85rem', '0.9rem', '0.95rem', '1rem', '1rem', '1rem')}}>Every month, 5 winning numbers are drawn. Match 3, 4, or all 5 numbers to win prizes from the prize pool. Jackpot rolls over if no one matches all 5!</p>
            </div>
          </div>

          <div style={{display: 'flex', gap: getResponsive('16px', '18px', '20px', '24px', '32px', '32px'), alignItems: 'flex-start', flexWrap: 'wrap'}}>
            <div style={{backgroundColor: '#4ade80', color: '#000', width: getResponsive('45px', '50px', '55px', '60px', '60px', '60px'), height: getResponsive('45px', '50px', '55px', '60px', '60px', '60px'), borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: getResponsive('1.2rem', '1.3rem', '1.4rem', '1.5rem', '1.5rem', '1.5rem'), flexShrink: 0}}>5</div>
            <div>
              <h3 style={{fontSize: getResponsive('1.1rem', '1.2rem', '1.3rem', '1.4rem', '1.4rem', '1.4rem'), fontWeight: 'bold', marginBottom: getResponsive('8px', '10px', '12px', '12px', '12px', '12px')}}>Win and Get Paid</h3>
              <p style={{color: '#9ca3af', lineHeight: '1.8', fontSize: getResponsive('0.85rem', '0.9rem', '0.95rem', '1rem', '1rem', '1rem')}}>Winners are notified directly. Upload proof of your scores from your golf platform and our admin team verifies and processes your payment!</p>
            </div>
          </div>
        </div>

        {/* PRIZE POOL */}
        <div style={{backgroundColor: '#111', padding: getResponsive('20px', '24px', '28px', '32px', '40px', '40px'), borderRadius: '20px', border: '1px solid #1f2937', marginBottom: getResponsive('40px', '48px', '56px', '60px', '60px', '60px')}}>
          <h2 style={{fontSize: getResponsive('1.3rem', '1.5rem', '1.6rem', '1.7rem', '1.8rem', '1.8rem'), fontWeight: 'bold', marginBottom: getResponsive('20px', '24px', '28px', '30px', '32px', '32px'), textAlign: 'center'}}>
            Prize Pool <span style={{color: '#4ade80'}}>Distribution</span>
          </h2>
          <div style={{display: 'grid', gridTemplateColumns: getResponsive('1fr', '1fr', '1fr', 'repeat(3, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)'), gap: getResponsive('12px', '14px', '16px', '18px', '24px', '24px')}}>
            <div style={{textAlign: 'center', padding: getResponsive('16px', '18px', '20px', '24px', '24px', '24px'), backgroundColor: '#000', borderRadius: '12px'}}>
              <div style={{fontSize: getResponsive('1.5rem', '1.6rem', '1.8rem', '1.9rem', '2rem', '2rem'), marginBottom: getResponsive('6px', '8px', '8px', '8px', '8px', '8px')}}>🏆</div>
              <h3 style={{fontWeight: 'bold', marginBottom: getResponsive('6px', '8px', '8px', '8px', '8px', '8px'), fontSize: getResponsive('0.9rem', '0.95rem', '1rem', '1rem', '1rem', '1rem')}}>5 Number Match</h3>
              <div style={{fontSize: getResponsive('1.4rem', '1.6rem', '1.8rem', '2rem', '2rem', '2rem'), fontWeight: 'bold', color: '#4ade80'}}>40%</div>
              <p style={{color: '#9ca3af', fontSize: getResponsive('0.7rem', '0.75rem', '0.8rem', '0.85rem', '0.85rem', '0.85rem'), marginTop: getResponsive('6px', '8px', '8px', '8px', '8px', '8px')}}>Jackpot — rolls over if unclaimed!</p>
            </div>
            <div style={{textAlign: 'center', padding: getResponsive('16px', '18px', '20px', '24px', '24px', '24px'), backgroundColor: '#000', borderRadius: '12px'}}>
              <div style={{fontSize: getResponsive('1.5rem', '1.6rem', '1.8rem', '1.9rem', '2rem', '2rem'), marginBottom: getResponsive('6px', '8px', '8px', '8px', '8px', '8px')}}>🥈</div>
              <h3 style={{fontWeight: 'bold', marginBottom: getResponsive('6px', '8px', '8px', '8px', '8px', '8px'), fontSize: getResponsive('0.9rem', '0.95rem', '1rem', '1rem', '1rem', '1rem')}}>4 Number Match</h3>
              <div style={{fontSize: getResponsive('1.4rem', '1.6rem', '1.8rem', '2rem', '2rem', '2rem'), fontWeight: 'bold', color: '#4ade80'}}>35%</div>
              <p style={{color: '#9ca3af', fontSize: getResponsive('0.7rem', '0.75rem', '0.8rem', '0.85rem', '0.85rem', '0.85rem'), marginTop: getResponsive('6px', '8px', '8px', '8px', '8px', '8px')}}>Split among all 4-match winners</p>
            </div>
            <div style={{textAlign: 'center', padding: getResponsive('16px', '18px', '20px', '24px', '24px', '24px'), backgroundColor: '#000', borderRadius: '12px'}}>
              <div style={{fontSize: getResponsive('1.5rem', '1.6rem', '1.8rem', '1.9rem', '2rem', '2rem'), marginBottom: getResponsive('6px', '8px', '8px', '8px', '8px', '8px')}}>🥉</div>
              <h3 style={{fontWeight: 'bold', marginBottom: getResponsive('6px', '8px', '8px', '8px', '8px', '8px'), fontSize: getResponsive('0.9rem', '0.95rem', '1rem', '1rem', '1rem', '1rem')}}>3 Number Match</h3>
              <div style={{fontSize: getResponsive('1.4rem', '1.6rem', '1.8rem', '2rem', '2rem', '2rem'), fontWeight: 'bold', color: '#4ade80'}}>25%</div>
              <p style={{color: '#9ca3af', fontSize: getResponsive('0.7rem', '0.75rem', '0.8rem', '0.85rem', '0.85rem', '0.85rem'), marginTop: getResponsive('6px', '8px', '8px', '8px', '8px', '8px')}}>Split among all 3-match winners</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{textAlign: 'center'}}>
          <h2 style={{fontSize: getResponsive('1.4rem', '1.6rem', '1.8rem', '1.9rem', '2rem', '2rem'), fontWeight: 'bold', marginBottom: getResponsive('10px', '12px', '14px', '16px', '16px', '16px')}}>Ready to start? 🚀</h2>
          <p style={{color: '#9ca3af', marginBottom: getResponsive('16px', '18px', '20px', '24px', '32px', '32px'), fontSize: getResponsive('0.9rem', '0.95rem', '1rem', '1.05rem', '1rem', '1rem')}}>Join thousands of golfers making a difference!</p>
          <a href="/signup" style={{backgroundColor: '#4ade80', color: '#000', padding: getResponsive('12px 28px', '13px 34px', '14px 40px', '15px 44px', '16px 48px', '16px 48px'), borderRadius: '12px', fontWeight: 'bold', fontSize: getResponsive('0.9rem', '0.95rem', '1rem', '1.05rem', '1.1rem', '1.1rem'), textDecoration: 'none', display: 'inline-block'}}>
            Get Started Today →
          </a>
        </div>

      </div>

      {/* FOOTER */}
      <footer style={{padding: getResponsive('20px', '24px', '28px', '32px', '40px', '40px'), borderTop: '1px solid #1f2937', textAlign: 'center', color: '#9ca3af', marginTop: getResponsive('40px', '48px', '56px', '60px', '60px', '60px')}}>
        <div style={{fontSize: getResponsive('1.2rem', '1.3rem', '1.4rem', '1.5rem', '1.5rem', '1.5rem'), fontWeight: 'bold', color: '#4ade80', marginBottom: getResponsive('10px', '12px', '14px', '16px', '16px', '16px')}}>GolfHeroes ⛳</div>
        <p style={{fontSize: getResponsive('0.85rem', '0.9rem', '0.95rem', '1rem', '1rem', '1rem')}}>© 2026 GolfHeroes. Built for Digital Heroes.</p>
      </footer>

    </main>
  )
}