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
      new Date().getTime(),
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      const { id, office, candidate, voter } = rows[0];
      return res.status(201).json({
        status: 201,
        message: 'vote created',
        data: {
          id,
          office,
          candidate,
          voter,
        },
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default vote;
