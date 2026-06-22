'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useResponsive } from '../../lib/useResponsive'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [scores, setScores] = useState([])
  const [newScore, setNewScore] = useState('')
  const [newDate, setNewDate] = useState('')
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editScore, setEditScore] = useState('')
const [editDate, setEditDate] = useState('')
const [draws, setDraws] = useState([])
const [winnings, setWinnings] = useState([])
const [proofFile, setProofFile] = useState(null)
  const [profile, setProfile] = useState(null)
  const { getResponsive } = useResponsive()

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
      getProfile(user.id)
      getDraws()
       getWinnings(user.id)
    }
    setLoading(false)
  }

  const getScores = async (userId) => {
    const { data } = await supabase
      .from('scores')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(5)
    if (data) setScores(data)
  }
const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (!error && data) {
    console.log(data)
    setProfile(data)
  }
}

const subscribePlan = async (plan) => {
  const endDate = new Date()

  if (plan === 'monthly') {
    endDate.setMonth(endDate.getMonth() + 1)
  }

  if (plan === 'yearly') {
    endDate.setFullYear(endDate.getFullYear() + 1)
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      subscription_status: 'active',
      subscription_plan: plan,
      subscription_end_date: endDate.toISOString()
    })
    .eq('id', user.id)

  if (error) {
    setMessage(error.message)
  } else {
    setMessage(`${plan} subscription activated successfully!`)

setTimeout(() => {
  setMessage('')
}, 3000)
setProfile({
  ...profile,
  subscription_status: 'active',
  subscription_plan: plan,
  subscription_end_date: endDate.toISOString()
})

getProfile(user.id)
  }
}
const getDraws = async () => {
  const { data } = await supabase
    .from('draws')
    .select('*')
    .order('created_at', { ascending: false })

  if (data) setDraws(data)
}

const getWinnings = async (userId) => {
  const { data } = await supabase
    .from('winners')
    .select('*')
    .eq('user_id', userId)

  if (data) setWinnings(data)
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
.insert([
{
user_id: user.id,
score: parseInt(newScore),
date: newDate
}
])

if (error) {
if (error.message.includes('scores_date_key')) {
setMessage(
'A score already exists for this date. Please edit the existing score instead.'
)
} else {
setMessage(error.message)
}
} else {
setMessage('Score added successfully!')
setNewScore('')
setNewDate('')
getScores(user.id)
}
}
const deleteScore = async (scoreId) => {
const { error } = await supabase
.from('scores')
.delete()
.eq('id', scoreId)

if (error) {
setMessage(error.message)
} else {
setMessage('Score deleted successfully!')
getScores(user.id)
}
}
const updateScore = async (scoreId) => {
if (!editScore || !editDate) {
setMessage('Please enter both score and date!')
return
}

if (editScore < 1 || editScore > 45) {
setMessage('Score must be between 1 and 45!')
return
}

const { error } = await supabase
.from('scores')
.update({
score: parseInt(editScore),
date: editDate
})
.eq('id', scoreId)

if (error) {
if (error.message.includes('scores_date_key')) {
setMessage('A score already exists for this date.')
} else {
setMessage(error.message)
}
} else {
setMessage('Score updated successfully!')
setEditingId(null)
setEditScore('')
setEditDate('')
getScores(user.id)
}
}
const uploadWinnerProof = async () => {
  if (!proofFile) {
    setMessage('Please choose a proof file first.')
    return
  }

  if (winnings.length === 0) {
    setMessage('No winnings found for proof upload.')
    return
  }

  const winnerId = winnings[0].id
  const filePath = `${user.id}/${winnerId}-${proofFile.name}`

  const { error: uploadError } = await supabase.storage
    .from('winner-proofs')
    .upload(filePath, proofFile, {
      upsert: true
    })

  if (uploadError) {
    setMessage(uploadError.message)
    return
  }

  const { data } = supabase.storage
    .from('winner-proofs')
    .getPublicUrl(filePath)

  const { error: dbError } = await supabase
    .from('winner_proofs')
    .insert({
      winner_id: winnerId,
      user_id: user.id,
      proof_url: data.publicUrl,
      status: 'pending'
    })

  if (dbError) {
    setMessage(dbError.message)
  } else {
    setMessage('Winner proof uploaded successfully!')
    setProofFile(null)
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
      <nav style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: getResponsive('12px 16px', '14px 20px', '16px 24px', '18px 32px', '24px 48px', '24px 48px'), borderBottom: '1px solid #1f2937', gap: getResponsive('8px', '10px', '12px', '16px', '16px', '16px'), flexWrap: 'wrap'}}>
        <div style={{fontSize: getResponsive('1.2rem', '1.3rem', '1.4rem', '1.5rem', '1.5rem', '1.5rem'), fontWeight: 'bold', color: '#4ade80'}}>GolfHeroes ⛳</div>
        <div style={{display: 'flex', alignItems: 'center', gap: getResponsive('8px', '10px', '12px', '14px', '16px', '16px'), flexWrap: 'wrap'}}>
          <span style={{color: '#9ca3af', fontSize: getResponsive('0.75rem', '0.8rem', '0.85rem', '0.9rem', '1rem', '1rem')}} title={user?.email}>Welcome, {user?.email?.split('@')[0]}</span>
          <button onClick={handleLogout} style={{backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: getResponsive('8px 12px', '9px 14px', '10px 16px', '10px 18px', '10px 20px', '10px 20px'), borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: getResponsive('0.75rem', '0.8rem', '0.85rem', '0.9rem', '1rem', '1rem')}}>
            Logout
          </button>
        </div>
      </nav>

      <div style={{maxWidth: '1000px', margin: '0 auto', padding: getResponsive('24px 12px', '32px 14px', '40px 18px', '48px 24px', '48px 24px', '48px 24px')}}>
        
        {/* WELCOME */}
        <div style={{marginBottom: getResponsive('24px', '28px', '32px', '36px', '40px', '40px')}}>
          <h1 style={{fontSize: getResponsive('1.5rem', '1.6rem', '1.7rem', '1.8rem', '2rem', '2rem'), fontWeight: 'bold'}}>Your Dashboard 🏌️</h1>
          <p style={{color: '#9ca3af', marginTop: getResponsive('4px', '6px', '8px', '8px', '8px', '8px'), fontSize: getResponsive('0.85rem', '0.9rem', '0.95rem', '1rem', '1rem', '1rem')}}>Track your scores and manage your account</p>
        </div>

        {/* STATS */}
        <div style={{display: 'grid', gridTemplateColumns: getResponsive('1fr', '1fr', '1fr', '1fr', 'repeat(3, 1fr)', 'repeat(3, 1fr)'), gap: getResponsive('12px', '14px', '16px', '20px', '24px', '24px'), marginBottom: getResponsive('24px', '28px', '32px', '36px', '40px', '40px')}}>
          <div style={{backgroundColor: '#111', padding: getResponsive('14px', '16px', '18px', '20px', '24px', '24px'), borderRadius: '16px', border: '1px solid #1f2937'}}>
            <p style={{color: '#9ca3af', fontSize: getResponsive('0.7rem', '0.75rem', '0.8rem', '0.85rem', '0.85rem', '0.85rem'), marginBottom: getResponsive('4px', '6px', '8px', '8px', '8px', '8px')}}>TOTAL SCORES</p>
            <p style={{fontSize: getResponsive('1.5rem', '1.6rem', '1.8rem', '1.9rem', '2rem', '2rem'), fontWeight: 'bold', color: '#4ade80'}}>{scores.length}</p>
          </div>
          <div style={{backgroundColor: '#111', padding: getResponsive('14px', '16px', '18px', '20px', '24px', '24px'), borderRadius: '16px', border: '1px solid #1f2937'}}>
            <p style={{color: '#9ca3af', fontSize: getResponsive('0.7rem', '0.75rem', '0.8rem', '0.85rem', '0.85rem', '0.85rem'), marginBottom: getResponsive('4px', '6px', '8px', '8px', '8px', '8px')}}>BEST SCORE</p>
            <p style={{fontSize: getResponsive('1.5rem', '1.6rem', '1.8rem', '1.9rem', '2rem', '2rem'), fontWeight: 'bold', color: '#4ade80'}}>{scores.length > 0 ? Math.max(...scores.map(s => s.score)) : '-'}</p>
          </div>
          <div style={{backgroundColor: '#111', padding: getResponsive('14px', '16px', '18px', '20px', '24px', '24px'), borderRadius: '16px', border: '1px solid #1f2937'}}>
            <p style={{color: '#9ca3af', fontSize: getResponsive('0.7rem', '0.75rem', '0.8rem', '0.85rem', '0.85rem', '0.85rem'), marginBottom: getResponsive('4px', '6px', '8px', '8px', '8px', '8px')}}>SUBSCRIPTION</p>
            <p style={{fontSize: getResponsive('0.95rem', '1rem', '1.05rem', '1.1rem', '1.2rem', '1.2rem'), fontWeight: 'bold', color: '#f59e0b'}}>
  {profile?.subscription_status
  ? profile.subscription_status.charAt(0).toUpperCase() + profile.subscription_status.slice(1)
  : 'Inactive'}
</p>

<p style={{
  fontSize: '0.8rem',
  color: '#9ca3af',
  marginTop: '4px'
}}>
  {profile?.subscription_end_date
    ? `Renews: ${new Date(profile.subscription_end_date).toLocaleDateString()}`
    : ''}
</p>
<div style={{backgroundColor: '#111', padding: getResponsive('14px', '16px', '18px', '20px', '24px', '24px'), borderRadius: '16px', border: '1px solid #1f2937'}}>
  <p style={{color: '#9ca3af', fontSize: getResponsive('0.7rem', '0.75rem', '0.8rem', '0.85rem', '0.85rem', '0.85rem'), marginBottom: '8px'}}>SELECTED CHARITY</p>
  <p style={{fontSize: getResponsive('0.95rem', '1rem', '1.05rem', '1.1rem', '1.2rem', '1.2rem'), fontWeight: 'bold', color: '#4ade80'}}>
    {profile?.charities?.name || 'Not selected'}
  </p>
</div>

<div style={{backgroundColor: '#111', padding: getResponsive('14px', '16px', '18px', '20px', '24px', '24px'), borderRadius: '16px', border: '1px solid #1f2937'}}>
  <p style={{color: '#9ca3af', fontSize: getResponsive('0.7rem', '0.75rem', '0.8rem', '0.85rem', '0.85rem', '0.85rem'), marginBottom: '8px'}}>CHARITY CONTRIBUTION</p>
  <p style={{fontSize: getResponsive('1.5rem', '1.6rem', '1.8rem', '1.9rem', '2rem', '2rem'), fontWeight: 'bold', color: '#4ade80'}}>
    {profile?.charity_percentage || 10}%
  </p>
</div>
<div style={{backgroundColor: '#111', padding: getResponsive('14px', '16px', '18px', '20px', '24px', '24px'), borderRadius: '16px', border: '1px solid #1f2937'}}>
  <p style={{color: '#9ca3af', fontSize: getResponsive('0.7rem', '0.75rem', '0.8rem', '0.85rem', '0.85rem', '0.85rem'), marginBottom: '8px'}}>
    PARTICIPATION SUMMARY
  </p>

  <p style={{fontSize: getResponsive('0.95rem', '1rem', '1.05rem', '1.1rem', '1.2rem', '1.2rem'), fontWeight: 'bold', color: '#4ade80'}}>
    Draws Entered: {draws.length}
  </p>

  <p style={{color: '#9ca3af', fontSize: '0.85rem', marginTop: '6px'}}>
    Scores Submitted: {scores.length}
  </p>
  <p style={{color: '#9ca3af', fontSize: '0.85rem', marginTop: '6px'}}>
  Upcoming Draw: 1st of next month
</p>
</div>

<div style={{backgroundColor: '#111', padding: getResponsive('14px', '16px', '18px', '20px', '24px', '24px'), borderRadius: '16px', border: '1px solid #1f2937'}}>
  <p style={{color: '#9ca3af', fontSize: getResponsive('0.7rem', '0.75rem', '0.8rem', '0.85rem', '0.85rem', '0.85rem'), marginBottom: '8px'}}>
    WINNINGS OVERVIEW
  </p>

  <p style={{fontSize: getResponsive('0.95rem', '1rem', '1.05rem', '1.1rem', '1.2rem', '1.2rem'), fontWeight: 'bold', color: '#4ade80'}}>
    Total Wins: {winnings.length}
  </p>

  <p style={{color: '#9ca3af', fontSize: '0.85rem', marginTop: '6px'}}>
    Status: {winnings.length > 0 ? winnings[0]?.payment_status || 'Pending' : 'No winnings yet'}
  </p>
</div>

          </div>
        </div>
    {true && (
  <div style={{backgroundColor:'#111', padding:'24px', borderRadius:'16px', border:'1px solid #1f2937', marginBottom:'24px'}}>
    <h2 style={{fontSize:'1.2rem', fontWeight:'bold', marginBottom:'12px'}}>
      Upload Winner Proof
    </h2>

    <input
      type="file"
      accept="image/*,.pdf"
      onChange={(e) => setProofFile(e.target.files[0])}
      style={{marginBottom:'12px', color:'#fff'}}
    />

    <button
      onClick={uploadWinnerProof}
      style={{
        backgroundColor:'#4ade80',
        color:'#000',
        border:'none',
        padding:'10px 16px',
        borderRadius:'8px',
        fontWeight:'bold',
        cursor:'pointer'
      }}
    >
      Upload Proof
    </button>
  </div>
)}
{profile?.subscription_status !== 'active' && (
  <div style={{backgroundColor:'#111', padding:'24px', borderRadius:'16px', border:'1px solid #1f2937', marginBottom:'24px'}}>
    <h2 style={{fontSize:'1.2rem', fontWeight:'bold', marginBottom:'8px'}}>
      Choose Your Subscription
    </h2>

    <p style={{color:'#9ca3af', marginBottom:'16px'}}>
      Activate your account to enter monthly draws.
    </p>

    <div style={{display:'flex', gap:'12px', flexWrap:'wrap'}}>
      <button
        onClick={() => subscribePlan('monthly')}
        style={{backgroundColor:'#4ade80', color:'#000', border:'none', padding:'12px 18px', borderRadius:'10px', fontWeight:'bold', cursor:'pointer'}}
      >
        Monthly Plan
      </button>

      <button
        onClick={() => subscribePlan('yearly')}
        style={{backgroundColor:'#3b82f6', color:'#fff', border:'none', padding:'12px 18px', borderRadius:'10px', fontWeight:'bold', cursor:'pointer'}}
      >
        Yearly Plan
      </button>
    </div>
  </div>
)}
      {message && (
  <div style={{backgroundColor: '#1f2937', padding: getResponsive('8px', '9px', '10px', '11px', '12px', '12px'), borderRadius: '8px', marginBottom: getResponsive('10px', '12px', '14px', '16px', '16px', '16px'), color: '#4ade80', fontSize: getResponsive('0.7rem', '0.75rem', '0.8rem', '0.85rem', '0.85rem', '0.85rem')}}>
    {message}
  </div>
)}
        {/* ADD SCORE */}
        <div style={{backgroundColor: '#111', padding: getResponsive('18px', '20px', '24px', '28px', '32px', '32px'), borderRadius: '16px', border: '1px solid #1f2937', marginBottom: getResponsive('20px', '24px', '28px', '32px', '32px', '32px')}}>
          <h2 style={{fontSize: getResponsive('1.1rem', '1.15rem', '1.2rem', '1.25rem', '1.3rem', '1.3rem'), fontWeight: 'bold', marginBottom: getResponsive('14px', '16px', '18px', '20px', '24px', '24px')}}>Add Golf Score ⛳</h2>
          
          <div style={{display: 'grid', gridTemplateColumns: getResponsive('1fr', '1fr', '1fr', '1fr 1fr', '1fr 1fr', '1fr 1fr'), gap: getResponsive('10px', '12px', '14px', '16px', '16px', '16px'), marginBottom: getResponsive('10px', '12px', '14px', '16px', '16px', '16px')}}>
            <div>
              <label style={{display: 'block', marginBottom: getResponsive('4px', '5px', '6px', '6px', '6px', '6px'), color: '#9ca3af', fontSize: getResponsive('0.7rem', '0.75rem', '0.8rem', '0.85rem', '0.85rem', '0.85rem')}}>Score (1-45)</label>
              <input
                type="number"
                min="1"
                max="45"
                placeholder="e.g. 32"
                value={newScore}
                onChange={(e) => setNewScore(e.target.value)}
                style={{width: '100%', padding: getResponsive('8px', '9px', '10px', '11px', '12px', '12px'), backgroundColor: '#000', border: '1px solid #1f2937', borderRadius: '8px', color: '#fff', fontSize: getResponsive('0.85rem', '0.9rem', '0.95rem', '1rem', '1rem', '1rem'), boxSizing: 'border-box'}}
              />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: getResponsive('4px', '5px', '6px', '6px', '6px', '6px'), color: '#9ca3af', fontSize: getResponsive('0.7rem', '0.75rem', '0.8rem', '0.85rem', '0.85rem', '0.85rem')}}>Date</label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                style={{width: '100%', padding: getResponsive('8px', '9px', '10px', '11px', '12px', '12px'), backgroundColor: '#000', border: '1px solid #1f2937', borderRadius: '8px', color: '#fff', fontSize: getResponsive('0.85rem', '0.9rem', '0.95rem', '1rem', '1rem', '1rem'), boxSizing: 'border-box'}}
              />
            </div>
          </div>

          

          <button
            onClick={addScore}
            style={{backgroundColor: '#4ade80', color: '#000', border: 'none', padding: getResponsive('10px 16px', '11px 18px', '12px 20px', '13px 24px', '14px 32px', '14px 32px'), borderRadius: '10px', fontWeight: 'bold', fontSize: getResponsive('0.85rem', '0.9rem', '0.95rem', '1rem', '1rem', '1rem'), cursor: 'pointer'}}
          >
            Add Score →
          </button>
        </div>

        {/* SCORES LIST */}
        <div style={{backgroundColor: '#111', padding: getResponsive('18px', '20px', '24px', '28px', '32px', '32px'), borderRadius: '16px', border: '1px solid #1f2937'}}>
          <h2 style={{fontSize: getResponsive('1.1rem', '1.15rem', '1.2rem', '1.25rem', '1.3rem', '1.3rem'), fontWeight: 'bold', marginBottom: getResponsive('14px', '16px', '18px', '20px', '24px', '24px')}}>Your Last 5 Scores 📊</h2>
          
          {scores.length === 0 ? (
            <p style={{color: '#9ca3af', textAlign: 'center', padding: getResponsive('20px', '24px', '28px', '32px', '40px', '40px'), fontSize: getResponsive('0.85rem', '0.9rem', '0.95rem', '1rem', '1rem', '1rem')}}>No scores yet — add your first score above!</p>
          ) : (
            <div>
              {scores.map((score, index) => (
                <div key={score.id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: getResponsive('10px', '12px', '14px', '16px', '16px', '16px'), backgroundColor: '#000', borderRadius: '10px', marginBottom: getResponsive('8px', '10px', '12px', '12px', '12px', '12px'), flexWrap: 'wrap', gap: getResponsive('8px', '10px', '12px', '12px', '16px', '16px')}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: getResponsive('10px', '12px', '14px', '16px', '16px', '16px')}}>
                    <div style={{backgroundColor: '#4ade80', color: '#000', width: getResponsive('28px', '30px', '32px', '34px', '36px', '36px'), height: getResponsive('28px', '30px', '32px', '34px', '36px', '36px'), borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: getResponsive('0.8rem', '0.85rem', '0.9rem', '0.95rem', '1rem', '1rem')}}>
                      {index + 1}
                    </div>
                    <div>
                      {editingId === score.id ? (
  <div>
    <input
      type="number"
      min="1"
      max="45"
      value={editScore}
      onChange={(e) => setEditScore(e.target.value)}
      style={{width:'90px', padding:'6px', marginBottom:'6px'}}
    />

    <input
      type="date"
      value={editDate}
      onChange={(e) => setEditDate(e.target.value)}
      style={{width:'140px', padding:'6px'}}
    />
  </div>
) : (
  <div>
    <p style={{fontWeight: 'bold', fontSize: getResponsive('0.9rem', '0.95rem', '1rem', '1.05rem', '1.1rem', '1.1rem')}}>{score.score} points</p>
    <p style={{color: '#9ca3af', fontSize: getResponsive('0.7rem', '0.75rem', '0.8rem', '0.85rem', '0.85rem', '0.85rem')}}>{new Date(score.date).toLocaleDateString('en-GB', {day: '2-digit', month: 'short', year: 'numeric'})}</p>
  </div>
)}
                    </div>
                  </div>
                  <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                    <div style={{display:'flex', gap:'8px', alignItems:'center', flexWrap:'wrap'}}>

{editingId === score.id ? (
<>
<button
onClick={() => updateScore(score.id)}
style={{
backgroundColor:'#22c55e',
color:'#fff',
border:'none',
padding:'6px 10px',
borderRadius:'6px',
cursor:'pointer'
}}
>
Save </button>


  <button
    onClick={() => setEditingId(null)}
    style={{
      backgroundColor:'#6b7280',
      color:'#fff',
      border:'none',
      padding:'6px 10px',
      borderRadius:'6px',
      cursor:'pointer'
    }}
  >
    Cancel
  </button>
</>


) : (
<button
onClick={() => {
setEditingId(score.id)
setEditScore(score.score)
setEditDate(score.date)
}}
style={{
backgroundColor:'#3b82f6',
color:'#fff',
border:'none',
padding:'6px 10px',
borderRadius:'6px',
cursor:'pointer'
}}
>
Edit </button>
)}

<button
onClick={() => deleteScore(score.id)}
style={{
backgroundColor:'#ef4444',
color:'#fff',
border:'none',
padding:'6px 10px',
borderRadius:'6px',
cursor:'pointer'
}}

>


Delete


  </button>

</div>

  <div style={{color:'#4ade80', fontWeight:'bold'}}>
    ⛳
  </div>
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