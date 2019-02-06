import express from 'express';
import userController from '../controllers/User';
import PartyController from '../controllers/Party';
import OfficeController from '../controllers/Office';
import CandidateController from '../controllers/Candidate';
import VoteController from '../controllers/Votes';
import ResultController from '../controllers/results';
import Auth from '../middleware/Auth';
import checkSignUpInput from '../middleware/checkSignUpInput';
import checkUser from '../middleware/checkUser';

// route handler
const router = express.Router();


// Political party routes
router.post('/parties', Auth.verifyAdminToken, PartyController.createParty);
router.get('/parties', Auth.verifyToken, PartyController.getAllParties);
router.get('/parties/:id', Auth.verifyToken, PartyController.getParty);
router.patch('/parties/:id', Auth.verifyAdminToken, PartyController.updatePartyName);
router.delete('/parties/:id', Auth.verifyAdminToken, PartyController.deleteParty);

// Political office routes
router.post('/offices', Auth.verifyAdminToken, OfficeController.createOffice);
router.get('/offices', Auth.verifyToken, OfficeController.getAllOffices);
router.get('/offices/:id', Auth.verifyToken, OfficeController.getOffice);

// Users routes
router.post('/auth/signup', checkUser, checkSignUpInput, userController.create);
router.post('/auth/login', checkUser, userController.login);

// Candidate routes
router.post('/office/:id/register', Auth.verifyAdminToken, CandidateController.create);

// Vote routes
router.post('/votes', Auth.verifyToken, VoteController.create);

// result route
router.get('/office/:id/result', ResultController.getResult);

module.exports = router;
