'use client'
import { useResponsive } from '../lib/useResponsive'
import { supabase } from '../lib/supabase'
import { useState, useEffect } from 'react'

export default function Home() {
  const { getResponsive } = useResponsive()
  const [featuredCharity, setFeaturedCharity] = useState(null)

useEffect(() => {
  getFeaturedCharity()
}, [])

const getFeaturedCharity = async () => {
  const { data } = await supabase
    .from('charities')
    .select('*')
    .limit(1)
    .single()

  if (data) setFeaturedCharity(data)
}

  return (
    <main style={{minHeight: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: 'sans-serif'}}>
      
      {/* NAVBAR */}
      <nav style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: getResponsive('12px 10px', '16px 16px', '20px 24px', '24px 32px', '24px 48px', '24px 48px'), borderBottom: '1px solid #1f2937', flexWrap: 'wrap', gap: getResponsive('8px', '12px', '16px', '20px', '24px', '24px')}}>
        <div style={{fontSize: getResponsive('1rem', '1.2rem', '1.3rem', '1.4rem', '1.5rem', '1.5rem'), fontWeight: 'bold', color: '#4ade80'}}>
          GolfHeroes ⛳
        </div>
        <div style={{display: 'flex', gap: getResponsive('8px', '12px', '16px', '18px', '24px', '24px'), alignItems: 'center', flexWrap: 'wrap'}}>
          <a href="/charities" style={{color: '#fff', textDecoration: 'none', fontSize: getResponsive('0.75rem', '0.85rem', '0.95rem', '1rem', '1rem', '1rem')}}>Charities</a>
          <a href="/how-it-works" style={{color: '#fff', textDecoration: 'none', fontSize: getResponsive('0.75rem', '0.85rem', '0.95rem', '1rem', '1rem', '1rem')}}>How It Works</a>
          <a href="/login" style={{backgroundColor: '#4ade80', color: '#000', padding: getResponsive('8px 12px', '9px 14px', '10px 16px', '10px 18px', '10px 20px', '10px 20px'), borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none', fontSize: getResponsive('0.75rem', '0.8rem', '0.85rem', '0.9rem', '1rem', '1rem')}}>Login</a>
          <a href="/signup" style={{backgroundColor: '#fff', color: '#000', padding: getResponsive('8px 12px', '9px 14px', '10px 16px', '10px 18px', '10px 20px', '10px 20px'), borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none', fontSize: getResponsive('0.75rem', '0.8rem', '0.85rem', '0.9rem', '1rem', '1rem')}}>Sign Up</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{textAlign: 'center', padding: getResponsive('40px 12px', '60px 20px', '80px 24px', '100px 32px', '100px 48px', '100px 48px')}}>
        <div style={{color: '#4ade80', fontSize: getResponsive('0.65rem', '0.75rem', '0.85rem', '0.85rem', '0.85rem', '0.85rem'), fontWeight: 'bold', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: getResponsive('8px', '12px', '14px', '16px', '16px', '16px')}}>
          Play Golf. Support Charity. Win Prizes.
        </div>
        <h1 style={{fontSize: getResponsive('1.8rem', '2.2rem', '2.8rem', '3.2rem', '4rem', '4rem'), fontWeight: 'bold', lineHeight: '1.2', marginBottom: getResponsive('12px', '16px', '18px', '20px', '24px', '24px')}}>
          Golf that gives back <br/>
          <span style={{color: '#4ade80'}}>to the world</span>
        </h1>
        <p style={{color: '#9ca3af', fontSize: getResponsive('0.85rem', '0.95rem', '1.05rem', '1.1rem', '1.2rem', '1.2rem'), maxWidth: '600px', margin: getResponsive('0 auto 24px', '0 auto 28px', '0 auto 32px', '0 auto 36px', '0 auto 40px', '0 auto 40px')}}>
          Enter your golf scores, support a charity you love, 
          and win monthly prizes — all in one place.
        </p>
        <div style={{display: 'flex', gap: getResponsive('8px', '10px', '12px', '14px', '16px', '16px'), justifyContent: 'center', flexWrap: 'wrap'}}>
          <a href="/signup" style={{backgroundColor: '#4ade80', color: '#000', padding: getResponsive('12px 20px', '14px 24px', '14px 28px', '16px 30px', '16px 32px', '16px 32px'), borderRadius: '12px', fontWeight: 'bold', fontSize: getResponsive('0.8rem', '0.9rem', '1rem', '1.05rem', '1.1rem', '1.1rem'), textDecoration: 'none'}}>
            Start Playing →
          </a>
          <a href="/how-it-works" style={{border: '2px solid #fff', color: '#fff', padding: getResponsive('12px 20px', '14px 24px', '14px 28px', '16px 30px', '16px 32px', '16px 32px'), borderRadius: '12px', fontWeight: 'bold', fontSize: getResponsive('0.8rem', '0.9rem', '1rem', '1.05rem', '1.1rem', '1.1rem'), textDecoration: 'none'}}>
            How It Works
          </a>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{padding: getResponsive('40px 12px', '60px 20px', '80px 24px', '80px 32px', '80px 48px', '80px 48px'), backgroundColor: '#111'}}>
        <h2 style={{textAlign: 'center', fontSize: getResponsive('1.6rem', '1.9rem', '2.2rem', '2.4rem', '2.5rem', '2.5rem'), fontWeight: 'bold', marginBottom: getResponsive('32px', '40px', '48px', '56px', '60px', '60px')}}>
          How it <span style={{color: '#4ade80'}}>works</span>
        </h2>
        <div style={{display: 'grid', gridTemplateColumns: getResponsive('1fr', '1fr', '1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)'), gap: getResponsive('12px', '14px', '16px', '20px', '32px', '32px'), maxWidth: '900px', margin: '0 auto'}}>
          <div style={{textAlign: 'center', padding: getResponsive('20px', '24px', '28px', '32px', '40px', '40px'), backgroundColor: '#000', borderRadius: '16px'}}>
            <div style={{fontSize: getResponsive('2rem', '2.4rem', '2.8rem', '3rem', '3rem', '3rem'), marginBottom: getResponsive('8px', '12px', '14px', '16px', '16px', '16px')}}>⛳</div>
            <h3 style={{fontSize: getResponsive('1rem', '1.1rem', '1.15rem', '1.2rem', '1.2rem', '1.2rem'), fontWeight: 'bold', marginBottom: getResponsive('6px', '8px', '10px', '12px', '12px', '12px')}}>Enter Your Scores</h3>
            <p style={{color: '#9ca3af', fontSize: getResponsive('0.75rem', '0.85rem', '0.9rem', '0.95rem', '1rem', '1rem')}}>Submit your last 5 golf scores in Stableford format to enter monthly draws</p>
          </div>
          <div style={{textAlign: 'center', padding: getResponsive('20px', '24px', '28px', '32px', '40px', '40px'), backgroundColor: '#000', borderRadius: '16px'}}>
            <div style={{fontSize: getResponsive('2rem', '2.4rem', '2.8rem', '3rem', '3rem', '3rem'), marginBottom: getResponsive('8px', '12px', '14px', '16px', '16px', '16px')}}>❤️</div>
            <h3 style={{fontSize: getResponsive('1rem', '1.1rem', '1.15rem', '1.2rem', '1.2rem', '1.2rem'), fontWeight: 'bold', marginBottom: getResponsive('6px', '8px', '10px', '12px', '12px', '12px')}}>Support Charity</h3>
            <p style={{color: '#9ca3af', fontSize: getResponsive('0.75rem', '0.85rem', '0.9rem', '0.95rem', '1rem', '1rem')}}>A portion of your subscription goes directly to a charity of your choice</p>
          </div>
          <div style={{textAlign: 'center', padding: getResponsive('20px', '24px', '28px', '32px', '40px', '40px'), backgroundColor: '#000', borderRadius: '16px'}}>
            <div style={{fontSize: getResponsive('2rem', '2.4rem', '2.8rem', '3rem', '3rem', '3rem'), marginBottom: getResponsive('8px', '12px', '14px', '16px', '16px', '16px')}}>🏆</div>
            <h3 style={{fontSize: getResponsive('1rem', '1.1rem', '1.15rem', '1.2rem', '1.2rem', '1.2rem'), fontWeight: 'bold', marginBottom: getResponsive('6px', '8px', '10px', '12px', '12px', '12px')}}>Win Monthly Prizes</h3>
            <p style={{color: '#9ca3af', fontSize: getResponsive('0.75rem', '0.85rem', '0.9rem', '0.95rem', '1rem', '1rem')}}>Match numbers in our monthly draw and win from the prize pool</p>
          </div>
        </div>
      </section>
      {featuredCharity && (
  <section style={{padding: getResponsive('40px 12px', '60px 20px', '80px 24px', '80px 32px', '80px 48px', '80px 48px'), backgroundColor:'#000'}}>
    <div style={{maxWidth:'800px', margin:'0 auto', backgroundColor:'#111', border:'1px solid #1f2937', borderRadius:'20px', padding:getResponsive('24px','32px','40px','48px','56px','56px'), textAlign:'center'}}>
      <p style={{color:'#4ade80', fontWeight:'bold', marginBottom:'10px'}}>FEATURED CHARITY</p>
      <div style={{fontSize:'3rem', marginBottom:'12px'}}>❤️</div>
      <h2 style={{fontSize:getResponsive('1.5rem','1.8rem','2rem','2.2rem','2.5rem','2.5rem'), fontWeight:'bold', marginBottom:'12px'}}>
        {featuredCharity.name}
      </h2>
      <p style={{color:'#9ca3af', marginBottom:'20px'}}>
        {featuredCharity.description}
      </p>
      <a href="/charities" style={{backgroundColor:'#4ade80', color:'#000', padding:'12px 20px', borderRadius:'10px', fontWeight:'bold', textDecoration:'none'}}>
        Explore Charities →
      </a>
    </div>
  </section>
)}

      {/* PLANS */}
      <section style={{padding: getResponsive('40px 12px', '60px 20px', '80px 24px', '80px 32px', '80px 48px', '80px 48px')}}>
        <h2 style={{textAlign: 'center', fontSize: getResponsive('1.6rem', '1.9rem', '2.2rem', '2.4rem', '2.5rem', '2.5rem'), fontWeight: 'bold', marginBottom: getResponsive('32px', '40px', '48px', '56px', '60px', '60px')}}>
          Choose your <span style={{color: '#4ade80'}}>plan</span>
        </h2>
        <div style={{display: 'grid', gridTemplateColumns: getResponsive('1fr', '1fr', '1fr', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)'), gap: getResponsive('12px', '14px', '16px', '18px', '32px', '32px'), maxWidth: '700px', margin: '0 auto'}}>
          <div style={{padding: getResponsive('20px', '24px', '28px', '32px', '40px', '40px'), backgroundColor: '#111', borderRadius: '16px', border: '1px solid #1f2937'}}>
            <h3 style={{fontSize: getResponsive('1.2rem', '1.3rem', '1.4rem', '1.5rem', '1.5rem', '1.5rem'), fontWeight: 'bold', marginBottom: getResponsive('4px', '6px', '8px', '8px', '8px', '8px')}}>Monthly</h3>
            <div style={{fontSize: getResponsive('1.8rem', '2rem', '2.2rem', '2.4rem', '2.5rem', '2.5rem'), fontWeight: 'bold', color: '#4ade80', marginBottom: getResponsive('12px', '16px', '18px', '20px', '24px', '24px')}}>£9.99<span style={{fontSize: getResponsive('0.75rem', '0.85rem', '0.9rem', '1rem', '1rem', '1rem'), color: '#9ca3af'}}>/mo</span></div>
            <ul style={{color: '#9ca3af', listStyle: 'none', padding: 0, marginBottom: getResponsive('16px', '20px', '24px', '28px', '32px', '32px'), lineHeight: '1.8', fontSize: getResponsive('0.75rem', '0.85rem', '0.9rem', '0.95rem', '1rem', '1rem')}}>
              <li>✅ Enter monthly draws</li>
              <li>✅ Support your charity</li>
              <li>✅ Score tracking</li>
              <li>✅ Cancel anytime</li>
            </ul>
            <a href="/signup" style={{display: 'block', textAlign: 'center', backgroundColor: '#4ade80', color: '#000', padding: getResponsive('10px', '11px', '12px', '13px', '14px', '14px'), borderRadius: '10px', fontWeight: 'bold', textDecoration: 'none', fontSize: getResponsive('0.8rem', '0.85rem', '0.9rem', '0.95rem', '1rem', '1rem')}}>
              Get Started
            </a>
          </div>
          <div style={{padding: getResponsive('20px', '24px', '28px', '32px', '40px', '40px'), backgroundColor: '#4ade80', borderRadius: '16px', color: '#000'}}>
            <h3 style={{fontSize: getResponsive('1.2rem', '1.3rem', '1.4rem', '1.5rem', '1.5rem', '1.5rem'), fontWeight: 'bold', marginBottom: getResponsive('4px', '6px', '8px', '8px', '8px', '8px')}}>Yearly</h3>
            <div style={{fontSize: getResponsive('1.8rem', '2rem', '2.2rem', '2.4rem', '2.5rem', '2.5rem'), fontWeight: 'bold', marginBottom: getResponsive('12px', '16px', '18px', '20px', '24px', '24px')}}>£99.99<span style={{fontSize: getResponsive('0.75rem', '0.85rem', '0.9rem', '1rem', '1rem', '1rem')}}>/yr</span></div>
            <ul style={{listStyle: 'none', padding: 0, marginBottom: getResponsive('16px', '20px', '24px', '28px', '32px', '32px'), lineHeight: '1.8', fontSize: getResponsive('0.75rem', '0.85rem', '0.9rem', '0.95rem', '1rem', '1rem')}}>
              <li>✅ Everything in Monthly</li>
              <li>✅ 2 months free</li>
              <li>✅ Priority support</li>
              <li>✅ Exclusive draws</li>
            </ul>
            <a href="/signup" style={{display: 'block', textAlign: 'center', backgroundColor: '#000', color: '#fff', padding: getResponsive('10px', '11px', '12px', '13px', '14px', '14px'), borderRadius: '10px', fontWeight: 'bold', textDecoration: 'none', fontSize: getResponsive('0.8rem', '0.85rem', '0.9rem', '0.95rem', '1rem', '1rem')}}>
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{padding: getResponsive('20px', '24px', '28px', '32px', '40px', '40px'), borderTop: '1px solid #1f2937', textAlign: 'center', color: '#9ca3af'}}>
        <div style={{fontSize: getResponsive('1.2rem', '1.3rem', '1.4rem', '1.5rem', '1.5rem', '1.5rem'), fontWeight: 'bold', color: '#4ade80', marginBottom: getResponsive('8px', '12px', '14px', '16px', '16px', '16px')}}>GolfHeroes ⛳</div>
        <p style={{fontSize: getResponsive('0.75rem', '0.8rem', '0.85rem', '0.9rem', '1rem', '1rem')}}>© 2026 GolfHeroes. Built for Digital Heroes.</p>
      </footer>

    </main>
  )
}