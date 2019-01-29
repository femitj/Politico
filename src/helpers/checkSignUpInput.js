import Helper from './Helper';

const checkSignUpInput = (req, res, next) => {
  /**
   * User details
   */
  const {
    firstname,
    email,
    lastname,
    username,
    password,
  } = req.body;
  if (firstname === '' || firstname === null || firstname === undefined || firstname < 3) {
    return res.status(400).json({
      status: 400,
      error: 'firstname cannot be less than 3 characters',
    });
  }
  if (email === '' || email === null || email === undefined) {
    return res.status(400).json({
      status: 400,
      error: 'email cannot be empty',
    });
  }
  if (!Helper.isValidEmail(email)) {
    return res.status(400).send({ message: 'Please enter a valid email address' });
  }
  if (lastname === '' || lastname === null || lastname === undefined) {
    return res.status(400).json({
      status: 400,
      error: 'lastname cannot be empty',
    });
  }
  if (username === '' || username === null || username === undefined) {
    return res.status(400).json({
      status: 400,
      error: 'username cannot be empty',
    });
  }
  if (password === '' || password === null || password === undefined || password.length < 6) {
    return res.status(400).json({
      status: 400,
      error: 'password cannot be less than 6',
    });
  }
  // Call the next middleware
  return next();
};

// Export checkSignUpInput
export default checkSignUpInput;
