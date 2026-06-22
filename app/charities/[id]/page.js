'use client'

import { useEffect, useState, use } from 'react'
import { supabase } from '../../../lib/supabase'

export default function CharityProfile({ params }) {
  const resolvedParams = use(params)
  const [charity, setCharity] = useState(null)

  useEffect(() => {
    getCharity()
  }, [])

  const getCharity = async () => {
    const { data } = await supabase
      .from('charities')
      .select('*')
     .eq('id', resolvedParams.id)
      .single()

    if (data) setCharity(data)
  }

  if (!charity) {
    return (
      <main style={{
        minHeight:'100vh',
        backgroundColor:'#000',
        color:'#fff',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
      }}>
        Loading...
      </main>
    )
  }

  return (
    <main style={{
      minHeight:'100vh',
      backgroundColor:'#000',
      color:'#fff',
      padding:'40px'
    }}>
      <div style={{
        maxWidth:'900px',
        margin:'0 auto'
      }}>

        <div style={{
          backgroundColor:'#4ade80',
          textAlign:'center',
          padding:'60px',
          borderRadius:'20px',
          fontSize:'4rem'
        }}>
          ❤️
        </div>

        <h1 style={{
          marginTop:'30px',
          fontSize:'3rem'
        }}>
          {charity.name}
        </h1>

        <p style={{
          color:'#9ca3af',
          marginTop:'20px',
          fontSize:'1.1rem'
        }}>
          {charity.description}
        </p>

        <div style={{
          marginTop:'40px',
          backgroundColor:'#111',
          padding:'20px',
          borderRadius:'16px'
        }}>
          <h2>Upcoming Events</h2>

          <p style={{color:'#9ca3af'}}>
            {charity.upcoming_event || 'No upcoming events'}
          </p>
        </div>

      </div>
    </main>
  )
}