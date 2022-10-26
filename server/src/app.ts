import 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import local from 'passport-local'
import jwtstrat from 'passport-jwt'

const app = express()

app.get('/' , (req , res) => {
    res.send('e')
})

app.listen(3000, () =>
  console.log(`Example app listening on port 3000!`),
);