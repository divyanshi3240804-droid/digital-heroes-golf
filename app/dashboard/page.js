'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [scores, setScores] = useState([])
  const [newScore, setNewScore] = useState('')
  const [newDate, setNewDate] = useState('')
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      window.location.href = '/login'
    } else {
      setUser(user)
      getScores(user.id)
    }
    setLoading(false)
  }

  const getScores = async (userId) => {
    const { data, error } = await supabase
      .from('scores')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(5)
    if (data) setScores(data)
  }

  const addScore = async () => {
    if (!newScore || !newDate) {
      setMessage('Please enter both score and date!')
      return
    }
    if (newScore < 1 || newScore > 45) {
      setMessage('Score must be between 1 and 45!')
      return
    }

    const { error } = await supabase
      .from('scores')
      .insert([{
        user_id: user.id,
        score: parseInt(newScore),
        date: newDate
      }])

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Score added successfully!')
      setNewScore('')
      setNewDate('')
      getScores(user.id)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (loading) return (
    <div style={{minHeight: '100vh', backgroundColor: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif'}}>
      <p>Loading...</p>
    </div>
  )

  return (
    <main style={{minHeight: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: 'sans-serif'}}>
      
      {/* NAVBAR */}
      <nav style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 48px', borderBottom: '1px solid #1f2937'}}>
        <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#4ade80'}}>GolfHeroes ⛳</div>
        <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
          <span style={{color: '#9ca3af'}}>Welcome, {user?.email}</span>
          <button onClick={handleLogout} style={{backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'}}>
            Logout
          </button>
        </div>
      </nav>

      <div style={{maxWidth: '1000px', margin: '0 auto', padding: '48px 24px'}}>
        
        {/* WELCOME */}
        <div style={{marginBottom: '40px'}}>
          <h1 style={{fontSize: '2rem', fontWeight: 'bold'}}>Your Dashboard 🏌️</h1>
          <p style={{color: '#9ca3af', marginTop: '8px'}}>Track your scores and manage your account</p>
        </div>

        {/* STATS */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px'}}>
          <div style={{backgroundColor: '#111', padding: '24px', borderRadius: '16px', border: '1px solid #1f2937'}}>
            <p style={{color: '#9ca3af', fontSize: '0.85rem', marginBottom: '8px'}}>TOTAL SCORES</p>
            <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#4ade80'}}>{scores.length}</p>
          </div>
          <div style={{backgroundColor: '#111', padding: '24px', borderRadius: '16px', border: '1px solid #1f2937'}}>
            <p style={{color: '#9ca3af', fontSize: '0.85rem', marginBottom: '8px'}}>BEST SCORE</p>
            <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#4ade80'}}>{scores.length > 0 ? Math.max(...scores.map(s => s.score)) : '-'}</p>
          </div>
          <div style={{backgroundColor: '#111', padding: '24px', borderRadius: '16px', border: '1px solid #1f2937'}}>
            <p style={{color: '#9ca3af', fontSize: '0.85rem', marginBottom: '8px'}}>SUBSCRIPTION</p>
            <p style={{fontSize: '1.2rem', fontWeight: 'bold', color: '#f59e0b'}}>Inactive</p>
          </div>
        </div>

        {/* ADD SCORE */}
        <div style={{backgroundColor: '#111', padding: '32px', borderRadius: '16px', border: '1px solid #1f2937', marginBottom: '32px'}}>
          <h2 style={{fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '24px'}}>Add Golf Score ⛳</h2>
          
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px'}}>
            <div>
              <label style={{display: 'block', marginBottom: '6px', color: '#9ca3af', fontSize: '0.85rem'}}>Score (1-45)</label>
              <input
                type="number"
                min="1"
                max="45"
                placeholder="e.g. 32"
                value={newScore}
                onChange={(e) => setNewScore(e.target.value)}
                style={{width: '100%', padding: '12px', backgroundColor: '#000', border: '1px solid #1f2937', borderRadius: '8px', color: '#fff', fontSize: '1rem', boxSizing: 'border-box'}}
              />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '6px', color: '#9ca3af', fontSize: '0.85rem'}}>Date</label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                style={{width: '100%', padding: '12px', backgroundColor: '#000', border: '1px solid #1f2937', borderRadius: '8px', color: '#fff', fontSize: '1rem', boxSizing: 'border-box'}}
              />
            </div>
          </div>

          {message && (
            <div style={{backgroundColor: '#1f2937', padding: '12px', borderRadius: '8px', marginBottom: '16px', color: '#4ade80', fontSize: '0.85rem'}}>
              {message}
            </div>
          )}

          <button
            onClick={addScore}
            style={{backgroundColor: '#4ade80', color: '#000', border: 'none', padding: '14px 32px', borderRadius: '10px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer'}}
          >
            Add Score →
          </button>
        </div>

        {/* SCORES LIST */}
        <div style={{backgroundColor: '#111', padding: '32px', borderRadius: '16px', border: '1px solid #1f2937'}}>
          <h2 style={{fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '24px'}}>Your Last 5 Scores 📊</h2>
          
          {scores.length === 0 ? (
            <p style={{color: '#9ca3af', textAlign: 'center', padding: '40px'}}>No scores yet — add your first score above!</p>
          ) : (
            <div>
              {scores.map((score, index) => (
                <div key={score.id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: '#000', borderRadius: '10px', marginBottom: '12px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                    <div style={{backgroundColor: '#4ade80', color: '#000', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'}}>
                      {index + 1}
                    </div>
                    <div>
                      <p style={{fontWeight: 'bold', fontSize: '1.1rem'}}>{score.score} points</p>
                      <p style={{color: '#9ca3af', fontSize: '0.85rem'}}>{new Date(score.date).toLocaleDateString('en-GB', {day: '2-digit', month: 'short', year: 'numeric'})}</p>
                    </div>
                  </div>
                  <div style={{color: '#4ade80', fontWeight: 'bold', fontSize: '1.5rem'}}>
                    ⛳
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  )
}