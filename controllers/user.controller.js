const User = require('../models/user.models');
const catchAsync = require('../utils/catchAsync');

exports.createAccount = catchAsync(async (req, res) => {
  const { name, password } = req.body;

  const newUser = await User.create({
    name,
    password,
  });

  return res.status(201).json({
    status: 'success',
    message: 'The user has been created',
  });
});

exports.login = catchAsync(async (req, res) => {
  const { accountNumber, password } = req.body;

  const user = await User.findOne({
    where: {
      accountNumber,
      password,
      status: 'active',
    },
  });

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  return res.status(200).json({ user });
});

exports.getTransferHistory = catchAsync(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findOne({
    where: {
      id: userId,
      status: 'active',
    },
  });

  if (!user) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  const transfers = await Transfer.findAll({
    where: {
      senderUserId: user.id,
    },
  });

  return res.status(200).json(transfers);
});
