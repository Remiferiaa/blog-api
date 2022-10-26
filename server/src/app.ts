import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import local from 'passport-local'
import jwtstrat from 'passport-jwt'

const app = express()
const mongoDB: string = process.env.DB!
mongoose.connect(mongoDB);
const db = mongoose.connection; 
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/' , (req , res) => {
    res.send('e')
})

app.listen(3000, () =>
  console.log(`Example app listening on port 3000!`),
); 


