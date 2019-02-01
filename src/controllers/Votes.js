import db from '../models/index';


class vote {
  static async create(req, res) {
    const createQuery = `INSERT INTO
    votes(office, candidate, voter, createdOn)
    VALUES($1, $2, $3, $4)
    returning *`;

    const values = [
      req.body.office,
      req.body.candidate,
      req.user.id,
      req.body.createdOn,
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).json({
        status: 201,
        message: 'vote created',
        data: [{
          id: rows[0].id,
          office: rows[0].office,
          candidate: rows[0].candidate,
          voter: rows[0].voter,
        }],
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

export default vote;
