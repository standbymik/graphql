const { User } = require('../models')

const authMiddleWare = async (req,res,next)=>{
	const token = req.headers.authorization || req.query.token
	const user = await User.getUserFromToken(token)
	console.log(token, user)
	if(user){
		req.user = user
	}
	next()
}

module.exports = {
    authMiddleWare
}