import express from 'express';
import userController from '../controllers/User';
import OfficeController from '../controllers/OfficeControllers';
import PartyController from '../controllers/PartyControllers';
import Auth from '../middleware/Auth';
import checkSignUpInput from '../helpers/checkSignUpInput';
import checkSignInInput from '../helpers/signInInput';

// route handler
const router = express.Router();

// Political office routes
router.post('/api/v1/offices', Auth.verifyToken, OfficeController.createOffice);
router.get('/api/v1/offices', Auth.verifyToken, OfficeController.getAllOffices);
router.get('/api/v1/offices/:id', Auth.verifyToken, OfficeController.getOffice);

// Political party routes
router.post('/api/v1/parties', Auth.verifyToken, PartyController.createParty);
router.get('/api/v1/parties', Auth.verifyToken, PartyController.getAllParties);
router.get('/api/v1/parties/:id', Auth.verifyToken, PartyController.getParty);
router.patch('/api/v1/parties/:id', Auth.verifyToken, PartyController.updatePartyName);
router.delete('/api/v1/parties/:id', Auth.verifyToken, PartyController.deleteParty);


// Users routes
router.post('/api/v1/users', checkSignUpInput, userController.create);
router.post('/api/v1/login', checkSignInInput, userController.login);

module.exports = router;
