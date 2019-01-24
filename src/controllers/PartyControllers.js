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

   // get a single political party
   static getParty(req, res) {
    const party = db.find(c => c.id === parseInt((req.params.id), 10));
    // party not found
    if (!party) {
      return res.status(404).json({
        status: 404,
        error: 'Political party not found',
      });
    }
    // political party found
    return res.status(200).json({
      status: 200,
      data: [{
        record: party,
      }],
    });
  }
}

export default PartyController;