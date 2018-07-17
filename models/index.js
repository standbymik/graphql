const mongoose = require('mongoose')
const Post = require('./Post')
const User = require('./User')
mongoose.set('debug',true)
mongoose.connect('mongodb://localhost:27017/react')
const db = mongoose.connection

db.once('open',function(){
    console.log('connected')
})

module.exports = {
     Post,
     User
    }