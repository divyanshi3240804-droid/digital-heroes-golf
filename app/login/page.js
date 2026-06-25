'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useResponsive } from '../../lib/useResponsive'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { getResponsive } = useResponsive()

  const handleLogin = async () => {
    setLoading(true)
    const { data,error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setMessage(error.message)
    } else {
    const { data: profile } = await supabase
  .from('profiles')
  .select('role')
  .eq('id', data.user.id)
  .single()

if (profile?.role === 'admin') {
  window.location.href = '/admin'
} else {
  window.location.href = '/dashboard'
}
    }
    setLoading(false)
  }

  return (
    <main style={{minHeight: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: 'sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: getResponsive('10px', '12px', '14px', '16px', '20px', '20px')}}>
      <div style={{backgroundColor: '#111', padding: getResponsive('24px', '28px', '32px', '40px', '48px', '48px'), borderRadius: '16px', width: '100%', maxWidth: '420px', border: '1px solid #1f2937'}}>
        
        <div style={{textAlign: 'center', marginBottom: getResponsive('16px', '20px', '24px', '28px', '32px', '32px')}}>
          <div style={{fontSize: getResponsive('1.2rem', '1.3rem', '1.4rem', '1.5rem', '1.5rem', '1.5rem'), fontWeight: 'bold', color: '#4ade80', marginBottom: getResponsive('4px', '6px', '8px', '8px', '8px', '8px')}}>GolfHeroes ⛳</div>
          <h1 style={{fontSize: getResponsive('1.4rem', '1.5rem', '1.6rem', '1.7rem', '1.8rem', '1.8rem'), fontWeight: 'bold'}}>Welcome Back</h1>
          <p style={{color: '#9ca3af', marginTop: getResponsive('4px', '6px', '8px', '8px', '8px', '8px'), fontSize: getResponsive('0.8rem', '0.85rem', '0.9rem', '0.95rem', '1rem', '1rem')}}>Login to your account</p>
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
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{width: '100%', padding: getResponsive('10px', '11px', '12px', '12px', '12px', '12px'), backgroundColor: '#000', border: '1px solid #1f2937', borderRadius: '8px', color: '#fff', fontSize: getResponsive('0.85rem', '0.9rem', '0.95rem', '1rem', '1rem', '1rem'), boxSizing: 'border-box'}}
          />
        </div>

        {message && (
          <div style={{backgroundColor: '#1f2937', padding: getResponsive('10px', '11px', '12px', '12px', '12px', '12px'), borderRadius: '8px', marginBottom: getResponsive('10px', '12px', '14px', '16px', '16px', '16px'), color: '#ef4444', fontSize: getResponsive('0.75rem', '0.8rem', '0.85rem', '0.9rem', '0.85rem', '0.85rem')}}>
            {message}
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{width: '100%', padding: getResponsive('10px', '11px', '12px', '13px', '14px', '14px'), backgroundColor: '#4ade80', color: '#000', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: getResponsive('0.85rem', '0.9rem', '0.95rem', '1rem', '1rem', '1rem'), cursor: 'pointer'}}
        >
          {loading ? 'Logging in...' : 'Login →'}
        </button>
        

        <p style={{textAlign: 'center', marginTop: getResponsive('16px', '18px', '20px', '22px', '24px', '24px'), color: '#9ca3af', fontSize: getResponsive('0.8rem', '0.85rem', '0.9rem', '0.95rem', '1rem', '1rem')}}>
          Don't have an account? <a href="/signup" style={{color: '#4ade80', textDecoration: 'none', fontWeight: 'bold'}}>Sign Up</a>
        </p>

      </div>
    </main>
  )
}