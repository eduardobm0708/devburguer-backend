export default {
	dialect: 'postgres',
	host: 'localhost',
	port: 5433,
	username: 'postgres',
	password: 'postgres',
	database: 'devburger',
	define: {
		timestamps: true,
		underscored: true,
		underscoredAll: true,
	},
}

// STRIPE
// STRIPE: load secret key from environment variable to avoid committing secrets
// Make sure to add STRIPE_SECRET_KEY to your local `.env` (do NOT commit it).
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || ''
