import express from 'express'
import { 
    createRegisters,
    getRegisterById,
    updateRegister,
    getRegister,
    registerSearch,
    searchChild,
    getCountRegisterChild,
    getCountRegisterPerDay,
    getCountRegisterChildOneMonth,
    getLinearForFiveDays,
    getLinearForSevenDays,
    getLinearForMonth,
    getLinearForYear,
} from '../controllers/RegisterController.js'

import { verifyUser} from '../middleware/AuthUser.js'
const router = express.Router()


router.post('/registers',verifyUser, createRegisters)
router.get('/registers', getRegister)
router.get('/register_child/:id', getRegisterById)
router.patch('/register_child/:id', verifyUser,updateRegister)
router.post('/registerSearch',verifyUser, registerSearch)
router.post('/searchChild', searchChild)
router.get('/countRegisterChild', getCountRegisterChild)
router.get('/countRegisterPerDay', getCountRegisterPerDay)
router.get('/countRegisterChildOneMonth', getCountRegisterChildOneMonth)
router.get('/linearForFiveDays', getLinearForFiveDays)
router.get('/linearForSevenDays', getLinearForSevenDays)
router.get('/linearForMonth', getLinearForMonth)
router.get('/linearForYear', getLinearForYear)
export default router