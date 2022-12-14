import user from '../models/user';
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import dotenv from 'dotenv';
dotenv.config()

export const user_login_post = async (req: Request, res: Response, next: NextFunction) => {
    const owner = await user.findOne({ username: req.body.username }).exec()

    if (!owner || owner?.password !== req.body.password) {
        return res.status(401).json({
            error: 401,
            message: 'Invalid User or password'
        })
    }

    const token = jwt.sign({ owner }, process.env.SECRET!, { expiresIn: '6h' })

    res.json({
        username: owner?.username,
        token
    })
}

export const authVer = [
    passport.authenticate('jwt', { session: false }),
    (req: Request, res: Response, next: NextFunction) => {
        next()
    }
]
