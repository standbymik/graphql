const express = require('express')
const rounter = express.Router()
const { Post } = require('../models')

rounter.get('/',async (req, res)=> {
	const tags = await Post.distinct('tags')
	res.json(tags)
})

rounter.get('/posts',async (req,res)=>{
	if(!req.query.tag){
		return req.sendStatus(404)
	}

	res.json(posts)
})

module.exports = rounter