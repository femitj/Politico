import express from 'express';
import PartyController from '../controllers/PartyControllers';

// route handler
const router = express.Router();

// Political party routes
router.post('/api/v1/political-party', PartyController.createParty);

module.exports = router;
