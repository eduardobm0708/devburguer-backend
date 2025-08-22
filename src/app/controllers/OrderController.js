import * as Yup from 'yup'
import category from '../models/Category.js'
import Product from '../models/Product.js'
import Order from '../schemas/Order.js'

class OrderController {
	async store(request, response) {
		const schema = Yup.object({
			products: Yup.array()
				.required()
				.of(
					Yup.object({
						id: Yup.number().required(),
						quantity: Yup.number().required(),
					}),
				),
		})

		try {
			schema.validateSync(request.body, { abortEarly: false })
		} catch (err) {
			return response.status(400).json({ error: err.errors })
		}

		const { products } = request.body

		const productsIds = products.map((product) => product.id)

		const findProducts = await Product.findAll({
			where: {
				id: productsIds,
			},
			include: [
				{
					model: category,
					as: 'catergory',
					attributes: ['name'],
				},
			],
		})

		const formattedProducts = findProducts.map((product) => {
			const productIndex = products.findIndex((item) => item.id === product.id)

			const newProduct = {
				id: product.id,
				name: product.name,
				catergory: product.catergory.name,
				price: product.price,
				url: product.url,
				quantity: products[productIndex].quantity,
			}
			return newProduct
		})

		const order = {
			user: {
				name: request.userName,
				id: request.userId,
			},
			products: formattedProducts,
			status: 'pedido realizado',
		}

		const createdOrder = await Order.create(order)

		return response.status(201).json(createdOrder)
	}
}

export default new OrderController()
