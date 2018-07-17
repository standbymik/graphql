const DataLoader = require('dataloader')
const {Post,User} = require('./models')

const createUserLoader = () =>{
  return new DataLoader(async(keys)=>{
	
        const rows = await User.find({_id : {$in : keys}})
        

        const results = keys.map((key)=>{
            const matchRow = rows.find((row)=>{
                return `${row._id}` === `${key}`
            })
            return matchRow
        })

        return results
        
    },{
        cacheKeyFn: (key)=> `${key}`
    })  
}

const createPostLoaderIdLoader = () => {
    return new DataLoader(async(userIds)=>{
	
		const rows = await Post.find({authorId : {$in : userIds}})
	
		const results = userIds.map((userId)=>{
			const matchRow = rows.filter((row)=>{
				return `${row.authorId}` === `${userId}`
			})
			return matchRow
		})
	
		return results
		
	},{
		cacheKeyFn: (key)=> `${key}`
	})
}

module.exports = {
    createUserLoader,
    createPostLoaderIdLoader
}