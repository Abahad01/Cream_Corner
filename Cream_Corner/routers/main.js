import express from "express"
import {
    createOrder,
    fetch,
    fetchAllTransctions,
    success,
    dashboard,
    logout,
    login,
    loginInterface,
    deleteRequest,
    deletedMsg,
    successSubmit
} from "../controllers/main.js"

const router = express.Router()

router.get('/form', fetch)
router.post('/store',createOrder)
router.get('/transctions', fetchAllTransctions)
router.get('/success', success)
router.get('/successSubmit', successSubmit)
router.get('/logout', logout)
router.get('/login', loginInterface)
router.post('/loginVerify', login)
router.get('/delete/:id', deleteRequest)
router.get('/deletedMsg', deletedMsg)
router.get('/dashboard', dashboard)

export default router