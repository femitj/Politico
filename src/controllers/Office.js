import db from '../models/index';
import Helper from '../helpers/Helper';

class OfficeController {
  static async createOffice(req, res) {
    const createQuery = `INSERT INTO
    offices(type, name, createdBy, createdOn)
    VALUES($1, $2, $3, $4)
    returning *`;

    const values = [
      req.body.type,
      req.body.name,
      req.user.id,
      new Date().getTime(),
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      const { id, type, name } = rows[0];
      return res.status(201).json({
        status: 201,
        message: 'Political office created',
        data: {
          id,
          type,
          name,
        },
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  // get all political office
  static async getAllOffices(req, res) {
    const getAllOffices = 'SELECT * FROM offices where createdBy = $1';
    try {
      const { rows, rowCount } = await db.query(getAllOffices, [req.user.id]);
      return res.status(200).json({
        status: 200,
        message: 'All political office record successfully retrieved',
        data: rows,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  // get a single political office
  static async getOffice(req, res) {
    const text = 'SELECT * FROM offices WHERE office_id = $1 AND createdBy = $2';
    try {
      const { rows } = await db.query(text, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Political office not found',
        });
      }
      const { id, type, name } = rows[0];
      return res.status(200).json({
        status: 200,
        message: '/id exists, Political office found',
        data: {
          id,
          type,
          name,
        },
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
export default OfficeController;
