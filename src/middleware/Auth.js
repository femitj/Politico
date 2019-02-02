import jwt from 'jsonwebtoken';
import db from '../models/index';

const Auth = {
  // Verify Token
  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(400).send({ message: 'Token is not provided' });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await db.query(text, [decoded.id]);
      if (!rows[0]) {
        return res.status(400).send({ message: 'The token you provided is invalid' });
      }
      req.user = decoded;

      return next();
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async verifyAdminToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(400).send({ message: 'Token is not provided' });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await db.query(text, [decoded.id]);

      if (!rows[0]) {
        return res.status(400).send({ message: 'The token you provided is invalid' });
      }
      req.user = decoded;
      if (!req.user.isAdmin) {
        return res
          .status(403)
          .json({
            status: 403,
            error: 'Unauthorized!, Admin only route',
          });
      }
      return next();
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};

export default Auth;
