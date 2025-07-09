import express from 'express';
import { register, login,  requestResetPassword, resetPassword  } from '../controllers/authController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/reset-request', requestResetPassword);
router.post('/reset-password', resetPassword);

export default router;
