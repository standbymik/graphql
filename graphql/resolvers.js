const { User, Post } = require('../models')
const DataLoader = require('dataloader')

module.exports = {
    Tag:{
        posts:async (tag)=>{
            const posts = await Post.find({tags:tag.name})
            return posts
        }
    },
    Post: {
        id: (post) => post._id,
        author: async (post,args,context) => {
			//const user = await User.findById(post.authorId);
			//console.log(post.authorId)
			const user = await context.loaders.userLoader.load(post.authorId)
			return user;
		},
        titleLength: (post) => post.title.length,
        tags:(post)=>{
          return post.tags.map(tag =>{
              return { name : tag}
          })
        }
    },
    User: {
        id: (user) => user._id,
        posts:async (user,args,context) => {
            const post = await context.loaders.postLoaderIdLoader.load(user._id)
            return post
        }
    },
    Query: {
        posts: async (obj, args) => {
            const tag = args.tag
            if (tag) {
                const posts = await Post.find({ tags: {$in:tags} })
                return posts
            }
            if (tag) {
                const posts = await Post.find({ tags: tag })
                return posts
            }
            const posts = await Post.find()
            return posts
        },
        post: (obj, { id }) => Post.findById(id),
        users: () => user.find(),
        me :async(obj,arg,context)=>{
            return context.user
        }
        
    },
    Mutation:{
        login: async(obj,{username,password})=>{
            const token = await User.createAccessToken(username,password)
            return token
        },
        signup: async(obj,{username,password})=>{
            const user = await User.signup(
                username,
                password
            )
            return user
        },
        createPost:async(obj,{args})=>{

        }
    }
}