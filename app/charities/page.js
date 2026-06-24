'use client'
import { supabase } from '../../lib/supabase'
import { useResponsive } from '../../lib/useResponsive'
import { useState, useEffect } from 'react'

export default function Charities() {
  const [charities, setCharities] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const { screenSize, getResponsive } = useResponsive()

  useEffect(() => {
    getCharities()
  }, [])

  const getCharities = async () => {
    const { data } = await supabase.from('charities').select('*')
    if (data) setCharities(data)
    setLoading(false)
  }
const filteredCharities = charities.filter((charity) => {
  const matchesSearch =
    charity.name.toLowerCase().includes(
      searchTerm.toLowerCase()
    )

  const matchesCategory =
    categoryFilter === 'all' ||
    charity.category === categoryFilter

  return matchesSearch && matchesCategory
})
  
  return (
    <main style={{minHeight: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: 'sans-serif'}}>
      
      {/* NAVBAR */}
      <nav style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: getResponsive('12px 10px', '16px 16px', '20px 24px', '24px 32px', '24px 48px', '24px 48px'), borderBottom: '1px solid #1f2937', flexWrap: 'wrap', gap: getResponsive('8px', '12px', '16px', '20px', '24px', '24px')}}>
        <a href="/" style={{fontSize: getResponsive('1rem', '1.2rem', '1.3rem', '1.4rem', '1.5rem', '1.5rem'), fontWeight: 'bold', color: '#4ade80', textDecoration: 'none'}}>GolfHeroes ⛳</a>
        <div style={{display: 'flex', gap: getResponsive('8px', '12px', '16px', '18px', '24px', '24px')}}>
          <a href="/login" style={{backgroundColor: '#4ade80', color: '#000', padding: getResponsive('8px 12px', '9px 14px', '10px 16px', '10px 18px', '10px 20px', '10px 20px'), borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none', fontSize: getResponsive('0.75rem', '0.8rem', '0.85rem', '0.9rem', '1rem', '1rem')}}>Login</a>
          <a href="/signup" style={{backgroundColor: '#fff', color: '#000', padding: getResponsive('8px 12px', '9px 14px', '10px 16px', '10px 18px', '10px 20px', '10px 20px'), borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none', fontSize: getResponsive('0.75rem', '0.8rem', '0.85rem', '0.9rem', '1rem', '1rem')}}>Sign Up</a>
        </div>
      </nav>

      <div style={{maxWidth: '1000px', margin: '0 auto', padding: getResponsive('16px 10px', '24px 16px', '32px 20px', '40px 24px', '48px 24px', '48px 24px')}}>
        
        <div style={{textAlign: 'center', marginBottom: getResponsive('32px', '40px', '48px', '56px', '60px', '60px')}}>
          <h1 style={{fontSize: getResponsive('1.5rem', '1.8rem', '2.2rem', '2.6rem', '3rem', '3rem'), fontWeight: 'bold', marginBottom: getResponsive('8px', '12px', '14px', '16px', '16px', '16px')}}>
            Our <span style={{color: '#4ade80'}}>Charities</span>
          </h1>
          <p style={{color: '#9ca3af', fontSize: getResponsive('0.8rem', '0.9rem', '1rem', '1.05rem', '1.1rem', '1.1rem')}}>
            Every subscription supports a cause you care about
          </p>
        </div>
        <input
  type="text"
  placeholder="Search charities..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  style={{
    width: '100%',
    padding: '12px',
    marginBottom: '20px',
    borderRadius: '10px',
    border: '1px solid #1f2937',
    backgroundColor: '#111',
    color: '#fff'
  }}
/>

<select
  value={categoryFilter}
  onChange={(e) => setCategoryFilter(e.target.value)}
  style={{
    width:'100%',
    padding:'12px',
    marginBottom:'20px',
    borderRadius:'10px',
    background:'#111',
    color:'#fff'
  }}
>
  <option value="all">All Categories</option>
  <option value="children">Children</option>
  <option value="health">Health</option>
  <option value="education">Education</option>
  <option value="animals">Animals</option>
</select>

        {loading ? (
          <p style={{textAlign: 'center', color: '#9ca3af', fontSize: getResponsive('0.8rem', '0.9rem', '1rem', '1rem', '1rem', '1rem')}}>Loading charities...</p>
        ) : charities.length === 0 ? (
          <div style={{textAlign: 'center', padding: getResponsive('32px', '40px', '48px', '56px', '60px', '60px'), backgroundColor: '#111', borderRadius: '16px', border: '1px solid #1f2937'}}>
            <div style={{fontSize: getResponsive('2rem', '2.5rem', '3rem', '3rem', '3rem', '3rem'), marginBottom: getResponsive('8px', '12px', '14px', '16px', '16px', '16px')}}>❤️</div>
            <h3 style={{fontSize: getResponsive('1rem', '1.1rem', '1.2rem', '1.25rem', '1.3rem', '1.3rem'), fontWeight: 'bold', marginBottom: getResponsive('4px', '6px', '8px', '8px', '8px', '8px')}}>Charities Coming Soon!</h3>
            <p style={{color: '#9ca3af', fontSize: getResponsive('0.75rem', '0.85rem', '0.95rem', '1rem', '1rem', '1rem')}}>We are adding charities to our platform. Check back soon!</p>
          </div>
        ) : (
          <div style={{display: 'grid', gridTemplateColumns: getResponsive('1fr', '1fr', '1fr', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)'), gap: getResponsive('12px', '14px', '16px', '18px', '24px', '24px')}}>
         
 {filteredCharities.map((charity) => (
  <div
    key={charity.id}
    style={{
      backgroundColor: '#111',
      borderRadius: '16px',
      border: '1px solid #1f2937',
      overflow: 'hidden'
    }}
  >
    <a
      href={`/charities/${charity.id}`}
      style={{
        textDecoration: 'none',
        color: 'inherit'
      }}
    >
      {charity.image_url ? (
  <img
    src={charity.image_url}
    alt={charity.name}
    style={{
      width:'100%',
      height:'200px',
      objectFit:'cover'
    }}
  />
) : (
  <div
    style={{
      backgroundColor:'#4ade80',
      padding:'40px',
      textAlign:'center',
      fontSize:'3rem'
    }}
  >
    ❤️
  </div>
)}

      <div style={{padding: getResponsive('12px', '14px', '16px', '18px', '24px', '24px')}}>
       <h3>{charity.name}</h3>

<p>{charity.description}</p>

{charity.upcoming_event && (
  <p
    style={{
      marginTop:'10px',
      color:'#4ade80',
      fontWeight:'bold'
    }}
  >
    ⛳ Upcoming Event: {charity.upcoming_event}
  </p>
)}
      </div>
    </a>

    <div style={{padding:'0 24px 24px'}}>
      <a href="/signup">
        Support This Charity →
      </a>

      <a
        href="/donate"
        style={{
          display:'block',
          marginTop:'10px',
          color:'#4ade80',
          textDecoration:'none'
        }}
      >
        Donate Directly →
      </a>
    </div>
  </div>
))}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer style={{padding: getResponsive('20px', '24px', '28px', '32px', '40px', '40px'), borderTop: '1px solid #1f2937', textAlign: 'center', color: '#9ca3af', marginTop: getResponsive('32px', '40px', '48px', '56px', '60px', '60px')}}>
        <div style={{fontSize: getResponsive('1.2rem', '1.3rem', '1.4rem', '1.5rem', '1.5rem', '1.5rem'), fontWeight: 'bold', color: '#4ade80', marginBottom: getResponsive('8px', '12px', '14px', '16px', '16px', '16px')}}>GolfHeroes ⛳</div>
        <p style={{fontSize: getResponsive('0.75rem', '0.8rem', '0.85rem', '0.9rem', '1rem', '1rem')}}>© 2026 GolfHeroes. Built for Digital Heroes.</p>
      </footer>

        </main>
    )
    }