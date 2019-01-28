import express from 'express';
import PartyController from '../controllers/PartyControllers';
import OfficeController from '../controllers/OfficeControllers';

// route handler
const router = express.Router();

// Political party routes
router.post('/api/v1/parties', PartyController.createParty);
router.get('/api/v1/parties', PartyController.getAllParties);
router.get('/api/v1/parties/:id', PartyController.getParty);
router.patch('/api/v1/parties/:id', PartyController.updatePartyName);
router.delete('/api/v1/parties/:id', PartyController.deleteParty);


// Political office routes
router.post('/api/v1/offices', OfficeController.createOffice);
router.get('/api/v1/offices', OfficeController.getAllOffices);
router.get('/api/v1/offices/:id', OfficeController.getOffice);


module.exports = router;
