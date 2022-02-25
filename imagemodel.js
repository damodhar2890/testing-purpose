const mongo =require('mongoose')
const imageschema =mongo.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        data:Buffer,
        contentType:String
    }
})

module.exports=imagemodel =mongo.model('imagemodel',imageschema)