import Helper from '../helpers/Helper';

const signInInput = (req, res, next) => {
  // User details
  const {
    email,
    password,
  } = req.body;

  if (!Helper.isValidEmail(email)) {
    res.status(400).send({ message: 'Please enter a valid email address' });
  }
  if (password === '' || password === null || password === undefined || password.length < 6) {
    // Price field empty
    res.status(400).json({
      status: 400,
      error: 'password cannot be less than 6 characters',
    });
  }
  // Call the next middleware
  return next();
};

// Export checkSignInInput
export default signInInput;
