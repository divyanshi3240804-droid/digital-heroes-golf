import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {
  try {
    const { plan, userId, email } = await request.json()

    const prices = {
      monthly: {
        amount: 999,
        interval: 'month',
        name: 'GolfHeroes Monthly Plan'
      },
      yearly: {
        amount: 9999,
        interval: 'year',
        name: 'GolfHeroes Yearly Plan'
      }
    }

    const selectedPlan = prices[plan]

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: selectedPlan.name,
              description: 'Play golf, support charity, win prizes!'
            },
            unit_amount: selectedPlan.amount,
            recurring: {
              interval: selectedPlan.interval
            }
          },
          quantity: 1
        }
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/subscribe?cancelled=true`,
      customer_email: email,
      metadata: {
        userId: userId,
        plan: plan
      }
    })

    return Response.json({ url: session.url })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}