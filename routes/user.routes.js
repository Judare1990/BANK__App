const express = require('express');

const userController = require('../controllers/user.controller');

const userMiddleware = require('../middlewares/user.middleware');
const validationMiddleware = require('../middlewares/validations.middleware');

const router = express.Router();
router
  .route('/')
  .post(
    userMiddleware.validIfExistUser,
    validationMiddleware.createUserValidation,
    userController.createAccount
  )
  .post(
    userMiddleware.validIfExistUser,
    validationMiddleware.loginUserValidation,
    userController.login
  );

router
  .route('/:id/history')
  .get(userMiddleware.validIfExistUser, userController.getTransferHistory);
