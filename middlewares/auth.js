import jwt from 'jsonwebtoken'

export const auth = async (req, res, next) => {
	const token = req.cookies.token
	try {
		const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY)

		req.user = {
			email: verifyToken.email
		}

		next()
	} catch (e) {
		res.redirect('/login')
	}
}