const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const categoryRoute = require('./routes/categories')
const multer = require('multer')
const path = require("path")

dotenv.config()
app.use(express.json())
app.use(cors({origin:'http://localhost:3000'}))
app.use("/images", express.static(path.join(__dirname, "/images")))

mongoose.connect(process.env.MONGO_URL)
const db = mongoose.connection;
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

const storage = multer.diskStorage({
  destination:(req, file, cb)=>{
    cb(null, "images")
  },
  filename:(req,file,cb)=>{
    cb(null,req.body.name)
  }
})
const upload = multer({storage:storage})
app.post('api/upload', upload.single('file'), (req, res)=>{
  res.status(200).json('file has been uploaded')
})

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/posts', postRoute)
app.use('/api/categories', categoryRoute)

app.listen('4000', ()=>{
    console.log('server running')
})

