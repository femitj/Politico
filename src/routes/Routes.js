import express from 'express';
import userController from '../controllers/User';
import checkSignUpInput from '../helpers/checkSignUpInput';
import checkSignInInput from '../helpers/signInInput';




// route handler
const router = express.Router();

// Users routes
router.post('/api/v1/users', checkSignUpInput, userController.create);
router.post('/api/v1/login', checkSignInInput, userController.login);

module.exports = router;
