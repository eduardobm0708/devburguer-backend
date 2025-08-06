import * as Yup from 'yup'
import Product from '../models/Product.js'

class ProductController {
	async store(request, response) {
		const schema = Yup.object({
			name: Yup.string().required(),
			price: Yup.number().required(),
			catergory: Yup.string().required(),
		})

		try {
			schema.validateSync(request.body, { abortEarly: false })
		} catch (err) {
			return response.status(400).json({ error: err.errors })
		}

		const { filename: path } = request.file
		const { name, price, catergory } = request.body

		const product = await Product.create({
			name,
			price,
			catergory,
			path,
		})

		return response.status(201).json(product)
	}

	async index(request, response) {
		const products = await Product.findAll()
		return response.status(200).json(products)
	}
}

export default new ProductController()
