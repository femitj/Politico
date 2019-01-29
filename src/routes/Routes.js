import express from 'express';
import userController from '../controllers/User';
import checkSignInInput from '../helpers/signInInput';

// route handler
const router = express.Router();

// Users routes
router.post('/api/v1/login', checkSignInInput, userController.login);


module.exports = router;
