import db from '../models/politicalparty';

class PartyController {

  static createParty(req, res) {
    const party = {
      id: db.length + 1,
      createdOn: new Date().toDateString(),
      name: req.body.name, // // String
      hqAddress: req.body.hqAddress, // String
      logoUrl: req.body.logoUrl,  // String
    };
    db.push(party);
    // political party created
    return res.status(201).json({
      status: 201,
      data: [{
        id: party.id,
        message: 'Created political party',
      }],
    });
  }

  // get all political parties
  static getAllParties(req, res) {
    return res.status(200).json({
      status: 200,
      data: [{
        party: db,
      }],
    });
  }
}

export default PartyController;