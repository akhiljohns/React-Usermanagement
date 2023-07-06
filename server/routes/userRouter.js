
import { getUser, postLogin, postLogout, postSignup, updatePic, } from '../controllers/userController'
import { Router } from 'express'
import auth from '../middlewares/auth'
import upload from '../middlewares/upload'
const router = Router()

router.post('/signup', postSignup)
router.post('/logout', postLogout)
router.get('/getUser', auth, getUser)
router.post('/login', postLogin)
router.post("/update-profilePic",upload.single("file"),auth,updatePic)

// router.get('/test', (req, res) => {
//     res.send("<form action='/login' method='post'> <input type='email' name='email'> <input type='password' name='password' > <button type='submit'>submit</button> </form>")
// })


export default router