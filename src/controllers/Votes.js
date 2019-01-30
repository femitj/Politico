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
      return res.status(201).send({
        status: 201,
        data: [{
          id: rows[0].id,
          message: 'vote created',
        }],
      });
    } 
    catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
}

export default vote;
