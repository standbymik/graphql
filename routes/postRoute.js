const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { Post } = require('../models')

router.get('/',async (req,res)=>{
	const posts = await Post.find()
	res.json(posts)
})

router.get('/:postId',async(req,res)=>{
	const postId = req.params.postId
	console.log(postId)
	try {
		
		const post = await Posts.findById(postId)
		if(!post){
			return res.sendStatus(404)
		}
		res.json(post)	
	} catch (error) {
		if(err instanceof mongoose.CastError){
			return res.sendStatus(404)
		}
	}
	
})

router.post('/create',async (req,res)=>{
    if(!req.user){
        return res.sendStatus(401)
    }
    const { title,content,tags} = req.body
    const authoId = req.user._id
    const post = await Post.create({
        title,
        content,
        tags,
        authorId:req.user._id
    })
    res.json(post)
})

module.exports = router