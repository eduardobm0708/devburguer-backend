import * as Yup from 'yup'
import User from '../models/User.js'

class SessionController {
	async store(request, response) {
		const schema = Yup.object({
			email: Yup.string().email().required(),
			password: Yup.string().required().min(6),
		})

		const isValid = await schema.isValid(request.body)

		const emailOrPassordIncorrect = () => {
			return response.status(401).json({
				error: 'Make Sure your email or password are correct',
			})
		}

		if (!isValid) {
			emailOrPassordIncorrect()
		}

		const { email, password } = request.body

		const user = await User.findOne({
			where: { email },
		})

		if (!user) {
			emailOrPassordIncorrect()
		}

		const isSamePassword = await user.checkPassword(password)

		if (!isSamePassword) {
			emailOrPassordIncorrect()
		}

		return response.status(201).json({
			id: user.id,
			name: user.name,
			email,
			admin: user.admin,
		})
	}
}

export default new SessionController()
