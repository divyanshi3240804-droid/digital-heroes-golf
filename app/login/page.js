'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleLogin = async () => {
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setMessage(error.message)
    } else {
      window.location.href = '/dashboard'
    }
    setLoading(false)
  }

  return (
    <main style={{minHeight: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: 'sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{backgroundColor: '#111', padding: '48px', borderRadius: '16px', width: '100%', maxWidth: '420px', border: '1px solid #1f2937'}}>
        
        <div style={{textAlign: 'center', marginBottom: '32px'}}>
          <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#4ade80', marginBottom: '8px'}}>GolfHeroes ⛳</div>
          <h1 style={{fontSize: '1.8rem', fontWeight: 'bold'}}>Welcome Back</h1>
          <p style={{color: '#9ca3af', marginTop: '8px'}}>Login to your account</p>
        </div>

        <div style={{marginBottom: '16px'}}>
          <label style={{display: 'block', marginBottom: '6px', color: '#9ca3af', fontSize: '0.85rem'}}>Email</label>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{width: '100%', padding: '12px', backgroundColor: '#000', border: '1px solid #1f2937', borderRadius: '8px', color: '#fff', fontSize: '1rem', boxSizing: 'border-box'}}
          />
        </div>

        <div style={{marginBottom: '24px'}}>
          <label style={{display: 'block', marginBottom: '6px', color: '#9ca3af', fontSize: '0.85rem'}}>Password</label>
          <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{width: '100%', padding: '12px', backgroundColor: '#000', border: '1px solid #1f2937', borderRadius: '8px', color: '#fff', fontSize: '1rem', boxSizing: 'border-box'}}
          />
        </div>

        {message && (
          <div style={{backgroundColor: '#1f2937', padding: '12px', borderRadius: '8px', marginBottom: '16px', color: '#ef4444', fontSize: '0.85rem'}}>
            {message}
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{width: '100%', padding: '14px', backgroundColor: '#4ade80', color: '#000', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer'}}
        >
          {loading ? 'Logging in...' : 'Login →'}
        </button>

        <p style={{textAlign: 'center', marginTop: '24px', color: '#9ca3af'}}>
          Don't have an account? <a href="/signup" style={{color: '#4ade80', textDecoration: 'none', fontWeight: 'bold'}}>Sign Up</a>
        </p>

      </div>
    </main>
  )
}