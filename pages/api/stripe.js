import Stripe from 'stripe'

const stripe = new Stripe(
  'sk_test_51KucB2IAJ4cLz7wW4ajy80GdPnWqu52XYumNMm12jVFY7R6rMfu2fKUZgZjyMjqc3H8Hm5995uVe3Jj00zMjioBR005e34CvcP'
)

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [
          { shipping_rate: 'shr_1Kv39CIAJ4cLz7wWHvEfkayi' },
          { shipping_rate: 'shr_1Kv3A7IAJ4cLz7wWstrmBASg' }
        ],
        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref
          const newImage = img
            .replace(
              'image-',
              'https://cdn.sanity.io/images/vfxfwnaw/production/'
            )
            .replace('-webp', '.webp')

          return {
            price_data: {
              currency: 'gbp',
              product_data: {
                name: item.name,
                images: [newImage]
              },
              unit_amount: item.price * 100
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1
            },
            quantity: item.quantity
          }
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`
      }

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params)

      res.status(200).json(session)
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
