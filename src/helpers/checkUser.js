import Helper from './Helper';

const signInInput = (req, res, next) => {
  // User details
  const {
    email,
    password,
  } = req.body;

  if (email === '' || email === null || email === undefined) {
    // Quantity field empty
    res.status(400).json({
      status: 400,
      error: 'email cannot be empty',
    });
  }
  if (!Helper.isValidEmail(email)) {
    res.status(400).send({ message: 'Please enter a valid email address' });
  }
  if (password === '' || password === null || password === undefined) {
    // Price field empty
    res.status(400).json({
      status: 400,
      error: 'password cannot be empty',
    });
  }
  if (password.length < 6) {
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
