'use strict'

/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('products', 'offer', {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		})
	},

	async down(queryInterface) {
		await queryInterface.removeColumn('products', 'offer')
	},
}
