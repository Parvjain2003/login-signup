const {Router} =  require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const user = require('../models/user')
const router = Router()

router.post('/register',async(req,res) =>{
    let email = req.body.email
    let password = req.body.password
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let userName = req.body.userName

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password,salt)

    const record = await User.findOne({email : email})

    if(record){
        return res.status(400).send({
            message: "Email is already registered",
        });
    }
    else{
         const user = new User({
            firstName : firstName,
            lastName : lastName,
            email : email,
            userName : userName,
            password : hashedPassword
        })

        const result = await user.save()

        //JWT token
        const {_id} = await result.toJSON()
        const token = jwt.sign({_id : _id},"secret")
        res.cookie("jwt",token,{
            httpOnly : true,
            maxAge : 24*60*60*1000
        })

        res.send({
            message : "success"
        })
        
        res.json({
            user : result
        })
    }
})

router.post("/login",async(req,res) => {
    const user = await User.findOne({email:req.body.email})
    if(!user){
        return res.status(404).send({
            message:"User not Found"
        })
    }
    if(!(await bcrypt.compare(req.body.password,user.password))){
        return res.status(400).send({
            message : "Password is Incorrect"
        })
    }
    const token = jwt.sign({_id:user._id},"secret key")

    res.cookie("jwt",token,{
        httpOnly:true,
        maxAge:24*60*60*1000
    })

    res.send({
        message: "success"
    })
});

router.get('/user',async(req,res) =>{
    try{

        // const cookie = req.cookies['jwt']
        // const claims = jwt.verify(cookie,"secret")

        // if(!claims){
        //     return res.status(401).send({
        //         message:"unauthenticated"
        //     })
        // }

        const user = await User.findOne({_id : claims._id})

        const {password,...data} = await user.toJSON()

        res.send(data)
    }catch(err){
        return res.status(401).send({
            message:'unauthenticated'
        })
    }
})

module.exports = router 