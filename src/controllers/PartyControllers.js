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
    // party created
    return res.status(201).json({
      status: 201,
      data: [{
        id: party.id,
        message: 'Created political party',
      }],
    });
  }
}

export default PartyController;