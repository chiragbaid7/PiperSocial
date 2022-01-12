const ApplicationError = require('./applicationError')

const CustomError = {
  EMAIL_ALREADY_TAKEN: {
    type: ApplicationError.type.APP_NAME,
    code: 'EMAIL_ALREADY_TAKEN',
    message: 'The given email address is already taken :(',
    statusCode: 401
  },
  AUTH_WEAK_PASSWORD: {
    type: ApplicationError.type.APP_NAME,
    code: 'AUTH_WEAK_PASSWORD',
    message: 'The given password is easy to guess, provide strong password',
    statusCode: 401
  },
  INVALID_ID: {
    type: ApplicationError.type.APP_NAME,
    code: 'INVALID_USER_ID',
    message: 'The given id is invalid.',
    statusCode: 422
  }
}

module.exports = CustomError;