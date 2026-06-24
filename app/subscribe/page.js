'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useResponsive } from '../../lib/useResponsive'

export default function Subscribe() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { getResponsive } = useResponsive()

  useEffect(() => {
    getUser()
    // Check if cancelled
    const params = new URLSearchParams(window.location.search)
    if (params.get('cancelled')) {
      setMessage('Payment cancelled. You can try again anytime!')
    }
  }, [])

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      window.location.href = '/login'
    } else {
      setUser(user)
    }
  }

  const handleSubscribe = async (plan) => {
    setLoading(true)
    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan,
          userId: user.id,
          email: user.email
        })
      })
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setMessage('Something went wrong. Please try again!')
      }
    } catch (error) {
      setMessage(error.message)
    }
    setLoading(false)
  }

  return (
    <main style={{minHeight: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: 'sans-serif'}}>
      
      {/* NAVBAR */}
      <nav style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: getResponsive('12px 16px', '14px 20px', '16px 24px', '18px 32px', '24px 48px', '24px 48px'), borderBottom: '1px solid #1f2937', gap: getResponsive('8px', '10px', '12px', '16px', '16px', '16px'), flexWrap: 'wrap'}}>
        <a href="/" style={{fontSize: getResponsive('1.2rem', '1.3rem', '1.4rem', '1.5rem', '1.5rem', '1.5rem'), fontWeight: 'bold', color: '#4ade80', textDecoration: 'none'}}>GolfHeroes ⛳</a>
        <a href="/dashboard" style={{color: '#9ca3af', textDecoration: 'none', fontSize: getResponsive('0.8rem', '0.85rem', '0.9rem', '0.95rem', '1rem', '1rem')}}>← Back to Dashboard</a>
      </nav>

      <div style={{maxWidth: '800px', margin: '0 auto', padding: getResponsive('30px 12px', '40px 14px', '48px 18px', '56px 24px', '60px 24px', '60px 24px')}}>
        
        <div style={{textAlign: 'center', marginBottom: getResponsive('40px', '48px', '56px', '64px', '60px', '60px')}}>
          <h1 style={{fontSize: getResponsive('1.8rem', '2rem', '2.2rem', '2.4rem', '3rem', '3rem'), fontWeight: 'bold', marginBottom: getResponsive('10px', '12px', '14px', '16px', '16px', '16px')}}>
            Choose your <span style={{color: '#4ade80'}}>plan</span>
          </h1>
          <p style={{color: '#9ca3af', fontSize: getResponsive('0.9rem', '0.95rem', '1rem', '1.05rem', '1.1rem', '1.1rem')}}>
            Start playing, supporting charities and winning prizes today!
          </p>
        </div>

        {message && (
          <div style={{backgroundColor: '#1f2937', padding: getResponsive('12px', '14px', '16px', '16px', '16px', '16px'), borderRadius: '10px', marginBottom: getResponsive('20px', '24px', '28px', '32px', '32px', '32px'), textAlign: 'center', color: '#f59e0b', fontSize: getResponsive('0.85rem', '0.9rem', '0.95rem', '1rem', '1rem', '1rem')}}>
            {message}
          </div>
        )}

        <div style={{display: 'grid', gridTemplateColumns: getResponsive('1fr', '1fr', '1fr', '1fr', 'repeat(2, 1fr)', 'repeat(2, 1fr)'), gap: getResponsive('16px', '18px', '20px', '24px', '32px', '32px')}}>
          
          {/* MONTHLY */}
          <div style={{backgroundColor: '#4ade80', padding: getResponsive('20px', '24px', '28px', '32px', '40px', '40px'), borderRadius: '20px', border: '1px solid #1f2937'}}>
            <h3 style={{fontSize: getResponsive('1.1rem', '1.2rem', '1.3rem', '1.4rem', '1.5rem', '1.5rem'), fontWeight: 'bold', marginBottom: getResponsive('4px', '6px', '8px', '8px', '8px', '8px')}}>Monthly</h3>
            <div style={{fontSize: getResponsive('2rem', '2.2rem', '2.4rem', '2.6rem', '3rem', '3rem'), fontWeight: 'bold', color: '#000', marginBottom: getResponsive('4px', '6px', '8px', '8px', '8px', '8px')}}>
              £9.99
              <span style={{fontSize: getResponsive('0.75rem', '0.8rem', '0.85rem', '0.9rem', '1rem', '1rem'), color: '#9ca3af'}}>/mo</span>
            </div>
            <p style={{color: '#9ca3af', marginBottom: getResponsive('16px', '18px', '20px', '24px', '32px', '32px'), fontSize: getResponsive('0.85rem', '0.9rem', '0.95rem', '1rem', '1rem', '1rem')}}>Perfect for casual players</p>
            <ul style={{listStyle: 'none', padding: 0, marginBottom: getResponsive('16px', '18px', '20px', '24px', '32px', '32px'), lineHeight: getResponsive('1.8', '1.9', '2', '2.1', '2.2', '2.2'), color: '#9ca3af', fontSize: getResponsive('0.8rem', '0.85rem', '0.9rem', '0.95rem', '1rem', '1rem')}}>
              <li>✅ Enter monthly draws</li>
              <li>✅ Support your charity</li>
              <li>✅ Track your scores</li>
              <li>✅ Cancel anytime</li>
            </ul>
            <button
              onClick={() => handleSubscribe('monthly')}
              disabled={loading}
              style={{width: '100%', padding: getResponsive('10px', '11px', '12px', '13px', '16px', '16px'), backgroundColor: '#4ade80', color: '#000', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: getResponsive('0.85rem', '0.9rem', '0.95rem', '1rem', '1rem', '1rem'), cursor: 'pointer'}}
            >
              {loading ? 'Processing...' : 'Subscribe Monthly →'}
            </button>
          </div>

          {/* YEARLY */}
          <div style={{backgroundColor: '#4ade80', padding: getResponsive('20px', '24px', '28px', '32px', '40px', '40px'), borderRadius: '20px', color: '#000'}}>
            <div style={{backgroundColor: '#000', color: '#4ade80', display: 'inline-block', padding: getResponsive('2px 8px', '3px 10px', '4px 12px', '4px 12px', '4px 12px', '4px 12px'), borderRadius: '20px', fontSize: getResponsive('0.65rem', '0.7rem', '0.75rem', '0.75rem', '0.75rem', '0.75rem'), fontWeight: 'bold', marginBottom: getResponsive('10px', '12px', '14px', '16px', '16px', '16px')}}>
              BEST VALUE
            </div>
            <h3 style={{fontSize: getResponsive('1.1rem', '1.2rem', '1.3rem', '1.4rem', '1.5rem', '1.5rem'), fontWeight: 'bold', marginBottom: getResponsive('4px', '6px', '8px', '8px', '8px', '8px')}}>Yearly</h3>
            <div style={{fontSize: getResponsive('2rem', '2.2rem', '2.4rem', '2.6rem', '3rem', '3rem'), fontWeight: 'bold', marginBottom: getResponsive('4px', '6px', '8px', '8px', '8px', '8px')}}>
              £99.99
              <span style={{fontSize: getResponsive('0.75rem', '0.8rem', '0.85rem', '0.9rem', '1rem', '1rem')}}>/yr</span>
            </div>
            <p style={{marginBottom: getResponsive('16px', '18px', '20px', '24px', '32px', '32px'), opacity: 0.7, fontSize: getResponsive('0.85rem', '0.9rem', '0.95rem', '1rem', '1rem', '1rem')}}>Save 2 months — best value!</p>
            <ul style={{listStyle: 'none', padding: 0, marginBottom: getResponsive('16px', '18px', '20px', '24px', '32px', '32px'), lineHeight: getResponsive('1.8', '1.9', '2', '2.1', '2.2', '2.2'), fontSize: getResponsive('0.8rem', '0.85rem', '0.9rem', '0.95rem', '1rem', '1rem')}}>
              <li>✅ Everything in Monthly</li>
              <li>✅ 2 months free</li>
              <li>✅ Priority support</li>
              <li>✅ Exclusive yearly draws</li>
            </ul>
            <button
              onClick={() => handleSubscribe('yearly')}
              disabled={loading}
              style={{width: '100%', padding: getResponsive('10px', '11px', '12px', '13px', '16px', '16px'), backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: getResponsive('0.85rem', '0.9rem', '0.95rem', '1rem', '1rem', '1rem'), cursor: 'pointer'}}
            >
              {loading ? 'Processing...' : 'Subscribe Yearly →'}
            </button>
          </div>

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