import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import login from './routes/login'
import posts from './routes/posts'
import './middleware/auth'

const app = express()
const mongoDB: string = process.env.DB!
mongoose.connect(mongoDB);
const db = mongoose.connection; 
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', login)
app.use('/api', passport.authenticate('jwt', {session: false}), posts)


app.listen(3000, () =>
  console.log(`Example app listening on port 3000!`),
); 




