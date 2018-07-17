const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title: String,
    content: String,
    tags: [String],
    authorId:mongoose.Schema.Types.ObjectId
},{ timestamp: true})

module.exports = mongoose.model('Post',postSchema)