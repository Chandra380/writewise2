const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const router = express.Router()

router.post('/register', async(req, res)=>{
    const {username, email, password} = req.body
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt)
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPass,
        })
        const user = await newUser.save()
        res.status(200).json(user)
    }catch(err){
        res.status(500).json(err)
    }
})

router.post('/login', async(req, res)=>{
    try{
        const user = await User.findOne({username: req.body.username})
        !user&&res.status(400).json('wrong credentials')

        const validate = await bcrypt.compare(req.body.password, user.password)
        !validate&&res.status(400).json('wrong credentials')

        const {password, ...others} = user._doc
        res.status(200).json(others)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router