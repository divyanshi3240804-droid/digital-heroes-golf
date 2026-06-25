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
const [currentJackpot, setCurrentJackpot] = useState(1000)
const [winnings, setWinnings] = useState([])
const [editingProfile, setEditingProfile] = useState(false)
const [proofFile, setProofFile] = useState(null)
const [editName, setEditName] = useState('')
const [scoreMessage, setScoreMessage] = useState('')
const [proofMessage, setProofMessage] = useState('')
const [fileMessage, setFileMessage] = useState('')
const [deleteMessage, setDeleteMessage] = useState('')
  const [profile, setProfile] = useState(null)
  const { getResponsive } = useResponsive()

useEffect(() => {
  getUser()
}, [])

useEffect(() => {
  const params = new URLSearchParams(window.location.search)

  const success = params.get('success')
  const plan = params.get('plan')

  if (success === 'true' && plan) {
    setTimeout(() => {
      subscribeManualAfterStripe(plan)
    }, 1000)
  }
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
  


const subscribeManualAfterStripe = async (plan) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const endDate = new Date()

  if (plan === 'monthly') {
    endDate.setMonth(endDate.getMonth() + 1)
  }

  if (plan === 'yearly') {
    endDate.setFullYear(endDate.getFullYear() + 1)
  }

  await supabase
    .from('profiles')
    .update({
      subscription_status: 'active',
      subscription_plan: plan,
      subscription_end_date: endDate.toISOString()
    })
    .eq('id', user.id)

  window.history.replaceState({}, '', '/dashboard')
  getProfile(user.id)
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
  setProfile(data)
  if (
  data.subscription_end_date &&
  new Date(data.subscription_end_date) < new Date()
) {
  await supabase
    .from('profiles')
    .update({
      subscription_status: 'expired'
    })
    .eq('id', userId)

  data.subscription_status = 'expired'
}
  setEditName(data.full_name || '')
}
}
const subscribePlan = async (plan) => {
  try {
    setMessage('Redirecting to payment...')

    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        plan,
        userId: user.id,
        email: user.email
      })
    })

    const data = await response.json()

    if (data.error) {
      setMessage(data.error)
      return
    }

    window.location.href = data.url
  } catch (error) {
    setMessage(error.message)
  }
}




const getDraws = async () => {
 
  const { data } = await supabase
    .from('draws')
    .select('*')
    .order('created_at', { ascending: false })

  if (data) {
    setDraws(data)

    if (data.length > 0) {
      setCurrentJackpot(
        (data[0].jackpot_amount || 1000) +
        (data[0].rollover_amount || 0)
      )
    }
  }
}
const getWinnings = async (userId) => {
  const { data } = await supabase
    .from('winners')
    .select('*')
    .eq('user_id', userId)

  if (data) setWinnings(data)
}

  const addScore = async () => {
    if (profile?.subscription_status !== 'active') {
  setScoreMessage('Active subscription required to add scores.')
  return
}
if (!newScore || !newDate) {
setScoreMessage('Please enter both score and date!')
return
}

if (newScore < 1 || newScore > 45) {
setScoreMessage('Score must be between 1 and 45!')
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
setScoreMessage(
'A score already exists for this date. Please edit the existing score instead.'
)
} else {
setMessage(error.message)
}
} else {
setScoreMessage('Score added successfully!')
setNewScore('')
setNewDate('')
const { data: allScores } = await supabase
  .from('scores')
  .select('*')
  .eq('user_id', user.id)
  .order('date', { ascending: false })

if (allScores && allScores.length > 5) {
  const oldScores = allScores.slice(5)

  for (const oldScore of oldScores) {
    await supabase
      .from('scores')
      .delete()
      .eq('id', oldScore.id)
  }
}
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
setDeleteMessage('Score deleted successfully!')
getScores(user.id)
}
}
const updateScore = async (scoreId) => {
if (!editScore || !editDate) {
setScoreMessage('Please enter both score and date!')
return
}

if (editScore < 1 || editScore > 45) {
setScoreMessage('Score must be between 1 and 45!')
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
setScoreMessage('A score already exists for this date.')
} else {
setMessage(error.message)
}
} else {
setScoreMessage('Score updated successfully!')
setEditingId(null)
setEditScore('')
setEditDate('')
getScores(user.id)
}
}
const uploadWinnerProof = async () => {
if (profile?.subscription_status !== 'active') {
  setProofMessage('Active subscription required.')
  return
}
  if (!proofFile) {
    setFileMessage('Please choose a proof file first.')
    return
  }

  if (winnings.length === 0) {
    setProofMessage('No winnings found for proof upload.')
    return
  }

  const winnerId = winnings[0].id
  const safeFileName = proofFile.name.replace(/[^a-zA-Z0-9.]/g, '-')
const filePath = `${user.id}/${winnerId}-${Date.now()}-${safeFileName}`
  const { error: uploadError } = await supabase.storage
    .from('winner-proofs')
    .upload(filePath, proofFile, { upsert: true })

  if (uploadError) {
    setMessage(uploadError.message)
    return
  }

  const { data } = supabase.storage
    .from('winner-proofs')
    .getPublicUrl(filePath)

  const publicUrl = data.publicUrl

  const { error: proofError } = await supabase
    .from('winner_proofs')
    .insert({
      winner_id: winnerId,
      user_id: user.id,
      proof_url: publicUrl,
      status: 'pending'
    })

  if (proofError) {
    setMessage(proofError.message)
    return
  }

  const { error: winnerError } = await supabase
    .from('winners')
    .update({
      proof_url: publicUrl,
      verification_status: 'pending'
    })
    .eq('id', winnerId)

  if (winnerError) {
    setMessage(winnerError.message)
    return
  }

  setProofMessage('Winner proof uploaded successfully!')
setProofFile(null)
getWinnings(user.id)
document.getElementById('proofFileInput').value = ''
setTimeout(() => {
  setMessage('')
}, 3000)
}

const updateProfile = async () => {
  const { error } = await supabase
    .from('profiles')
    .update({
      full_name: editName
    })
    .eq('id', user.id)

  if (error) {
    setMessage(error.message)
  } else {
    setMessage('Profile updated successfully!')
    getProfile(user.id)
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
          <div style={{
  background:'linear-gradient(135deg,#4ade80,#16a34a)',
  color:'#000',
  padding:'20px',
  borderRadius:'16px',
  marginTop:'20px',
  marginBottom:'24px'
}}>
  <h2 style={{marginBottom:'8px'}}>
    Welcome Back Champion 🏆
  </h2>

  <p>
    Track scores, support your charity and compete in monthly prize draws.
  </p>
</div>
          <p style={{color: '#9ca3af', marginTop: getResponsive('4px', '6px', '8px', '8px', '8px', '8px'), fontSize: getResponsive('0.85rem', '0.9rem', '0.95rem', '1rem', '1rem', '1rem')}}>Track your scores and manage your account</p>
        </div>


<div style={{
  backgroundColor:'#111',
  padding:'24px',
  borderRadius:'16px',
  border:'1px solid #1f2937',
  marginBottom:'24px'
}}>
  <h2 style={{
    fontSize:'1.1rem',
    fontWeight:'bold',
    marginBottom:'12px'
  }}>
    ⚙️ Profile Settings
  </h2>

  {!editingProfile ? (
    <>
      <p style={{
        color:'#9ca3af',
        marginBottom:'12px'
      }}>
        Full Name: <span style={{color:'#fff'}}>
          {profile?.full_name || 'Not set'}
        </span>
      </p>

      <button
        onClick={() => setEditingProfile(true)}
        style={{
          backgroundColor:'#3b82f6',
          color:'#fff',
          border:'none',
          padding:'10px 16px',
          borderRadius:'8px',
          cursor:'pointer'
        }}
      >
        Edit Profile
      </button>
    </>
  ) : (
    <>
      <input
        type="text"
        value={editName}
        onChange={(e) => setEditName(e.target.value)}
        placeholder="Full Name"
        style={{
          width:'100%',
          padding:'12px',
          backgroundColor:'#000',
          border:'1px solid #1f2937',
          borderRadius:'8px',
          color:'#fff',
          marginBottom:'12px',
          boxSizing:'border-box'
        }}
      />

      <div style={{
        display:'flex',
        gap:'10px',
        flexWrap:'wrap'
      }}>
        <button
          onClick={async () => {
            await updateProfile()
            setEditingProfile(false)
          }}
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
          Save Changes
        </button>

        <button
          onClick={() => setEditingProfile(false)}
          style={{
            backgroundColor:'#6b7280',
            color:'#fff',
            border:'none',
            padding:'10px 16px',
            borderRadius:'8px',
            cursor:'pointer'
          }}
        >
          Cancel
        </button>
      </div>
    </>
  )}
</div>
 
        {/* STATS */}
        <div style={{display: 'grid', gridTemplateColumns: getResponsive('1fr', '1fr', '1fr', '1fr', 'repeat(3, 1fr)', 'repeat(3, 1fr)'), gap: getResponsive('12px', '14px', '16px', '20px', '24px', '24px'), marginBottom: getResponsive('24px', '28px', '32px', '36px', '40px', '40px')}}>
          <div style={{backgroundColor: '#111', padding: getResponsive('14px', '16px', '18px', '20px', '24px', '24px'), borderRadius: '16px', border: '1px solid #1f2937',boxShadow: '0 0 20px rgba(74, 222, 128, 0.08)',
transition: 'all 0.3s ease'}}>
            <p style={{color: '#9ca3af', fontSize: getResponsive('0.7rem', '0.75rem', '0.8rem', '0.85rem', '0.85rem', '0.85rem'), marginBottom: getResponsive('4px', '6px', '8px', '8px', '8px', '8px')}}>TOTAL SCORES</p>
            <p style={{fontSize: getResponsive('1.5rem', '1.6rem', '1.8rem', '1.9rem', '2rem', '2rem'), fontWeight: 'bold', color: '#4ade80'}}>{scores.length}</p>
          </div>
          <div style={{backgroundColor: '#111', padding: getResponsive('14px', '16px', '18px', '20px', '24px', '24px'), borderRadius: '16px', border: '1px solid #1f2937',boxShadow: '0 0 20px rgba(74, 222, 128, 0.08)',
transition: 'all 0.3s ease'}}>
            <p style={{color: '#9ca3af', fontSize: getResponsive('0.7rem', '0.75rem', '0.8rem', '0.85rem', '0.85rem', '0.85rem'), marginBottom: getResponsive('4px', '6px', '8px', '8px', '8px', '8px')}}>BEST SCORE</p>
            <p style={{fontSize: getResponsive('1.5rem', '1.6rem', '1.8rem', '1.9rem', '2rem', '2rem'), fontWeight: 'bold', color: '#4ade80'}}>{scores.length > 0 ? Math.max(...scores.map(s => s.score)) : '-'}</p>
          </div>
          <div style={{backgroundColor: '#111', padding: getResponsive('14px', '16px', '18px', '20px', '24px', '24px'), borderRadius: '16px', border: '1px solid #1f2937',boxShadow: '0 0 20px rgba(74, 222, 128, 0.08)',
transition: 'all 0.3s ease'}}>
            <p style={{color: '#9ca3af', fontSize: getResponsive('0.7rem', '0.75rem', '0.8rem', '0.85rem', '0.85rem', '0.85rem'), marginBottom: getResponsive('4px', '6px', '8px', '8px', '8px', '8px')}}>SUBSCRIPTION</p>
            <div style={{
  backgroundColor: '#111',
  padding: getResponsive('14px', '16px', '18px', '20px', '24px', '24px'),
  borderRadius: '16px',
  border: '1px solid #1f2937'
}}>
   <p style={{
    fontWeight:'bold',
    letterSpacing:'2px'
  }}>
    CURRENT JACKPOT
  </p>

  <p style={{
    fontSize: getResponsive('1.5rem', '1.6rem', '1.8rem', '1.9rem', '2rem', '2rem'),
    fontWeight: 'bold',
    color: '#4ade80'
  }}>
    £{currentJackpot}
  </p>
</div>
            <p style={{fontSize: getResponsive('0.95rem', '1rem', '1.05rem', '1.1rem', '1.2rem', '1.2rem'), fontWeight: 'bold', color: '#f59e0b'}}>
<span style={{
  color:
    profile?.subscription_status === 'active'
      ? '#4ade80'
      : profile?.subscription_status === 'expired'
      ? '#ef4444'
      : '#f59e0b'
}}>
  {profile?.subscription_status
    ? profile.subscription_status.charAt(0).toUpperCase() + profile.subscription_status.slice(1)
    : 'Inactive'}
</span>
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
{profile?.subscription_status === 'active' && (
  <button
    onClick={async () => {
      const { error } = await supabase
        .from('profiles')
        .update({
          subscription_status: 'cancelled'
        })
        .eq('id', user.id)

      if (!error) {
        setMessage('Subscription cancelled.')
        getProfile(user.id)
      }
    }}
    style={{
      backgroundColor:'#ef4444',
      color:'#fff',
      border:'none',
      padding:'8px 12px',
      borderRadius:'8px',
      marginTop:'10px',
      cursor:'pointer'
    }}
  >
    Cancel Subscription
  </button>
)}
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
  <select
  value={profile?.charity_percentage || 10}
  onChange={async (e) => {
    const value = Number(e.target.value)

    const { error } = await supabase
      .from('profiles')
      .update({
        charity_percentage: value
      })
      .eq('id', user.id)

    if (!error) {
      setProfile({
        ...profile,
        charity_percentage: value
      })
    }
  }}
  style={{
    marginTop:'10px',
    width:'100%',
    padding:'8px',
    backgroundColor:'#000',
    color:'#fff',
    border:'1px solid #1f2937',
    borderRadius:'8px'
  }}
>
  <option value="10">10%</option>
  <option value="15">15%</option>
  <option value="20">20%</option>
  <option value="25">25%</option>
  <option value="30">30%</option>
</select>
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
   {profile?.subscription_status === 'active' && (
 <div style={{
  background:'linear-gradient(135deg,#111,#1f2937)',
  padding:'24px',
  borderRadius:'20px',
  border:'1px solid #374151',
  marginBottom:'24px'
}}>
  <h2 style={{fontSize:'1.3rem', fontWeight:'bold', marginBottom:'8px'}}>
    📤 Upload Verification Proof
  </h2>

  <p style={{color:'#9ca3af', marginBottom:'16px'}}>
    Upload a screenshot or PDF to verify your winning score.
  </p>

  <input
    id="proofFileInput"
    type="file"
    accept="image/*,.pdf"
    onChange={(e) => setProofFile(e.target.files[0])}
    style={{
      display:'block',
      marginBottom:'16px',
      color:'#fff',
      backgroundColor:'#000',
      padding:'12px',
      borderRadius:'10px',
      border:'1px solid #374151',
      width:'100%',
      boxSizing:'border-box'
    }}
  />

  <button
    onClick={uploadWinnerProof}
    style={{
      backgroundColor:'#4ade80',
      color:'#000',
      border:'none',
      padding:'12px 18px',
      borderRadius:'10px',
      fontWeight:'bold',
      cursor:'pointer'
    }}
  >
    Upload Proof →
  </button>
</div>
)}
 {proofMessage && (
  <div style={{backgroundColor: '#1f2937', padding: getResponsive('8px', '9px', '10px', '11px', '12px', '12px'), borderRadius: '8px', marginBottom: getResponsive('10px', '12px', '14px', '16px', '16px', '16px'), color: '#4ade80', fontSize: getResponsive('0.7rem', '0.75rem', '0.8rem', '0.85rem', '0.85rem', '0.85rem')}}>
    {proofMessage}
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
     
{draws.length > 0 && (
  <div style={{
  background:'linear-gradient(135deg,#111,#1f2937)',
  padding:'24px',
  borderRadius:'20px',
  border:'1px solid #4ade80',
  marginBottom:'24px'
}}>
    <h2 style={{
  fontSize:'1.3rem',
  fontWeight:'bold',
  marginBottom:'12px',
  color:'#4ade80'
}}>
  🎰 Official Draw Results
</h2>

    <p style={{color:'#9ca3af', marginBottom:'12px'}}>
      {new Date(draws[0].draw_date).toLocaleDateString()}
    </p>

    <div
      style={{
        display:'flex',
        gap:'8px',
        flexWrap:'wrap'
      }}
    >
      <h2 style={{
        backgroundColor:'#3b82f6',
  color:'#fff',
  marginBottom:'12px',
  marginTop:'12px',
  fontStyle:'italic',
  fontWeight:'bold',

}}>
  
  "Official Winning Numbers...            "
</h2>



      {draws[0].winning_numbers.map((num, i) => (
        <div
          key={i}
          style={{
  backgroundColor:'#ef4444',
  color:'#fff',
  width:'48px',
  height:'48px',
  borderRadius:'50%',
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  fontWeight:'bold',
  fontSize:'1rem'
}}
        >
          {num}
        </div>
      ))}
    </div>

    <p
      style={{
        color:'#9ca3af',
        marginTop:'12px'
      }}
    >
      Status: {draws[0].status}
    </p>
  </div>
)}
{profile?.subscription_status !== 'active' && (
  <div style={{
    backgroundColor:'#451a03',
    border:'1px solid #f59e0b',
    color:'#fef3c7',
    padding:'16px',
    borderRadius:'12px',
    marginBottom:'20px'
  }}>
    ⚠️ Active subscription required to add scores, enter draws, and upload winner proof.
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
        {scoreMessage && (
  <div style={{backgroundColor: '#1f2937', padding: getResponsive('8px', '9px', '10px', '11px', '12px', '12px'), borderRadius: '8px', marginBottom: getResponsive('10px', '12px', '14px', '16px', '16px', '16px'), color: '#4ade80', fontSize: getResponsive('0.7rem', '0.75rem', '0.8rem', '0.85rem', '0.85rem', '0.85rem')}}>
    {scoreMessage}
  </div>
)}

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