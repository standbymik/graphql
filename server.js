const express = require('express')
const app = express()
const morgan = require('morgan')
const { Post } = require('./models')
const postRoute = require('./routes/postRoute')
const tagRoute = require('./tagRoute/tagRoute')
const { User } = require('./models')
const bodyParser = require('body-parser')
const { authMiddleWare } = require('./libs/auth')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema')
const DataLoader = require('dataloader')
const { graphqlExpress , graphiqlExpress } = require('apollo-server-express')
const {createUserLoader,createPostLoaderIdLoader} =  require('./loaders')
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())
app.use(authMiddleWare)

app.use('/graphql',graphqlExpress((req,res)=>{

	return {
		schema:schema,
		context:{
			loaders:{
				userLoader:createUserLoader(),
				postLoaderIdLoader:createPostLoaderIdLoader()
			},
			user:req.user
		}
	}
}))

app.use('/graphiql',graphiqlExpress({
	endpointURL:'/graphql'
}))



app.use(morgan('dev'))
app.use('/posts',postRoute)
app.use('/tags',tagRoute)

app.get('/testuser',async (req,res)=>{
	const user = await User.signup('user1','password1')
	res.json(user)
})

app.post('/signup', async (req,res)=>{
	const{username,password} = req.body
	console.log(req.body)
	if(!username || !password){
		return res.sendStatus(400)
	}

	try{
		const user = await User.signup(username,password)
		res.json({
			_id:user.id,
			username: user.username
		})
	}catch(e){
		if(e.name === 'Dup'){
			return res.status(400).send(e.message)
		}
		throw e
	}
})



app.post('/login',async (req,res)=>{
	const { username , password } = req.body
	const token = await User.createAccessToken(username,password)
	if(!token){
		return res.sendStatus(401)
	}

	return res.json({token})
})



app.get('/me',(req,res)=>{

	if(!req.user){
		return res.sendStatus(401)
	}
	res.json(req.user)
})

/*app.use('/graphql',graphqlHTTP({
	schema:schema,
	graphiql:true
}))*/



app.listen(3000,()=>{
	console.log('listen on port 3000')
})


