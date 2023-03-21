const loginService = require('../services/loginService');
const { catchAsync } = require('../../utils/error');

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  const accessToken = await loginService.login(email, password);

  return res.status(200).json({ message: accessToken });
});

module.exports = { login };
