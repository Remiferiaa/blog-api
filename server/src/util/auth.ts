import 'dotenv/config'
import user, { IUser } from '../models/user';
import jwt from 'passport-jwt'
import passport from 'passport'

const JwtStrategy = jwt.Strategy
const ExtractJwt = jwt.ExtractJwt
const opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.SECRET!,
}

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    user.findOne({id: jwt_payload.sub}, function(err: Error, user: IUser) {
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
