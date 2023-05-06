const User = require('../models/user.models');
const Transfer = require('../models/transfer.models');
const catchAsync = require('../utils/catchAsync');

exports.transfer = catchAsync(async (req, res) => {
  {
    const { amount, receiverAccountNumber, senderAccountNumber } = req.body;

    const senderUser = await User.findOne({
      where: {
        accountNumber: senderAccountNumber,
        status: 'active',
      },
    });

    const receiverUser = await User.findOne({
      where: {
        accountNumber: receiverAccountNumber,
        status: 'active',
      },
    });

    if (
      !senderUser ||
      senderUser === senderUser ||
      senderUser.balance < amount
    ) {
      return res.status(400).json({
        message: 'Insufficient funds or invalid sender account number',
      });
    }

    if (!receiverUser) {
      return res
        .status(400)
        .json({ message: 'Invalid receiver account number' });
    }

    await senderUser.update({ balance: senderUser.balance - amount });
    await receiverUser.update({ balance: receiverUser.balance + amount });

    await Transfer.create({
      amount,
      senderUserId: senderUser.id,
      receiverUserId: receiverUser.id,
    });

    return res.status(200).json({ message: 'Transfer successful' });
  }
});
