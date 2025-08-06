export default {
	dialect: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: 'postgres',
	database: 'devburguer',
	define: {
		timestamps: true,
		underscored: true,
		underscoredAll: true,
	},
}
