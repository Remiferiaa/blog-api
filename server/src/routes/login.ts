import express from 'express'
import {user_login_post} from '../controllers/authController'

const router = express.Router();

router.post('/login', user_login_post)

export default router;



