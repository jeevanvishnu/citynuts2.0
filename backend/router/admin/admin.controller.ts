import express from "express";
import { adminLogin, adminLogout, checkAuth } from "../../controllers/admin/admin.controller.ts"
import { adminAuth } from "../../middleware/auth.middleware.ts"

const router = express.Router()

router.post('/login',adminLogin)
router.post('/logout', adminLogout)
router.get('/check-auth', adminAuth, checkAuth)

export default router