import express from 'express';
import userController from '../controllers/User';
import checkSignUpInput from '../helpers/checkSignUpInput';

// route handler
const router = express.Router();

// Users routes
router.post('/api/v1/users', checkSignUpInput, userController.create);

module.exports = router;
