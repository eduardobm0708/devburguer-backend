import * as Yup from 'yup'
import category from '../models/Category.js'
import Product from '../models/Product.js'
import User from '../models/User.js'
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

	async index(request, response) {
		const orders = await Order.find()
		return response.json(orders)
	}

	async update(request, response) {
		const schema = Yup.object({
			status: Yup.string().required(),
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
		const { status } = request.body

		try {
			await Order.updateOne({ _id: id }, { status })
		} catch (err) {
			return response.status(400).json({ error: 'Erro ao atualizar o pedido' })
		}

		return response.json({ message: 'Pedido atualizado com sucesso' })
	}
}

export default new OrderController()
