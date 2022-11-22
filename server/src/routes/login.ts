import express from 'express'
import authController from '../controllers/authController'

const router = express.Router();

router.post('/login', authController.user_login_post)

export default router;



