import * as Yup from 'yup'
import Category from '../models/Category.js'
import Product from '../models/Product.js'

class ProductController {
	async store(request, response) {
		const schema = Yup.object({
			name: Yup.string().required(),
			price: Yup.number().required(),
			catergory_id: Yup.number().required(),
		})

		try {
			schema.validateSync(request.body, { abortEarly: false })
		} catch (err) {
			return response.status(400).json({ error: err.errors })
		}

		const { filename: path } = request.file
		const { name, price, catergory_id } = request.body

		const product = await Product.create({
			name,
			price,
			catergory_id,
			path,
		})

		return response.status(201).json(product)
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
