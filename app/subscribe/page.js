'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function Subscribe() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

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
      <nav style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 48px', borderBottom: '1px solid #1f2937'}}>
        <a href="/" style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#4ade80', textDecoration: 'none'}}>GolfHeroes ⛳</a>
        <a href="/dashboard" style={{color: '#9ca3af', textDecoration: 'none'}}>← Back to Dashboard</a>
      </nav>

      <div style={{maxWidth: '800px', margin: '0 auto', padding: '60px 24px'}}>
        
        <div style={{textAlign: 'center', marginBottom: '60px'}}>
          <h1 style={{fontSize: '3rem', fontWeight: 'bold', marginBottom: '16px'}}>
            Choose your <span style={{color: '#4ade80'}}>plan</span>
          </h1>
          <p style={{color: '#9ca3af', fontSize: '1.1rem'}}>
            Start playing, supporting charities and winning prizes today!
          </p>
        </div>

        {message && (
          <div style={{backgroundColor: '#1f2937', padding: '16px', borderRadius: '10px', marginBottom: '32px', textAlign: 'center', color: '#f59e0b'}}>
            {message}
          </div>
        )}

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px'}}>
          
          {/* MONTHLY */}
          <div style={{backgroundColor: '#111', padding: '40px', borderRadius: '20px', border: '1px solid #1f2937'}}>
            <h3 style={{fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px'}}>Monthly</h3>
            <div style={{fontSize: '3rem', fontWeight: 'bold', color: '#4ade80', marginBottom: '8px'}}>
              £9.99
              <span style={{fontSize: '1rem', color: '#9ca3af'}}>/mo</span>
            </div>
            <p style={{color: '#9ca3af', marginBottom: '32px'}}>Perfect for casual players</p>
            <ul style={{listStyle: 'none', padding: 0, marginBottom: '32px', lineHeight: '2.2', color: '#9ca3af'}}>
              <li>✅ Enter monthly draws</li>
              <li>✅ Support your charity</li>
              <li>✅ Track your scores</li>
              <li>✅ Cancel anytime</li>
            </ul>
            <button
              onClick={() => handleSubscribe('monthly')}
              disabled={loading}
              style={{width: '100%', padding: '16px', backgroundColor: '#4ade80', color: '#000', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer'}}
            >
              {loading ? 'Processing...' : 'Subscribe Monthly →'}
            </button>
          </div>

          {/* YEARLY */}
          <div style={{backgroundColor: '#4ade80', padding: '40px', borderRadius: '20px', color: '#000'}}>
            <div style={{backgroundColor: '#000', color: '#4ade80', display: 'inline-block', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '16px'}}>
              BEST VALUE
            </div>
            <h3 style={{fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px'}}>Yearly</h3>
            <div style={{fontSize: '3rem', fontWeight: 'bold', marginBottom: '8px'}}>
              £99.99
              <span style={{fontSize: '1rem'}}>/yr</span>
            </div>
            <p style={{marginBottom: '32px', opacity: 0.7}}>Save 2 months — best value!</p>
            <ul style={{listStyle: 'none', padding: 0, marginBottom: '32px', lineHeight: '2.2'}}>
              <li>✅ Everything in Monthly</li>
              <li>✅ 2 months free</li>
              <li>✅ Priority support</li>
              <li>✅ Exclusive yearly draws</li>
            </ul>
            <button
              onClick={() => handleSubscribe('yearly')}
              disabled={loading}
              style={{width: '100%', padding: '16px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer'}}
            >
              {loading ? 'Processing...' : 'Subscribe Yearly →'}
            </button>
          </div>

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