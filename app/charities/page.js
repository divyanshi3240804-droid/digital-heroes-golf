'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function Charities() {
  const [charities, setCharities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCharities()
  }, [])

  const getCharities = async () => {
    const { data, error } = await supabase
      .from('charities')
      .select('*')
    if (data) setCharities(data)
    setLoading(false)
  }

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

      <div style={{maxWidth: '1000px', margin: '0 auto', padding: '48px 24px'}}>
        
        <div style={{textAlign: 'center', marginBottom: '60px'}}>
          <h1 style={{fontSize: '3rem', fontWeight: 'bold', marginBottom: '16px'}}>
            Our <span style={{color: '#4ade80'}}>Charities</span>
          </h1>
          <p style={{color: '#9ca3af', fontSize: '1.1rem'}}>
            Every subscription supports a cause you care about
          </p>
        </div>

        {loading ? (
          <p style={{textAlign: 'center', color: '#9ca3af'}}>Loading charities...</p>
        ) : charities.length === 0 ? (
          <div style={{textAlign: 'center', padding: '60px', backgroundColor: '#111', borderRadius: '16px', border: '1px solid #1f2937'}}>
            <div style={{fontSize: '3rem', marginBottom: '16px'}}>❤️</div>
            <h3 style={{fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '8px'}}>Charities Coming Soon!</h3>
            <p style={{color: '#9ca3af'}}>We are adding charities to our platform. Check back soon!</p>
          </div>
        ) : (
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px'}}>
            {charities.map((charity) => (
              <div key={charity.id} style={{backgroundColor: '#111', borderRadius: '16px', border: '1px solid #1f2937', overflow: 'hidden'}}>
                <div style={{backgroundColor: '#4ade80', padding: '40px', textAlign: 'center', fontSize: '3rem'}}>
                  ❤️
                </div>
                <div style={{padding: '24px'}}>
                  <h3 style={{fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '8px'}}>{charity.name}</h3>
                  <p style={{color: '#9ca3af', marginBottom: '16px'}}>{charity.description}</p>
                  <a href="/signup" style={{display: 'inline-block', backgroundColor: '#4ade80', color: '#000', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none'}}>
                    Support This Charity →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer style={{padding: '40px', borderTop: '1px solid #1f2937', textAlign: 'center', color: '#9ca3af', marginTop: '60px'}}>
        <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#4ade80', marginBottom: '16px'}}>GolfHeroes ⛳</div>
        <p>© 2026 GolfHeroes. Built for Digital Heroes.</p>
      </footer>

    </main>
  )
}