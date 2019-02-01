import db from '../models/index';


class Candidate {
  static async create(req, res) {
    const createQuery = `INSERT INTO
    candidates(office, candidate, createdOn)
    VALUES($1, $2, $3)
    returning *`;

    const values = [
      req.body.office,
      req.user.id,
      req.body.createdOn,
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).json({
        status: 201,
        message: 'Candidate created',
        data: [{
          user: rows[0].candidate,
          office: rows[0].office,
        }],
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

export default Candidate;
