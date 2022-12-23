import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import login from './routes/login'
import posts from './routes/posts'
import { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import createError from 'http-errors'
import helmet from 'helmet'
import compression from 'compression'
import logger from 'morgan'
import jwt from 'passport-jwt'
import user, { IUser } from './models/user'
import dotenv from 'dotenv';
dotenv.config()

interface ReqErr {
  status: number
  message: string
}

const JwtStrategy = jwt.Strategy
const ExtractJwt = jwt.ExtractJwt
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
}

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    user.findOne({_id: jwt_payload.owner._id}, function (err: Error, user: IUser) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

const app = express()
const mongoDB: string = process.env.DB!
mongoose.connect(mongoDB);
const db = mongoose.connection; 
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(logger('dev'))
app.use(compression())
app.use(helmet())
app.use('/', login)
app.use('/api', posts)


app.listen(process.env.PORT, () =>
  console.log(`App listening on port ${process.env.PORT}`),
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

