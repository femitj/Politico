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
      message: 'Political party created',
      data: [{
        id: party.id,
        name: party.name,
      }],
    });
  }

  // get all political parties
  static getAllParties(req, res) {
    return res.status(200).json({
      status: 200,
      message: 'All political party record successfully retrieved',
      data: db,
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
      message: '/id exists, Political party found',
      data: [{
        id: party.id,
        name: party.name,
        logo: party.logoUrl,
      }],
    });
  }

  // update Political party name
  static updatePartyName(req, res) {
    const requestId = req.params.id;
    const reqBody = req.body;
    const party = db.find(c => c.id === parseInt((requestId), 10));
    if (!party) {
      return res.status(404).json({
        status: 404,
        error: 'party not found',
      });
    }
    party.name = reqBody.name;
    return res.status(200).json({
      status: 200,
      message: "Political party's name updated",
      data: [{
        id: requestId,
        name: party.name,
      }],
    });
  }
}

export default PartyController;