import express from 'express'
const router = express.Router()
import { login, signup, updateFav } from '../controllers/userController.js'
import { AuthMidleware } from '../middleware/AuthMidleware.js'
router.post('/register',signup)
router.post('/login',login)
router.use(AuthMidleware)
router.post('/fav',updateFav)

export default router