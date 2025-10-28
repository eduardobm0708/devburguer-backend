import app from './app.js'

// Runtime checks for critical environment variables
if (!process.env.STRIPE_SECRET_KEY) {
	console.warn('Warning: STRIPE_SECRET_KEY is not defined. Payment processing will be disabled.\nAdd STRIPE_SECRET_KEY to your .env file to enable Stripe integration.');
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server is running on port ${PORT}🚀`))
