import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Helper = {

  // Hash Password Method
  // @returns {string} returns hashed password
  hashPassword: password => bcrypt.hashSync(password, bcrypt.genSaltSync(8)),

  // compare Password
  comparePassword: (hashPassword, password) => bcrypt.compareSync(password, hashPassword),

  // isValidEmail helper method
  isValidEmail: email => /\S+@\S+\.\S+/.test(email),

  // Gnerate Token
  // @param {string} id

  generateToken: (id, isAdmin) => {
    const token = jwt.sign({
      id,
      isAdmin,
    },
    process.env.SECRET, { expiresIn: '7d' });
    return token;
  },
};

export default Helper;
