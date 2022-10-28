import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import local from 'passport-local'
import jwtstrat from 'passport-jwt'
import router from './routes/auth'


const app = express()
const mongoDB: string = process.env.DB!
mongoose.connect(mongoDB);
const db = mongoose.connection; 
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api', router)

app.get('/' , (req , res) => {
    res.json({
      message:' hi asdfasdf dd'
    })
})

app.listen(3000, () =>
  console.log(`Example app listening on port 3000!`),
); 




