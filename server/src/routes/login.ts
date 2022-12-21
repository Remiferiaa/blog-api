import express from 'express'
import {authVer, user_login_post} from '../controllers/authController'
import { Request, Response, NextFunction } from 'express'

const router = express.Router();

router.post('/login', user_login_post)

router.route('/verify').get(authVer, (req: Request, res: Response, next: NextFunction) => {
    res.json({
        message: 'Verified'
    })
})

export default router;



