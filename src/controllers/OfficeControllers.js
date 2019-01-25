import db from '../models/politicaloffice';

class OfficeController {

  static createOffice(req, res) {
    const office = {
      id: db.length + 1,
      type: req.body.type, // String
      name: req.body.name, // // String
      createdOn: new Date().toDateString(),
    };
    db.push(office);
    // political office created
    return res.status(201).json({
      status: 201,
      message: 'Political office created',
      data: [{
        id: office.id,
        type: office.type,
        name: office.name,
      }],
    });
  }

}

export default OfficeController;