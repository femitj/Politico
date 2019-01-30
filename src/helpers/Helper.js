import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Helper = {

  // Hash Password Method
  // @returns {string} returns hashed password
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  },

  // compare Password
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  
  // isValidEmail helper method
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },
  
  // Gnerate Token
  // @param {string} id

  generateToken(id) {
    const token = jwt.sign({
      userId: id
    },
    process.env.SECRET, { expiresIn: '7d' }
    );
    return token;
  }
}

export default Helper;