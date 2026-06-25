'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function Admin() {
  const [users, setUsers] = useState([])
  const [scores, setScores] = useState([])
  const [charities, setCharities] = useState([])
  const [draws, setDraws] = useState([])
  const [winners, setWinners] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('users')
  const [newCharity, setNewCharity] = useState({ name: '', description: '' })
  const [drawResult, setDrawResult] = useState(null)
  const [simulatedNumbers, setSimulatedNumbers] = useState([])
  const [prizePool, setPrizePool] = useState(0)
  const [editingCharity, setEditingCharity] = useState(null)
const [editCharityName, setEditCharityName] = useState('')
const [editCharityImage, setEditCharityImage] = useState('')
const [editCharityCategory, setEditCharityCategory] = useState('')
const [editCharityEvent, setEditCharityEvent] = useState('')
const [editCharityDescription, setEditCharityDescription] = useState('')
const [charityTotal, setCharityTotal] = useState(0)
const [prizesAwarded, setPrizesAwarded] = useState(0)
const [charityRaised, setCharityRaised] = useState(0)
const [editingScoreId, setEditingScoreId] = useState(null)
const [adminEditScore, setAdminEditScore] = useState('')
const [adminEditDate, setAdminEditDate] = useState('')
  const [message, setMessage] = useState('')
  const [screenSize, setScreenSize] = useState('desktop')

  useEffect(() => {
    fetchAll()
   
  }, [])

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      if (width < 640) setScreenSize('mobile')
      else if (width < 1024) setScreenSize('tablet')
      else setScreenSize('desktop')
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const fetchAll = async () => {
    const {
  data: { user }
} = await supabase.auth.getUser()

if (!user) {
  window.location.href = '/login'
  return
}

const { data: profile } = await supabase
  .from('profiles')
  .select('role')
  .eq('id', user.id)
  .single()
  console.log('Logged in user:', user.email)
console.log('Profile:', profile)

if (!profile || profile.role !== 'admin') {
  window.location.href = '/dashboard'
  return
}
    const { data: usersData } = await supabase.from('profiles').select('*')
    const { data: scoresData } = await supabase.from('scores').select('*')
    const { data: charitiesData } = await supabase.from('charities').select('*')
    const { data: drawsData } = await supabase.from('draws').select('*')
const { data: winnersData } = await supabase
  .from('winners')
  .select(`
    *,
    profiles (
      full_name,
      email
    )
  `)
    if (usersData) setUsers(usersData)
    if (scoresData) setScores(scoresData)
    if (charitiesData) setCharities(charitiesData)
    if (drawsData) setDraws(drawsData)
if (usersData) {
  const activeUsers = usersData.filter(
    u => u.subscription_status === 'active'
  )

  setPrizePool(activeUsers.length * 10)
  setCharityTotal(activeUsers.length * 1)

  setCharityRaised((activeUsers.length * 1).toFixed(2))
}

if (winnersData) {
  setWinners(winnersData)

  const totalPrizes = winnersData.reduce(
    (sum, winner) => sum + (winner.prize_amount || 0),
    0
  )

  setPrizesAwarded(totalPrizes)
}
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

 const updateCharity = async () => {
  const { error } = await supabase
    .from('charities')
    .update({
      name: editCharityName,
      description: editCharityDescription,
      image_url: editCharityImage,
      category: editCharityCategory,
      upcoming_event: editCharityEvent
    })
    .eq('id', editingCharity)

  if (error) {
    setMessage(error.message)
  } else {
    setMessage('Charity updated successfully!')
    setEditingCharity(null)
    fetchAll()
  }
}
  

const updateAdminScore = async (scoreId) => {
  if (!adminEditScore || !adminEditDate) {
    setMessage('Please enter score and date')
    return
  }

  if (adminEditScore < 1 || adminEditScore > 45) {
    setMessage('Score must be between 1 and 45')
    return
  }

  const { error } = await supabase
    .from('scores')
    .update({
      score: parseInt(adminEditScore),
      date: adminEditDate
    })
    .eq('id', scoreId)

  if (error) {
    setMessage(error.message)
  } else {
    setMessage('Score updated successfully!')
    setEditingScoreId(null)
    setAdminEditScore('')
    setAdminEditDate('')
    fetchAll()
  }
}


 const runDraw = async () => {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString()

  const { data: existingDraw } = await supabase
    .from('draws')
    .select('*')
    .gte('draw_date', startOfMonth)
    .lt('draw_date', endOfMonth)
    .limit(1)
    .maybeSingle()

  if (existingDraw) {
    setMessage('Official draw already completed for this month.')
    return
  }

  const { data: lastDraw } = await supabase
    .from('draws')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()
    const { data: activeUsers } = await supabase
  .from('profiles')
  .select('id')
  .eq('subscription_status', 'active')
  const subscriberPool =
  (activeUsers?.length || 0) * 10

const currentJackpot =
  subscriberPool +
  (lastDraw?.rollover_amount || 0)

  const winningNumbers = []

  while (winningNumbers.length < 5) {
    const num = Math.floor(Math.random() * 45) + 1

    if (!winningNumbers.includes(num)) {
      winningNumbers.push(num)
    }
  }

  winningNumbers.sort((a, b) => a - b)

  const { data: drawData, error } = await supabase
    .from('draws')
    .insert([{
      winning_numbers: winningNumbers,
      status: 'completed',
      jackpot_amount: currentJackpot,
      draw_date: new Date().toISOString()
    }])
    .select()
    .single()

  if (error) {
    setMessage(error.message)
    return
  }

  
  const tierWinners = {
    '5 Match': [],
    '4 Match': [],
    '3 Match': []
  }

  for (const activeUser of activeUsers || []) {
    const { data: userScores } = await supabase
      .from('scores')
      .select('score')
      .eq('user_id', activeUser.id)
      .order('created_at', { ascending: false })
      .limit(5)

    if (!userScores || userScores.length < 5) continue

    const userNumbers = userScores.map((s) => Number(s.score))

    const matches = userNumbers.filter((num) =>
      winningNumbers.includes(num)
    ).length

    let matchType = null

    if (matches === 5) {
      matchType = '5 Match'
    } else if (matches === 4) {
      matchType = '4 Match'
    } else if (matches === 3) {
      matchType = '3 Match'
    }

    if (matchType) {
      tierWinners[matchType].push({
        user_id: activeUser.id,
        match_type: matchType
      })
    }
  }

  const fivePool = currentJackpot * 0.40
  const fourPool = currentJackpot * 0.35
  const threePool = currentJackpot * 0.25

  const fivePrize =
    tierWinners['5 Match'].length > 0
      ? fivePool / tierWinners['5 Match'].length
      : 0

  const fourPrize =
    tierWinners['4 Match'].length > 0
      ? fourPool / tierWinners['4 Match'].length
      : 0

  const threePrize =
    tierWinners['3 Match'].length > 0
      ? threePool / tierWinners['3 Match'].length
      : 0

  for (const winner of tierWinners['5 Match']) {
    await supabase.from('winners').insert({
      draw_id: drawData.id,
      user_id: winner.user_id,
      match_type: '5 Match',
      prize_amount: fivePrize,
      payment_status: 'pending',
      verification_status: 'pending',
      proof_url: 'pending'
    })
  }

  for (const winner of tierWinners['4 Match']) {
    await supabase.from('winners').insert({
      draw_id: drawData.id,
      user_id: winner.user_id,
      match_type: '4 Match',
      prize_amount: fourPrize,
      payment_status: 'pending',
      verification_status: 'pending',
      proof_url: 'pending'
    })
  }

  for (const winner of tierWinners['3 Match']) {
    await supabase.from('winners').insert({
      draw_id: drawData.id,
      user_id: winner.user_id,
      match_type: '3 Match',
      prize_amount: threePrize,
      payment_status: 'pending',
      verification_status: 'pending',
      proof_url: 'pending'
    })
  }

  if (tierWinners['5 Match'].length === 0) {
    await supabase
      .from('draws')
      .update({
        rollover_amount: fivePool
      })
      .eq('id', drawData.id)
  }

  setDrawResult(winningNumbers)
  setMessage('Draw completed successfully with prize calculation!')
  fetchAll()
}

const publishDraw = async (drawId) => {
  const { error } = await supabase
    .from('draws')
    .update({
      status: 'published'
    })
    .eq('id', drawId)

  if (error) {
    setMessage(error.message)
  } else {
    setMessage('Draw published successfully!')

    for (const user of users) {
  if (user.email) {
    await fetch('/api/send-email', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        to: user.email,
        subject: 'Draw Results Published',
        message: 'The latest GolfHeroes draw results have been published. Check your dashboard for details.'
      })
    })
  }
}

    const userEmail = users.find(u => u.id === userId)?.email

if (userEmail) {
  await fetch('/api/send-email', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      to: userEmail,
      subject: `Subscription ${status}`,
      message: `Your subscription status has been updated to ${status}${plan ? ` (${plan})` : ''}.`
    })
  })
}

    fetchAll()
  }
}
 const updateSubscription = async (userId, status, plan = null) => {
  const updateData = {
    subscription_status: status
  }

  if (plan) {
    updateData.subscription_plan = plan
  }

  const { error } = await supabase
    .from('profiles')
    .update(updateData)
    .eq('id', userId)

  if (error) {
    setMessage(error.message)
  } else {
    setMessage('Subscription updated successfully!')
    fetchAll()
  }
}
const simulateDraw = () => {
  const numbers = []

  while (numbers.length < 5) {
    const num = Math.floor(Math.random() * 45) + 1

    if (!numbers.includes(num)) {
      numbers.push(num)
    }
  }

  numbers.sort((a, b) => a - b)
  setSimulatedNumbers(numbers)
}
  const updateWinnerStatus = async (winnerId, field, value,email) => {
  const { error } = await supabase
    .from('winners')
    .update({
      [field]: value
    })
    .eq('id', winnerId)

  if (error) {
    setMessage(error.message)
  } else {
    console.log('Creating notification...')
    console.log('Winner email:', email)
    await supabase.from('notifications').insert({
  type: 'winner_alert',
  subject: `Winner ${value}`,
  message: `Your winner verification status has been updated to ${value}.`,
  status: 'pending'
})
const emailResponse = await fetch('/api/send-email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    to: email,
    subject: `Winner ${value}`,
    message: `Your winner verification status has been updated to ${value}.`
  })
})

const emailData = await emailResponse.json()
console.log('Email response:', emailData)
    setMessage('Winner updated successfully!')
    fetchAll()
  }
}
const runAlgorithmicDraw = async () => {
  const { data: allScores } = await supabase
    .from('scores')
    .select('score')

  if (!allScores || allScores.length === 0) {
    setMessage('No scores available for algorithmic draw.')
    return
  }

  const frequency = {}

  allScores.forEach((item) => {
    const score = Number(item.score)
    frequency[score] = (frequency[score] || 0) + 1
  })

  const sortedScores = Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .map(([score]) => Number(score))

  const winningNumbers = sortedScores.slice(0, 5)

  while (winningNumbers.length < 5) {
    const num = Math.floor(Math.random() * 45) + 1
    if (!winningNumbers.includes(num)) {
      winningNumbers.push(num)
    }
  }

  setSimulatedNumbers(winningNumbers.sort((a, b) => a - b))
  setMessage('Algorithmic draw simulation generated.')
}

  const tabStyle = (tab) => ({
    padding: screenSize === 'mobile' ? '8px 12px' : screenSize === 'tablet' ? '9px 18px' : '10px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: screenSize === 'mobile' ? '0.7rem' : screenSize === 'tablet' ? '0.8rem' : '0.9rem',
    backgroundColor: activeTab === tab ? '#4ade80' : '#1f2937',
    color: activeTab === tab ? '#000' : '#fff'
  })

  const getResponsive = (mobile, tablet, desktop) => {
    if (screenSize === 'mobile') return mobile
    if (screenSize === 'tablet') return tablet
    return desktop
  }

  if (loading) return (
    <div style={{minHeight: '100vh', backgroundColor: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif'}}>
      <p>Loading Admin Panel...</p>
    </div>
  )

  return (
    <main style={{minHeight: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: 'sans-serif'}}>
      
      {/* NAVBAR */}
      <nav style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: getResponsive('12px 10px', '16px 20px', '24px 48px'), borderBottom: '1px solid #1f2937', flexWrap: 'wrap', gap: getResponsive('8px', '10px', '12px')}}>
        <div style={{fontSize: getResponsive('0.9rem', '1.2rem', '1.5rem'), fontWeight: 'bold', color: '#4ade80'}}>GolfHeroes ⛳ Admin</div>
        <a href="/dashboard" style={{color: '#9ca3af', textDecoration: 'none', fontSize: getResponsive('0.75rem', '0.9rem', '1rem')}}>← User Dashboard</a>
      </nav>

      <div style={{maxWidth: '1100px', margin: '0 auto', padding: getResponsive('16px 10px', '32px 20px', '48px 24px')}}>

        <h1 style={{fontSize: getResponsive('1.2rem', '1.6rem', '2rem'), fontWeight: 'bold', marginBottom: getResponsive('4px', '6px', '8px')}}>Admin Dashboard 🛠️</h1>
        <p style={{color: '#9ca3af', marginBottom: getResponsive('24px', '32px', '40px'), fontSize: getResponsive('0.75rem', '0.9rem', '1rem')}}>Manage users, charities, draws and more</p>

        {/* STATS */}
        <div style={{display: 'grid', gridTemplateColumns: getResponsive('1fr', 'repeat(2, 1fr)', 'repeat(4, 1fr)'), gap: getResponsive('12px', '14px', '16px'), marginBottom: getResponsive('24px', '32px', '40px')}}>
          <div style={{backgroundColor: '#111', padding: getResponsive('16px', '20px', '24px'), borderRadius: '16px', border: '1px solid #1f2937', textAlign: 'center'}}>
            <p style={{color: '#9ca3af', fontSize: getResponsive('0.7rem', '0.75rem', '0.8rem'), marginBottom: getResponsive('4px', '6px', '8px')}}>TOTAL USERS</p>
            <p style={{fontSize: getResponsive('1.5rem', '2rem', '2.5rem'), fontWeight: 'bold', color: '#4ade80'}}>{users.length}</p>
          </div>
          <div style={{backgroundColor: '#111', padding: getResponsive('16px', '20px', '24px'), borderRadius: '16px', border: '1px solid #1f2937', textAlign: 'center'}}>
            <p style={{color: '#9ca3af', fontSize: getResponsive('0.7rem', '0.75rem', '0.8rem'), marginBottom: getResponsive('4px', '6px', '8px')}}>TOTAL SCORES</p>
            <p style={{fontSize: getResponsive('1.5rem', '2rem', '2.5rem'), fontWeight: 'bold', color: '#4ade80'}}>{scores.length}</p>
          </div>
          <div style={{backgroundColor: '#111', padding: getResponsive('16px', '20px', '24px'), borderRadius: '16px', border: '1px solid #1f2937', textAlign: 'center'}}>
            <p style={{color: '#9ca3af', fontSize: getResponsive('0.7rem', '0.75rem', '0.8rem'), marginBottom: getResponsive('4px', '6px', '8px')}}>CHARITIES</p>
            <p style={{fontSize: getResponsive('1.5rem', '2rem', '2.5rem'), fontWeight: 'bold', color: '#4ade80'}}>{charities.length}</p>
          </div>
          <div style={{backgroundColor: '#111', padding: getResponsive('16px', '20px', '24px'), borderRadius: '16px', border: '1px solid #1f2937', textAlign: 'center'}}>
            <p style={{color: '#9ca3af', fontSize: getResponsive('0.7rem', '0.75rem', '0.8rem'), marginBottom: getResponsive('4px', '6px', '8px')}}>DRAWS RUN</p>
            <p style={{fontSize: getResponsive('1.5rem', '2rem', '2.5rem'), fontWeight: 'bold', color: '#4ade80'}}>{draws.length}</p>
          </div>
        </div>
        <div style={{backgroundColor:'#111', padding:getResponsive('16px','20px','24px'), borderRadius:'16px', border:'1px solid #1f2937', textAlign:'center'}}>
  <p style={{color:'#9ca3af', fontSize:getResponsive('0.7rem','0.75rem','0.8rem'), marginBottom:'8px'}}> ESTIMATED PRIZE POOL</p>
  <p style={{fontSize:getResponsive('1.5rem','2rem','2.5rem'), fontWeight:'bold', color:'#4ade80'}}>
    £{prizePool}
  </p>
</div>

<div style={{backgroundColor:'#111', padding:getResponsive('16px','20px','24px'), borderRadius:'16px', border:'1px solid #1f2937', textAlign:'center'}}>
  <p style={{color:'#9ca3af', fontSize:getResponsive('0.7rem','0.75rem','0.8rem'), marginBottom:'8px'}}> ESTIMATED CHARITY TOTAL</p>
  <p style={{fontSize:getResponsive('1.5rem','2rem','2.5rem'), fontWeight:'bold', color:'#4ade80'}}>
    £{charityTotal}
  </p>
</div>
<div style={{backgroundColor:'#111', padding:getResponsive('16px','20px','24px'), borderRadius:'16px', border:'1px solid #1f2937', textAlign:'center'}}>
  <p style={{color:'#9ca3af', marginBottom:'8px'}}>
    PRIZES AWARDED
  </p>

  <p style={{fontSize:getResponsive('1.5rem','2rem','2.5rem'), fontWeight:'bold', color:'#4ade80'}}>
    £{prizesAwarded}
  </p>
</div>

<div style={{backgroundColor:'#111', padding:getResponsive('16px','20px','24px'), borderRadius:'16px', border:'1px solid #1f2937', textAlign:'center'}}>
  <p style={{color:'#9ca3af', marginBottom:'8px'}}>
    CHARITY RAISED
  </p>

  <p style={{fontSize:getResponsive('1.5rem','2rem','2.5rem'), fontWeight:'bold', color:'#4ade80'}}>
    £{charityRaised}
  </p>
</div>

        {/* TABS */}
        <div style={{display: 'flex', gap: getResponsive('8px', '10px', '12px'), marginBottom: getResponsive('24px', '28px', '32px'), flexWrap: 'wrap'}}>
          <button style={tabStyle('users')} onClick={() => setActiveTab('users')}>Users</button>
          <button style={tabStyle('charities')} onClick={() => setActiveTab('charities')}>Charities</button>
          <button style={tabStyle('draws')} onClick={() => setActiveTab('draws')}>Draw System</button>
          <button style={tabStyle('scores')} onClick={() => setActiveTab('scores')}>Scores</button>
          <button style={tabStyle('winners')} onClick={() => setActiveTab('winners')}>Winners</button>
        </div>

        {message && (
          <div style={{backgroundColor: '#1f2937', padding: getResponsive('10px', '11px', '12px'), borderRadius: '8px', marginBottom: getResponsive('16px', '20px', '24px'), color: '#4ade80', fontSize: getResponsive('0.8rem', '0.9rem', '1rem')}}>
            {message}
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === 'users' && (
          <div style={{backgroundColor: '#111', borderRadius: '16px', border: '1px solid #1f2937', overflow: 'hidden'}}>
            <div style={{padding: getResponsive('16px', '20px', '24px'), borderBottom: '1px solid #1f2937'}}>
              <h2 style={{fontSize: getResponsive('1rem', '1.1rem', '1.2rem'), fontWeight: 'bold'}}>All Users</h2>
            </div>
            {users.length === 0 ? (
              <p style={{padding: getResponsive('24px', '32px', '40px'), textAlign: 'center', color: '#9ca3af', fontSize: getResponsive('0.8rem', '0.9rem', '1rem')}}>No users yet</p>
            ) : (
              users.map((user) => (
                <div key={user.id} style={{display: 'flex', justifyContent: 'space-between', alignItems: screenSize === 'mobile' ? 'flex-start' : 'center', padding: getResponsive('12px 16px', '14px 20px', '16px 24px'), borderBottom: '1px solid #1f2937', flexWrap: screenSize === 'mobile' ? 'wrap' : 'nowrap', gap: getResponsive('8px', '10px', '12px')}}>
                  <div>
                    <p style={{fontWeight: 'bold', fontSize: getResponsive('0.85rem', '0.95rem', '1rem')}}>{user.full_name || 'No name'}</p>
                    <p style={{color: '#9ca3af', fontSize: getResponsive('0.65rem', '0.7rem', '0.75rem')}}>{user.email}</p>
                  </div>
                 <div style={{textAlign: 'right', marginLeft: 'auto'}}>
  <span
    style={{
      backgroundColor: user.subscription_status === 'active' ? '#4ade80' : '#1f2937',
      color: user.subscription_status === 'active' ? '#000' : '#9ca3af',
      padding: getResponsive('3px 10px', '3px 11px', '4px 12px'),
      borderRadius: '20px',
      fontSize: getResponsive('0.65rem', '0.7rem', '0.75rem'),
      fontWeight: 'bold'
    }}
  >
    {user.subscription_status || 'inactive'}
  </span>

  <div style={{display:'flex', gap:'4px', flexWrap:'wrap', marginTop:'8px', justifyContent:'flex-end'}}>
    <button onClick={() => updateSubscription(user.id, 'active')}>
      Active
    </button>

    <button onClick={() => updateSubscription(user.id, 'inactive')}>
      Inactive
    </button>

    <button onClick={() => updateSubscription(user.id, 'active', 'monthly')}>
      Monthly
    </button>

    <button onClick={() => updateSubscription(user.id, 'active', 'yearly')}>
      Yearly
    </button>
  </div>
</div>
                </div>
              ))
            )}
          </div>
        )}

        {/* CHARITIES TAB */}
        {activeTab === 'charities' && (
          <div>
            <div style={{backgroundColor: '#111', padding: getResponsive('16px', '20px', '24px'), borderRadius: '16px', border: '1px solid #1f2937', marginBottom: getResponsive('16px', '20px', '24px')}}>
              <h2 style={{fontSize: getResponsive('1rem', '1.1rem', '1.2rem'), fontWeight: 'bold', marginBottom: getResponsive('12px', '16px', '20px')}}>Add New Charity</h2>
              <div style={{display: 'grid', gridTemplateColumns: getResponsive('1fr', '1fr', '1fr 1fr'), gap: getResponsive('12px', '14px', '16px'), marginBottom: getResponsive('12px', '14px', '16px')}}>
                <div>
                  <label style={{display: 'block', marginBottom: getResponsive('4px', '5px', '6px'), color: '#9ca3af', fontSize: getResponsive('0.75rem', '0.8rem', '0.85rem')}}>Charity Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Red Cross"
                    value={newCharity.name}
                    onChange={(e) => setNewCharity({...newCharity, name: e.target.value})}
                    style={{width: '100%', padding: getResponsive('10px', '11px', '12px'), backgroundColor: '#000', border: '1px solid #1f2937', borderRadius: '8px', color: '#fff', boxSizing: 'border-box', fontSize: getResponsive('0.8rem', '0.9rem', '1rem')}}
                  />
                </div>
                <div>
                  <label style={{display: 'block', marginBottom: getResponsive('4px', '5px', '6px'), color: '#9ca3af', fontSize: getResponsive('0.75rem', '0.8rem', '0.85rem')}}>Description</label>
                  <input
                    type="text"
                    placeholder="What does this charity do?"
                    value={newCharity.description}
                    onChange={(e) => setNewCharity({...newCharity, description: e.target.value})}
                    style={{width: '100%', padding: getResponsive('10px', '11px', '12px'), backgroundColor: '#000', border: '1px solid #1f2937', borderRadius: '8px', color: '#fff', boxSizing: 'border-box', fontSize: getResponsive('0.8rem', '0.9rem', '1rem')}}
                  />
                </div>
              </div>
              <button onClick={addCharity} style={{backgroundColor: '#4ade80', color: '#000', border: 'none', padding: getResponsive('10px 16px', '11px 20px', '12px 24px'), borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: getResponsive('0.8rem', '0.9rem', '1rem')}}>
                Add Charity →
              </button>
            </div>

            <div style={{backgroundColor: '#111', borderRadius: '16px', border: '1px solid #1f2937', overflow: 'hidden'}}>
              <div style={{padding: getResponsive('16px', '20px', '24px'), borderBottom: '1px solid #1f2937'}}>
                <h2 style={{fontSize: getResponsive('1rem', '1.1rem', '1.2rem'), fontWeight: 'bold'}}>All Charities</h2>
              </div>
              {charities.map((charity) => (
                <div key={charity.id} style={{display: 'flex', justifyContent: 'space-between', alignItems: screenSize === 'mobile' ? 'flex-start' : 'center', padding: getResponsive('12px 16px', '14px 20px', '16px 24px'), borderBottom: '1px solid #1f2937', flexWrap: screenSize === 'mobile' ? 'wrap' : 'nowrap', gap: getResponsive('8px', '10px', '12px')}}>
                  <div style={{flex: 1}}>
                    {editingCharity === charity.id ? (
  <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
  <input
    type="text"
    value={editCharityName}
    onChange={(e) => setEditCharityName(e.target.value)}
    placeholder="Charity Name"
  />
<input
  type="text"
  value={editCharityDescription}
  onChange={(e) => setEditCharityDescription(e.target.value)}
  placeholder="Description"
/>
  <input
    type="text"
    value={editCharityImage}
    onChange={(e) => setEditCharityImage(e.target.value)}
    placeholder="Image URL"
  />

  <input
    type="text"
    value={editCharityCategory}
    onChange={(e) => setEditCharityCategory(e.target.value)}
    placeholder="Category"
  />

  <input
    type="text"
    value={editCharityEvent}
    onChange={(e) => setEditCharityEvent(e.target.value)}
    placeholder="Upcoming Event"
  />
</div>
) : (
  <>
    <p style={{fontWeight:'bold'}}>{charity.name}</p>
    <p style={{color:'#9ca3af'}}>{charity.description}</p>
  </>
)}
                  </div>
                  <button onClick={() => deleteCharity(charity.id)} style={{backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: getResponsive('6px 12px', '7px 14px', '8px 16px'), borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: getResponsive('0.65rem', '0.75rem', '0.85rem')}}>
                    Delete
                  </button>
                  {editingCharity === charity.id ? (
  <button onClick={updateCharity}>Save</button>
) : (
  <button
    onClick={() => {
      setEditingCharity(charity.id || '')
      setEditCharityName(charity.name || '')
      setEditCharityImage(charity.image_url || '')
setEditCharityCategory(charity.category || '')
setEditCharityEvent(charity.upcoming_event || '')
setEditCharityDescription(charity.description || '')
    }}
  
  >
    Edit
  </button>
)}
                </div>

              ))}
            </div>
          </div>
        )}

        {/* DRAWS TAB */}
        {activeTab === 'draws' && (
          <div>
            <div style={{backgroundColor: '#111', padding: getResponsive('20px', '26px', '32px'), borderRadius: '16px', border: '1px solid #1f2937', marginBottom: getResponsive('16px', '20px', '24px'), textAlign: 'center'}}>
              <h2 style={{fontSize: getResponsive('1rem', '1.1rem', '1.3rem'), fontWeight: 'bold', marginBottom: getResponsive('6px', '7px', '8px')}}>Monthly Draw System 🎰</h2>
              <p style={{color: '#9ca3af', marginBottom: getResponsive('20px', '26px', '32px'), fontSize: getResponsive('0.8rem', '0.9rem', '1rem')}}>Run the monthly draw to generate winning numbers</p>
              
              {drawResult && (
                <div style={{backgroundColor: '#000', padding: getResponsive('16px', '20px', '24px'), borderRadius: '12px', marginBottom: getResponsive('16px', '20px', '24px')}}>
                  <p style={{color: '#9ca3af', marginBottom: getResponsive('12px', '14px', '16px'), fontSize: getResponsive('0.8rem', '0.85rem', '0.9rem')}}>Winning Numbers:</p>
                  <div style={{display: 'flex', gap: getResponsive('6px', '8px', '12px'), justifyContent: 'center', flexWrap: 'wrap'}}>
                    {drawResult.map((num, i) => (
                      <div key={i} style={{backgroundColor: '#4ade80', color: '#000', width: getResponsive('36px', '42px', '50px'), height: getResponsive('36px', '42px', '50px'), borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: getResponsive('0.8rem', '1rem', '1.2rem')}}>
                        {num}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
  onClick={simulateDraw}
  style={{
    backgroundColor:'#3b82f6',
    color:'#fff',
    border:'none',
    padding:getResponsive('10px 16px','12px 32px','16px 48px'),
    borderRadius:'12px',
    fontWeight:'bold',
    cursor:'pointer',
    marginRight:'10px'
  }}
>
  🎲 Simulate Draw
</button>
{simulatedNumbers.length > 0 && (
  <div
    style={{
      backgroundColor:'#000',
      padding:'20px',
      borderRadius:'12px',
      marginBottom:'20px'
    }}
  >
    <p style={{color:'#9ca3af', marginBottom:'12px'}}>
      Simulation Result
    </p>

    <div style={{display:'flex', gap:'8px', justifyContent:'center'}}>
      {simulatedNumbers.map((num, i) => (
        <div
          key={i}
          style={{
            backgroundColor:'#3b82f6',
            color:'#fff',
            width:'40px',
            height:'40px',
            borderRadius:'50%',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            fontWeight:'bold'
          }}
        >
          {num}
        </div>
      ))}
    </div>
  </div>
)}
<button
  onClick={runAlgorithmicDraw}
  style={{
    backgroundColor:'#8b5cf6',
    color:'#fff',
    border:'none',
    padding:getResponsive('10px 16px','12px 32px','16px 48px'),
    borderRadius:'12px',
    fontWeight:'bold',
    cursor:'pointer',
    marginRight:'10px'
  }}
>
  🧠 Algorithmic Simulation
</button>
              <button onClick={runDraw} style={{backgroundColor: '#4ade80', color: '#000', border: 'none', padding: getResponsive('10px 16px', '12px 32px', '16px 48px'), borderRadius: '12px', fontWeight: 'bold', fontSize: getResponsive('0.8rem', '0.95rem', '1.1rem'), cursor: 'pointer'}}>
                🎰 Run Draw
              </button>
            </div>

            <div style={{backgroundColor: '#111', borderRadius: '16px', border: '1px solid #1f2937', overflow: 'hidden'}}>
              <div style={{padding: getResponsive('16px', '20px', '24px'), borderBottom: '1px solid #1f2937'}}>
                <h2 style={{fontSize: getResponsive('1rem', '1.1rem', '1.2rem'), fontWeight: 'bold'}}>Draw History</h2>
              </div>
              {draws.length === 0 ? (
                <p style={{padding: getResponsive('24px', '32px', '40px'), textAlign: 'center', color: '#9ca3af', fontSize: getResponsive('0.8rem', '0.9rem', '1rem')}}>No draws yet — run your first draw above!</p>
              ) : (
                draws.map((draw) => (
                  <div key={draw.id} style={{padding: getResponsive('12px 16px', '14px 20px', '16px 24px'), borderBottom: '1px solid #1f2937'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: screenSize === 'mobile' ? 'flex-start' : 'center', flexWrap: screenSize === 'mobile' ? 'wrap' : 'nowrap', gap: getResponsive('8px', '10px', '12px')}}>
                      <div>
                        <p style={{fontWeight: 'bold', fontSize: getResponsive('0.85rem', '0.95rem', '1rem')}}>{new Date(draw.draw_date).toLocaleDateString('en-GB')}</p>
                        <div style={{display: 'flex', gap: getResponsive('3px', '4px', '4px'), marginTop: getResponsive('6px', '7px', '8px'), flexWrap: 'wrap'}}>
                          {draw.winning_numbers.map((num, i) => (
                            <span key={i} style={{backgroundColor: '#4ade80', color: '#000', width: getResponsive('24px', '28px', '32px'), height: getResponsive('24px', '28px', '32px'), borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: getResponsive('0.6rem', '0.75rem', '0.85rem')}}>
                              {num}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span style={{backgroundColor: '#1f2937', color: '#4ade80', padding: getResponsive('3px 10px', '3px 11px', '4px 12px'), borderRadius: '20px', fontSize: getResponsive('0.65rem', '0.7rem', '0.75rem'), fontWeight: 'bold', whiteSpace: 'nowrap'}}>
                        {draw.status}
                        <button
  onClick={() => publishDraw(draw.id)}
  style={{
    backgroundColor:'#4ade80',
    color:'#000',
    border:'none',
    padding:'6px 10px',
    borderRadius:'8px',
    fontWeight:'bold',
    cursor:'pointer',
    marginTop:'8px',
    marginLeft: '10px',
  }}
>
  Publish
</button>
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
            <div style={{padding: getResponsive('16px', '20px', '24px'), borderBottom: '1px solid #1f2937'}}>
              <h2 style={{fontSize: getResponsive('1rem', '1.1rem', '1.2rem'), fontWeight: 'bold'}}>All Scores</h2>
            </div>
            {scores.length === 0 ? (
              <p style={{padding: getResponsive('24px', '32px', '40px'), textAlign: 'center', color: '#9ca3af', fontSize: getResponsive('0.8rem', '0.9rem', '1rem')}}>No scores yet</p>
            ) : (
              scores.map((score) => (
                <div key={score.id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: getResponsive('12px 16px', '14px 20px', '16px 24px'), borderBottom: '1px solid #1f2937', flexWrap: 'wrap', gap: getResponsive('8px', '10px', '12px')}}>
                  {editingScoreId === score.id ? (
  <div>
    <input
      type="number"
      min="1"
      max="45"
      value={adminEditScore}
      onChange={(e) => setAdminEditScore(e.target.value)}
      style={{padding:'6px', marginRight:'8px'}}
    />

    <input
      type="date"
      value={adminEditDate}
      onChange={(e) => setAdminEditDate(e.target.value)}
      style={{padding:'6px'}}
    />
  </div>
) : (
  <div>
    <p style={{fontWeight: 'bold', fontSize: getResponsive('0.85rem', '0.95rem', '1rem')}}>{score.score} points</p>
    <p style={{color: '#9ca3af', fontSize: getResponsive('0.65rem', '0.7rem', '0.75rem')}}>{new Date(score.date).toLocaleDateString('en-GB')}</p>
  </div>
)}

<div style={{display:'flex', gap:'8px', alignItems:'center', flexWrap:'wrap'}}>
  {editingScoreId === score.id ? (
    <>
      <button onClick={() => updateAdminScore(score.id)}>Save</button>
      <button onClick={() => setEditingScoreId(null)}>Cancel</button>
    </>
  ) : (
    <button
      onClick={() => {
        setEditingScoreId(score.id)
        setAdminEditScore(score.score)
        setAdminEditDate(score.date)
      }}
    >
      Edit
    </button>
  )}

  <span style={{color: '#4ade80', fontSize: getResponsive('0.9rem', '1.2rem', '1.5rem')}}>⛳</span>
</div>
                </div>
              ))
            )}
          </div>
        )}
        {/* WINNERS TAB */}
{activeTab === 'winners' && (
  <div style={{backgroundColor: '#111', borderRadius: '16px', border: '1px solid #1f2937', overflow: 'hidden'}}>
    <div style={{padding: getResponsive('16px', '20px', '24px'), borderBottom: '1px solid #1f2937'}}>
      <h2 style={{fontSize: getResponsive('1rem', '1.1rem', '1.2rem'), fontWeight: 'bold'}}>
        Winner Verification
      </h2>
    </div>

    {winners.length === 0 ? (
      <div style={{
  textAlign:'center',
  padding:'40px'
}}>
  <div style={{fontSize:'3rem'}}>🏆</div>
  <h3>No Winners Yet</h3>
  <p style={{color:'#9ca3af'}}>
    Run a draw to generate winners.
  </p>
</div>
    ) : (
      winners.map((winner) => (
        <div key={winner.id} 
        style={{padding: getResponsive('12px 16px', '14px 20px', '16px 24px'), borderBottom: '1px solid #1f2937'}}>
          <p style={{fontWeight:'bold'}}>
  {winner.profiles?.full_name || 'Unknown User'}
</p>

<p style={{color:'#9ca3af'}}>
  {winner.profiles?.email}
</p><div style={{
  background:'linear-gradient(135deg,#111,#1f2937)',
  padding:'20px',
  borderRadius:'16px',
  border:'1px solid #374151',
  marginBottom:'12px'
}}>
  <h3 style={{fontSize:'1.1rem', fontWeight:'bold'}}>
    🏆 {winner.profiles?.full_name || 'Unknown User'}
  </h3>

  <p style={{color:'#9ca3af', marginTop:'4px'}}>
    {winner.profiles?.email}
  </p>

  <div style={{display:'flex', gap:'8px', flexWrap:'wrap', marginTop:'12px'}}>
    <span style={{backgroundColor:'#4ade80', color:'#000', padding:'6px 10px', borderRadius:'20px', fontWeight:'bold'}}>
      {winner.match_type || 'N/A'}
    </span>

    <span style={{backgroundColor:'#3b82f6', color:'#fff', padding:'6px 10px', borderRadius:'20px', fontWeight:'bold'}}>
      £{winner.prize_amount || 0}
    </span>

    <span style={{backgroundColor:'#ec1d1a', color:'#fff', padding:'6px 10px', borderRadius:'20px'}}>
      {winner.verification_status || 'pending'}
    </span>

    <span style={{backgroundColor:'#dcf94c', color:'#000', padding:'6px 10px', borderRadius:'20px'}}>
      {winner.payment_status || 'pending'}
    </span>
  </div>
</div>
        {winner.proof_url && winner.proof_url !== 'pending' && (
  <a
    href={winner.proof_url}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: 'inline-block',
      color: '#4ade80',
      marginTop: '10px',
      fontWeight: 'bold',
      textDecoration: 'none'
    }}
  >
    View Proof Screenshot →
  </a>
)}
<div
  style={{
    backgroundColor:'#1f2937',
    display:'flex',
    gap:'8px',
    flexWrap:'wrap',
    marginTop:'12px'
  }}
>
 <button
  onClick={() =>
    updateWinnerStatus(
      winner.id,
      'verification_status',
      'approved',
      winner.profiles?.email
    )}
    style={{
      backgroundColor:'#4ade80',
      color:'#fff',
      border:'none',
      padding:'8px 14px',
      borderRadius:'8px',
      fontWeight:'bold',
      cursor:'pointer'
  }}
>
  ✓ Approve
</button>
  <button
    onClick={() => updateWinnerStatus(winner.id,'verification_status','rejected',winner.profiles?.email)}
    style={{
      backgroundColor:'#ef4444',
      color:'#fff',
      border:'none',
      padding:'8px 14px',
      borderRadius:'8px',
      fontWeight:'bold',
      cursor:'pointer'
    }}
  >
    ✕ Reject
  </button>

  <button
    onClick={() => updateWinnerStatus(winner.id,'payment_status','paid',winner.profiles?.email)}
    style={{
      backgroundColor:'#3b82f6',
      color:'#fff',
      border:'none',
      padding:'8px 14px',
      borderRadius:'8px',
      fontWeight:'bold',
      cursor:'pointer'
    }}
  >
    💰 Mark Paid
  </button>
</div>
        </div>
      ))
    )}
  </div>
)}

      </div>
    </main>
  )
}