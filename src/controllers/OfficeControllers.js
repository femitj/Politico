import db from '../models/politicaloffice';

class OfficeController {

  // get all political parties
  static getAllOffices(req, res) {
    return res.status(200).json({
      status: 200,
      message: 'All political office record successfully retrieved',
      data: db,
    });
  }

}

export default OfficeController;