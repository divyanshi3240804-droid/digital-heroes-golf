export async function POST(req) {
  const { to, subject, message } = await req.json()

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    from: 'Digital Heroes Golf <onboarding@resend.dev>',
      to,
      subject,
      html: `<p>${message}</p>`
    })
  })

  const data = await response.json()

  return Response.json(data)
}