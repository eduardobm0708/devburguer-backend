import * as Yup from 'yup'
import Category from '../models/Category.js'
import Product from '../models/Product.js'
import User from '../models/User.js'

class ProductController {
	async store(request, response) {
		const schema = Yup.object({
			name: Yup.string().required(),
			price: Yup.number().required(),
			category_id: Yup.number().required(),
			offer: Yup.boolean(),
		})

		try {
			schema.validateSync(request.body, { abortEarly: false })
		} catch (err) {
			return response.status(400).json({ error: err.errors })
		}

		const { admin: isAdmin } = await User.findByPk(request.userId)

		if (!isAdmin) {
			return response.status(403).json({ error: 'Acesso negado' })
		}

		const { filename: path } = request.file
		const { name, price, category_id, offer } = request.body

		const product = await Product.create({
			name,
			price,
			category_id,
			offer,
			path,
		})

		return response.status(201).json(product)
	}

	async update(request, response) {
		const schema = Yup.object({
			name: Yup.string(),
			price: Yup.number(),
			category_id: Yup.number(),
			offer: Yup.boolean(),
		})

		try {
			schema.validateSync(request.body, { abortEarly: false })
		} catch (err) {
			return response.status(400).json({ error: err.errors })
		}

		const { admin: isAdmin } = await User.findByPk(request.userId)

		if (!isAdmin) {
			return response.status(403).json({ error: 'Acesso negado' })
		}

		const { id } = request.params

		const findProduct = await Product.findByPk(id)

		if (!findProduct) {
			return response.status(404).json({ error: 'Produto não encontrado' })
		}

		let path
		if (request.file) {
			path = request.file.filename
		}

		const { name, price, category_id, offer } = request.body

		await Product.update(
			{
				name,
				price,
				category_id,
				offer,
				path,
			},
			{
				where: { id },
			},
		)

		return response.status(200).json()
	}

	async index(request, response) {
		const products = await Product.findAll({
			include: [
				{
					model: Category,
					as: 'category',
					attributes: ['id', 'name'],
				},
			],
		})
		return response.status(200).json(products)
	}
}

export default new ProductController()
