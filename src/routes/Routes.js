import express from 'express';
import PartyController from '../controllers/PartyControllers';

// route handler
const router = express.Router();

// Political party routes
router.post('/api/v1/parties', PartyController.createParty);
router.get('/api/v1/parties', PartyController.getAllParties);
router.get('/api/v1/parties/:id', PartyController.getParty);
router.patch('/api/v1/parties/:id', PartyController.updatePartyName);

module.exports = router;
