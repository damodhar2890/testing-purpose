const express =require('express')
const app =express()
const bodyparser =require('body-parser')
const mongo = require('mongoose')
const multer =require('multer')

const imagemodel =require('./imagemodel.js')
//const { diskStorage } = require('multer')

mongo.connect('mongodb://localhost:27017/test'),{
    useNewUrlParser :true,
    useUnifidTopology:true
}

app.use(express.json())
app.use(bodyparser.urlencoded({extended:false}))



//storage
const Stroge =multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    },

})
const upload = multer({
    storage:Stroge
}).single('testImage')


app.get('/',(req,res)=>{
    res.send("uploadfile")
})

app.post('/upload',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            const newImage = new imagemodel({
                name:req.body.name,
                image:{
                    data:req.file.filename,
                    contentType:'image/JPG'
                }
                

            })
            newImage.save().then(()=>res.send("image upload successfully")).catch((err)=>{console.log(err)})
        }
    })
})


app.listen(8000,()=>{
    console.log("connecting with 8000")
})