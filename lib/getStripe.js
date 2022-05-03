import { loadStripe } from '@stripe/stripe-js'

let stripePromise
const key = process.env.STRIPE_TEST_KEY

const getStripe = () => {
  if (!stripePromise) {
    // stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    stripePromise = loadStripe(
      'pk_test_51KucB2IAJ4cLz7wWu10ozKs2B2aHmLm44zkQ1Zt1rJg38KwNHp7OEeYim4Ar0NC2yBfT1Zt7Qfph10TjhBIE33OF00Lx3Uo5N8'
    )
  }

  return stripePromise
}
export default getStripe
