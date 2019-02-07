const partyInput = (req, res, next) => {
  // User details
  const {
    name,
  } = req.body;

  if (name === '' || name === null || name === undefined || name.length < 5) {
    // Price field empty
    res.status(400).json({
      status: 400,
      error: 'name cannot be less than 6 characters',
    });
  }
  // Call the next middleware
  return next();
};


// Export checkSignInInput
export default partyInput;
