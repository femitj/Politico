import db from '../models/index';
import Helper from '../helpers/Helper';

const User = {

  async login(req, res) {
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).send({ message: 'The email you provided is incorrect' });
      }
      if (!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).send({ message: 'The password you provided is incorrect' });
      }

      const token = Helper.generateToken(rows[0].id);
      return res.status(200).send({             
        status: 201,
        data: [{
          token,
          user: rows,
        }],
      });
    } catch (error) {
      return res.status(400).send(error)
    }
  },


};

export default User;
