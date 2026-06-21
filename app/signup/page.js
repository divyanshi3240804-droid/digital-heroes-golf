'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useResponsive } from '../../lib/useResponsive'

export default function Signup() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { getResponsive } = useResponsive()

  const handleSignup = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } }
    })
    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Account created! Please check your email to verify.')
    }
    setLoading(false)
  }

  return (
    <main style={{minHeight: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: 'sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: getResponsive('10px', '12px', '14px', '16px', '20px', '20px')}}>
      <div style={{backgroundColor: '#111', padding: getResponsive('24px', '28px', '32px', '40px', '48px', '48px'), borderRadius: '16px', width: '100%', maxWidth: '420px', border: '1px solid #1f2937'}}>
        
        <div style={{textAlign: 'center', marginBottom: getResponsive('16px', '20px', '24px', '28px', '32px', '32px')}}>
          <div style={{fontSize: getResponsive('1.2rem', '1.3rem', '1.4rem', '1.5rem', '1.5rem', '1.5rem'), fontWeight: 'bold', color: '#4ade80', marginBottom: getResponsive('4px', '6px', '8px', '8px', '8px', '8px')}}>GolfHeroes ⛳</div>
          <h1 style={{fontSize: getResponsive('1.4rem', '1.5rem', '1.6rem', '1.7rem', '1.8rem', '1.8rem'), fontWeight: 'bold'}}>Create Account</h1>
          <p style={{color: '#9ca3af', marginTop: getResponsive('4px', '6px', '8px', '8px', '8px', '8px'), fontSize: getResponsive('0.8rem', '0.85rem', '0.9rem', '0.95rem', '1rem', '1rem')}}>Join and start playing today</p>
        </div>

        <div style={{marginBottom: getResponsive('12px', '14px', '16px', '16px', '16px', '16px')}}>
          <label style={{display: 'block', marginBottom: getResponsive('4px', '5px', '6px', '6px', '6px', '6px'), color: '#9ca3af', fontSize: getResponsive('0.75rem', '0.8rem', '0.85rem', '0.85rem', '0.85rem', '0.85rem')}}>Full Name</label>
          <input
            type="text"
            placeholder="Divyanshi Jaiswal"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={{width: '100%', padding: getResponsive('10px', '11px', '12px', '12px', '12px', '12px'), backgroundColor: '#000', border: '1px solid #1f2937', borderRadius: '8px', color: '#fff', fontSize: getResponsive('0.85rem', '0.9rem', '0.95rem', '1rem', '1rem', '1rem'), boxSizing: 'border-box'}}
          />
        </div>

        <div style={{marginBottom: getResponsive('12px', '14px', '16px', '16px', '16px', '16px')}}>
          <label style={{display: 'block', marginBottom: getResponsive('4px', '5px', '6px', '6px', '6px', '6px'), color: '#9ca3af', fontSize: getResponsive('0.75rem', '0.8rem', '0.85rem', '0.85rem', '0.85rem', '0.85rem')}}>Email</label>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{width: '100%', padding: getResponsive('10px', '11px', '12px', '12px', '12px', '12px'), backgroundColor: '#000', border: '1px solid #1f2937', borderRadius: '8px', color: '#fff', fontSize: getResponsive('0.85rem', '0.9rem', '0.95rem', '1rem', '1rem', '1rem'), boxSizing: 'border-box'}}
          />
        </div>

        <div style={{marginBottom: getResponsive('16px', '18px', '20px', '22px', '24px', '24px')}}>
          <label style={{display: 'block', marginBottom: getResponsive('4px', '5px', '6px', '6px', '6px', '6px'), color: '#9ca3af', fontSize: getResponsive('0.75rem', '0.8rem', '0.85rem', '0.85rem', '0.85rem', '0.85rem')}}>Password</label>
          <input
            type="password"
            placeholder="Min 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{width: '100%', padding: getResponsive('10px', '11px', '12px', '12px', '12px', '12px'), backgroundColor: '#000', border: '1px solid #1f2937', borderRadius: '8px', color: '#fff', fontSize: getResponsive('0.85rem', '0.9rem', '0.95rem', '1rem', '1rem', '1rem'), boxSizing: 'border-box'}}
          />
        </div>

        {message && (
          <div style={{backgroundColor: '#1f2937', padding: getResponsive('10px', '11px', '12px', '12px', '12px', '12px'), borderRadius: '8px', marginBottom: getResponsive('10px', '12px', '14px', '16px', '16px', '16px'), color: '#4ade80', fontSize: getResponsive('0.75rem', '0.8rem', '0.85rem', '0.9rem', '0.85rem', '0.85rem')}}>
            {message}
          </div>
        )}

        <button
          onClick={handleSignup}
          disabled={loading}
          style={{width: '100%', padding: getResponsive('10px', '11px', '12px', '13px', '14px', '14px'), backgroundColor: '#4ade80', color: '#000', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: getResponsive('0.85rem', '0.9rem', '0.95rem', '1rem', '1rem', '1rem'), cursor: 'pointer'}}
        >
          {loading ? 'Creating Account...' : 'Create Account →'}
        </button>

        <p style={{textAlign: 'center', marginTop: getResponsive('16px', '18px', '20px', '22px', '24px', '24px'), color: '#9ca3af', fontSize: getResponsive('0.8rem', '0.85rem', '0.9rem', '0.95rem', '1rem', '1rem')}}>
          Already have an account? <a href="/login" style={{color: '#4ade80', textDecoration: 'none', fontWeight: 'bold'}}>Login</a>
        </p>

      </div>
    </main>
  )
}