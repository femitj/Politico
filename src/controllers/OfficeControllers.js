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

  // get all political parties
  static getAllOffices(req, res) {
    return res.status(200).json({
      status: 200,
      message: 'All political office record successfully retrieved',
      data: db,
       });
    }

  // get a single political office
  static getOffice(req, res) {
    const office = db.find(c => c.id === parseInt((req.params.id), 10));
    // office not found
    if (!office) {
      return res.status(404).json({
        status: 404,
        error: 'Political office not found',
      });
    }
    // political office found
    return res.status(200).json({
      status: 200,
      message: '/id exists, Political office found',
      data: [{
        id: office.id,
        type: office.type,
        name: office.name,
      }],
    });
  }

}

export default OfficeController;