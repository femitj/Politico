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
      const token = Helper.generateToken(rows[0].id, rows[0].isAdmin);
      const { id, email, firstname, lastname, othername } = rows[0];

      return res.status(201).json({
        status: 201,
        data: {
          token,
          user: {
            id,
            email,
            firstname,
            lastname,
            othername,
          },
        },
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).json({ message: 'User with that EMAIL already exist' });
      }
      return res.status(500).json(error);
    }
  },


  async login(req, res) {
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).json({ message: 'The email you provided is incorrect' });
      }
      if (!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).json({ message: 'The password you provided is incorrect' });
      }

      const token = Helper.generateToken(rows[0].id, rows[0].isAdmin);
      const { id, email, firstname, lastname, othername, passporturl, isAdmin } = rows[0];
      return res.status(200).json({
        status: 200,
        data: {
          token,
          user: {
            id,
            email,
            firstname,
            lastname,
            othername,
            passporturl,
            isAdmin,
          },
        },
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

};

export default User;
