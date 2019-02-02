import express from 'express';
import userController from '../controllers/User';
import PartyController from '../controllers/PartyControllers';
import OfficeController from '../controllers/OfficeControllers';
import CandidateController from '../controllers/Candidate';
import VoteController from '../controllers/Votes';
import ResultController from '../controllers/results';
import Auth from '../middleware/Auth';
import checkSignUpInput from '../helpers/checkSignUpInput';
import checkUser from '../helpers/checkUser';

// route handler
const router = express.Router();

const apiVersion = '/api/v1/';

// Political party routes
router.post(`${apiVersion}parties`, Auth.verifyAdminToken, PartyController.createParty);
router.get(`${apiVersion}parties`, Auth.verifyToken, PartyController.getAllParties);
router.get(`${apiVersion}parties/:id`, Auth.verifyToken, PartyController.getParty);
router.patch(`${apiVersion}parties/:id`, Auth.verifyAdminToken, PartyController.updatePartyName);
router.delete(`${apiVersion}parties/:id`, Auth.verifyAdminToken, PartyController.deleteParty);

// Political office routes
router.post(`${apiVersion}offices`, Auth.verifyAdminToken, OfficeController.createOffice);
router.get(`${apiVersion}offices`, Auth.verifyToken, OfficeController.getAllOffices);
router.get(`${apiVersion}offices/:id`, Auth.verifyToken, OfficeController.getOffice);

// Users routes
router.post(`${apiVersion}auth/signup`, checkUser, checkSignUpInput, userController.create);
router.post(`${apiVersion}auth/login`, checkUser, userController.login);

// Candidate routes
router.post(`${apiVersion}office/:id/register`, Auth.verifyAdminToken, CandidateController.create);

// Vote routes
router.post(`${apiVersion}votes`, Auth.verifyToken, VoteController.create);

// result route
router.get(`${apiVersion}office/:id/result`, ResultController.getResult);

module.exports = router;
