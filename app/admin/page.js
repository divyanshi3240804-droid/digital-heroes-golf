'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function Admin() {
  const [users, setUsers] = useState([])
  const [scores, setScores] = useState([])
  const [charities, setCharities] = useState([])
  const [draws, setDraws] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('users')
  const [newCharity, setNewCharity] = useState({ name: '', description: '' })
  const [drawResult, setDrawResult] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchAll()
  }, [])

  const fetchAll = async () => {
    const { data: usersData } = await supabase.from('profiles').select('*')
    const { data: scoresData } = await supabase.from('scores').select('*')
    const { data: charitiesData } = await supabase.from('charities').select('*')
    const { data: drawsData } = await supabase.from('draws').select('*')
    if (usersData) setUsers(usersData)
    if (scoresData) setScores(scoresData)
    if (charitiesData) setCharities(charitiesData)
    if (drawsData) setDraws(drawsData)
    setLoading(false)
  }

  const addCharity = async () => {
    if (!newCharity.name || !newCharity.description) {
      setMessage('Please fill all fields!')
      return
    }
    const { error } = await supabase
      .from('charities')
      .insert([newCharity])
    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Charity added successfully!')
      setNewCharity({ name: '', description: '' })
      fetchAll()
    }
  }

  const deleteCharity = async (id) => {
    const { error } = await supabase
      .from('charities')
      .delete()
      .eq('id', id)
    if (!error) {
      setMessage('Charity deleted!')
      fetchAll()
    }
  }

  const runDraw = async () => {
    // Generate 5 random numbers between 1-45
    const winningNumbers = []
    while (winningNumbers.length < 5) {
      const num = Math.floor(Math.random() * 45) + 1
      if (!winningNumbers.includes(num)) {
        winningNumbers.push(num)
      }
    }
    winningNumbers.sort((a, b) => a - b)

    const { error } = await supabase
      .from('draws')
      .insert([{
        winning_numbers: winningNumbers,
        status: 'completed',
        jackpot_amount: 1000,
        draw_date: new Date().toISOString()
      }])

    if (!error) {
      setDrawResult(winningNumbers)
      setMessage('Draw completed successfully!')
      fetchAll()
    }
  }

  const tabStyle = (tab) => ({
    padding: '10px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    backgroundColor: activeTab === tab ? '#4ade80' : '#1f2937',
    color: activeTab === tab ? '#000' : '#fff'
  })

  if (loading) return (
    <div style={{minHeight: '100vh', backgroundColor: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif'}}>
      <p>Loading Admin Panel...</p>
    </div>
  )

  return (
    <main style={{minHeight: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: 'sans-serif'}}>
      
      {/* NAVBAR */}
      <nav style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 48px', borderBottom: '1px solid #1f2937'}}>
        <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#4ade80'}}>GolfHeroes ⛳ Admin</div>
        <a href="/dashboard" style={{color: '#9ca3af', textDecoration: 'none'}}>← User Dashboard</a>
      </nav>

      <div style={{maxWidth: '1100px', margin: '0 auto', padding: '48px 24px'}}>

        <h1 style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '8px'}}>Admin Dashboard 🛠️</h1>
        <p style={{color: '#9ca3af', marginBottom: '40px'}}>Manage users, charities, draws and more</p>

        {/* STATS */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px'}}>
          <div style={{backgroundColor: '#111', padding: '24px', borderRadius: '16px', border: '1px solid #1f2937', textAlign: 'center'}}>
            <p style={{color: '#9ca3af', fontSize: '0.8rem', marginBottom: '8px'}}>TOTAL USERS</p>
            <p style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#4ade80'}}>{users.length}</p>
          </div>
          <div style={{backgroundColor: '#111', padding: '24px', borderRadius: '16px', border: '1px solid #1f2937', textAlign: 'center'}}>
            <p style={{color: '#9ca3af', fontSize: '0.8rem', marginBottom: '8px'}}>TOTAL SCORES</p>
            <p style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#4ade80'}}>{scores.length}</p>
          </div>
          <div style={{backgroundColor: '#111', padding: '24px', borderRadius: '16px', border: '1px solid #1f2937', textAlign: 'center'}}>
            <p style={{color: '#9ca3af', fontSize: '0.8rem', marginBottom: '8px'}}>CHARITIES</p>
            <p style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#4ade80'}}>{charities.length}</p>
          </div>
          <div style={{backgroundColor: '#111', padding: '24px', borderRadius: '16px', border: '1px solid #1f2937', textAlign: 'center'}}>
            <p style={{color: '#9ca3af', fontSize: '0.8rem', marginBottom: '8px'}}>DRAWS RUN</p>
            <p style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#4ade80'}}>{draws.length}</p>
          </div>
        </div>

        {/* TABS */}
        <div style={{display: 'flex', gap: '12px', marginBottom: '32px'}}>
          <button style={tabStyle('users')} onClick={() => setActiveTab('users')}>Users</button>
          <button style={tabStyle('charities')} onClick={() => setActiveTab('charities')}>Charities</button>
          <button style={tabStyle('draws')} onClick={() => setActiveTab('draws')}>Draw System</button>
          <button style={tabStyle('scores')} onClick={() => setActiveTab('scores')}>Scores</button>
        </div>

        {message && (
          <div style={{backgroundColor: '#1f2937', padding: '12px', borderRadius: '8px', marginBottom: '24px', color: '#4ade80'}}>
            {message}
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === 'users' && (
          <div style={{backgroundColor: '#111', borderRadius: '16px', border: '1px solid #1f2937', overflow: 'hidden'}}>
            <div style={{padding: '24px', borderBottom: '1px solid #1f2937'}}>
              <h2 style={{fontSize: '1.2rem', fontWeight: 'bold'}}>All Users</h2>
            </div>
            {users.length === 0 ? (
              <p style={{padding: '40px', textAlign: 'center', color: '#9ca3af'}}>No users yet</p>
            ) : (
              users.map((user) => (
                <div key={user.id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid #1f2937'}}>
                  <div>
                    <p style={{fontWeight: 'bold'}}>{user.full_name || 'No name'}</p>
                    <p style={{color: '#9ca3af', fontSize: '0.85rem'}}>{user.email}</p>
                  </div>
                  <div style={{textAlign: 'right'}}>
                    <span style={{backgroundColor: user.subscription_status === 'active' ? '#4ade80' : '#1f2937', color: user.subscription_status === 'active' ? '#000' : '#9ca3af', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold'}}>
                      {user.subscription_status || 'inactive'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* CHARITIES TAB */}
        {activeTab === 'charities' && (
          <div>
            <div style={{backgroundColor: '#111', padding: '24px', borderRadius: '16px', border: '1px solid #1f2937', marginBottom: '24px'}}>
              <h2 style={{fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '20px'}}>Add New Charity</h2>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px'}}>
                <div>
                  <label style={{display: 'block', marginBottom: '6px', color: '#9ca3af', fontSize: '0.85rem'}}>Charity Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Red Cross"
                    value={newCharity.name}
                    onChange={(e) => setNewCharity({...newCharity, name: e.target.value})}
                    style={{width: '100%', padding: '12px', backgroundColor: '#000', border: '1px solid #1f2937', borderRadius: '8px', color: '#fff', boxSizing: 'border-box'}}
                  />
                </div>
                <div>
                  <label style={{display: 'block', marginBottom: '6px', color: '#9ca3af', fontSize: '0.85rem'}}>Description</label>
                  <input
                    type="text"
                    placeholder="What does this charity do?"
                    value={newCharity.description}
                    onChange={(e) => setNewCharity({...newCharity, description: e.target.value})}
                    style={{width: '100%', padding: '12px', backgroundColor: '#000', border: '1px solid #1f2937', borderRadius: '8px', color: '#fff', boxSizing: 'border-box'}}
                  />
                </div>
              </div>
              <button onClick={addCharity} style={{backgroundColor: '#4ade80', color: '#000', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'}}>
                Add Charity →
              </button>
            </div>

            <div style={{backgroundColor: '#111', borderRadius: '16px', border: '1px solid #1f2937', overflow: 'hidden'}}>
              <div style={{padding: '24px', borderBottom: '1px solid #1f2937'}}>
                <h2 style={{fontSize: '1.2rem', fontWeight: 'bold'}}>All Charities</h2>
              </div>
              {charities.map((charity) => (
                <div key={charity.id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid #1f2937'}}>
                  <div>
                    <p style={{fontWeight: 'bold'}}>{charity.name}</p>
                    <p style={{color: '#9ca3af', fontSize: '0.85rem'}}>{charity.description}</p>
                  </div>
                  <button onClick={() => deleteCharity(charity.id)} style={{backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'}}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DRAWS TAB */}
        {activeTab === 'draws' && (
          <div>
            <div style={{backgroundColor: '#111', padding: '32px', borderRadius: '16px', border: '1px solid #1f2937', marginBottom: '24px', textAlign: 'center'}}>
              <h2 style={{fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '8px'}}>Monthly Draw System 🎰</h2>
              <p style={{color: '#9ca3af', marginBottom: '32px'}}>Run the monthly draw to generate winning numbers</p>
              
              {drawResult && (
                <div style={{backgroundColor: '#000', padding: '24px', borderRadius: '12px', marginBottom: '24px'}}>
                  <p style={{color: '#9ca3af', marginBottom: '16px'}}>Winning Numbers:</p>
                  <div style={{display: 'flex', gap: '12px', justifyContent: 'center'}}>
                    {drawResult.map((num, i) => (
                      <div key={i} style={{backgroundColor: '#4ade80', color: '#000', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem'}}>
                        {num}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button onClick={runDraw} style={{backgroundColor: '#4ade80', color: '#000', border: 'none', padding: '16px 48px', borderRadius: '12px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer'}}>
                🎰 Run Monthly Draw
              </button>
            </div>

            <div style={{backgroundColor: '#111', borderRadius: '16px', border: '1px solid #1f2937', overflow: 'hidden'}}>
              <div style={{padding: '24px', borderBottom: '1px solid #1f2937'}}>
                <h2 style={{fontSize: '1.2rem', fontWeight: 'bold'}}>Draw History</h2>
              </div>
              {draws.length === 0 ? (
                <p style={{padding: '40px', textAlign: 'center', color: '#9ca3af'}}>No draws yet — run your first draw above!</p>
              ) : (
                draws.map((draw) => (
                  <div key={draw.id} style={{padding: '16px 24px', borderBottom: '1px solid #1f2937'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <div>
                        <p style={{fontWeight: 'bold'}}>{new Date(draw.draw_date).toLocaleDateString('en-GB')}</p>
                        <div style={{display: 'flex', gap: '8px', marginTop: '8px'}}>
                          {draw.winning_numbers.map((num, i) => (
                            <span key={i} style={{backgroundColor: '#4ade80', color: '#000', width: '32px', height: '32px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.85rem'}}>
                              {num}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span style={{backgroundColor: '#1f2937', color: '#4ade80', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold'}}>
                        {draw.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* SCORES TAB */}
        {activeTab === 'scores' && (
          <div style={{backgroundColor: '#111', borderRadius: '16px', border: '1px solid #1f2937', overflow: 'hidden'}}>
            <div style={{padding: '24px', borderBottom: '1px solid #1f2937'}}>
              <h2 style={{fontSize: '1.2rem', fontWeight: 'bold'}}>All Scores</h2>
            </div>
            {scores.length === 0 ? (
              <p style={{padding: '40px', textAlign: 'center', color: '#9ca3af'}}>No scores yet</p>
            ) : (
              scores.map((score) => (
                <div key={score.id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid #1f2937'}}>
                  <div>
                    <p style={{fontWeight: 'bold'}}>{score.score} points</p>
                    <p style={{color: '#9ca3af', fontSize: '0.85rem'}}>{new Date(score.date).toLocaleDateString('en-GB')}</p>
                  </div>
                  <span style={{color: '#4ade80'}}>⛳</span>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </main>
  )
}