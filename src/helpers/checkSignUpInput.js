const checkSignUpInput = (req, res, next) => {
  /**
   * User details
   */
  const {
    firstname,
    lastname,
    othername,
  } = req.body;
  if (firstname === '' || firstname === null || firstname === undefined || firstname < 3) {
    res.status(400).json({
      status: 400,
      error: 'firstname cannot be less than 3 characters',
    });
  }
  if (lastname === '' || lastname === null || lastname === undefined) {
    res.status(400).json({
      status: 400,
      error: 'lastname cannot be empty',
    });
  }
  if (othername === '' || othername === null || othername === undefined) {
    res.status(400).json({
      status: 400,
      error: 'othername cannot be empty',
    });
  }
  // Call the next middleware
  return next();
};

// Export checkSignUpInput
export default checkSignUpInput;
