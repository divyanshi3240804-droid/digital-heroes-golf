'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Signup() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSignup = async () => {
    setLoading(true)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }
      }
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Account created! Please check your email to verify.')
    }
    setLoading(false)
  }

  return (
    <main style={{minHeight: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: 'sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{backgroundColor: '#111', padding: '48px', borderRadius: '16px', width: '100%', maxWidth: '420px', border: '1px solid #1f2937'}}>
        
        <div style={{textAlign: 'center', marginBottom: '32px'}}>
          <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#4ade80', marginBottom: '8px'}}>GolfHeroes ⛳</div>
          <h1 style={{fontSize: '1.8rem', fontWeight: 'bold'}}>Create Account</h1>
          <p style={{color: '#9ca3af', marginTop: '8px'}}>Join and start playing today</p>
        </div>

        <div style={{marginBottom: '16px'}}>
          <label style={{display: 'block', marginBottom: '6px', color: '#9ca3af', fontSize: '0.85rem'}}>Full Name</label>
          <input
            type="text"
            placeholder="Divyanshi Jaiswal"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={{width: '100%', padding: '12px', backgroundColor: '#000', border: '1px solid #1f2937', borderRadius: '8px', color: '#fff', fontSize: '1rem', boxSizing: 'border-box'}}
          />
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
            placeholder="Min 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{width: '100%', padding: '12px', backgroundColor: '#000', border: '1px solid #1f2937', borderRadius: '8px', color: '#fff', fontSize: '1rem', boxSizing: 'border-box'}}
          />
        </div>

        {message && (
          <div style={{backgroundColor: '#1f2937', padding: '12px', borderRadius: '8px', marginBottom: '16px', color: '#4ade80', fontSize: '0.85rem'}}>
            {message}
          </div>
        )}

        <button
          onClick={handleSignup}
          disabled={loading}
          style={{width: '100%', padding: '14px', backgroundColor: '#4ade80', color: '#000', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer'}}
        >
          {loading ? 'Creating Account...' : 'Create Account →'}
        </button>

        <p style={{textAlign: 'center', marginTop: '24px', color: '#9ca3af'}}>
          Already have an account? <a href="/login" style={{color: '#4ade80', textDecoration: 'none', fontWeight: 'bold'}}>Login</a>
        </p>

      </div>
    </main>
  )
}