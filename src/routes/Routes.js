import express from 'express';
import userController from '../controllers/User';
import OfficeController from '../controllers/OfficeControllers';
import Auth from '../middleware/Auth';
import checkSignUpInput from '../helpers/checkSignUpInput';
import checkSignInInput from '../helpers/signInInput';

// route handler
const router = express.Router();

// Political office routes
router.post('/api/v1/offices', Auth.verifyToken, OfficeController.createOffice);
router.get('/api/v1/offices', Auth.verifyToken, OfficeController.getAllOffices);
router.get('/api/v1/offices/:id', Auth.verifyToken, OfficeController.getOffice);

// Users routes
router.post('/api/v1/users', checkSignUpInput, userController.create);
router.post('/api/v1/login', checkSignInInput, userController.login);

module.exports = router;
