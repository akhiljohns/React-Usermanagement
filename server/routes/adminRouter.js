import { Router } from "express";
import { getUsers, postDelete, postEditUser, postLogin, postLogout } from "../controllers/adminController";
import auth from "../middlewares/adminAuth";

const router=Router()

router.post('/login',postLogin)
router.post('/delete/:id',auth,postDelete)
router.get('/getUsers',auth,getUsers)
router.post('/edit/:id',auth,postEditUser)
router.post('/logout',auth,postLogout)




export default router