import 'dotenv/config'
import user from '../models/user';
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const user_login_post = async (req: Request, res: Response, next: NextFunction) => {
    const owner = await user.findOne({ username: req.body.username}).exec()

    if (!owner) {
        return res.status(401).json({
            error: 401,
            message: 'Invalid User'
        })
    }

    if (owner?.password !== req.body.password) {
        return res.status(401).json({
            error: 401,
            message: 'Wrong Password'
        })
    }

    const token = jwt.sign({owner}, process.env.SECRET!)

    return res.json({
        username: owner?.username,
        token
    })
}


