import db from '../models/index';
import Helper from '../helpers/Helper';

const User = {
  // Create User
  async create(req, res) {
    const hashPassword = Helper.hashPassword(req.body.password);

    const createQuery = `INSERT INTO
      users (email, password, firstname, lastname, othername, phonenumber, passportUrl)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *`;
    const values = [
      req.body.email,
      hashPassword,
      req.body.firstname,
      req.body.lastname,
      req.body.othername,
      req.body.phonenumber,
      req.body.passportUrl,
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      const token = Helper.generateToken(rows[0].id);
      return res.status(201).send({ 
        status: 201,
        data: [{
          token,
          user: {
            id: rows[0].id,
            email: rows[0].email,
            password: rows[0].password,
            firstname: rows[0].firstname,
            lastname: rows[0].lastname,
            othername: rows[0].othername,
            passportUrl: rows[0].passportUrl,
          },
        }]
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' })
      }
      return res.status(400).send(error);
    }
  }

}

export default User;
