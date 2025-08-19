'use strict'

/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface) {
		await queryInterface.removeColumn('products', 'catergory')
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.addColumn('products', 'catergory', {
			type: Sequelize.STRING,
			allowNull: true,
		})
	},
}
