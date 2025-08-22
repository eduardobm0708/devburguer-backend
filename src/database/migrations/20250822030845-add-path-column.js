'use strict'

/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('categories', 'path', {
			type: Sequelize.STRING,
		})
	},

	async down(queryInterface) {
		await queryInterface.removeColumn('categories', 'path')
	},
}
