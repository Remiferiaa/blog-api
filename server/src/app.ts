import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import login from './routes/login'
import posts from './routes/posts'
import './middleware/auth'
import { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import createError from 'http-errors'

interface ReqErr {
  status: number
  message: string
}

const app = express()
const mongoDB: string = process.env.DB!
mongoose.connect(mongoDB);
const db = mongoose.connection; 
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', login)
app.use('/api', passport.authenticate('jwt', {session: false}), posts)


app.listen(3000, () =>
  console.log(`App listening on port 3000!`),
); 

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err: ReqErr, req: Request, res: Response, next: NextFunction) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).json({
    error: err.status,
    message: err.message
  });
});

