import 'dotenv/config'
import user, { IUser } from '../models/user';
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'


const user_login_post = (req: Request, res: Response, next: NextFunction) => {
    user.findOne({ username: req.body.username, password: req.body.password }, (err: Error, user: IUser) => {
        if (err || !user) {
            return res.sendStatus(403)
        } else {
            jwt.sign({ user }, process.env.SECRET!, {}, (err, token) => {
                res.json({
                    username: user.username,
                    token
                })
            })
        }
    })
}

export default { user_login_post }

