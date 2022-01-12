const ApplicationError = require("./applicationError");

const HTTPError = {
  // Application custom errors
  UNKNOWN_ERROR: {
    type: ApplicationError.type.APP_NAME,
    code: "UNKNOWN_ERROR",
    message: "Unknown error",
    statusCode: 500,
  },

  // Predefined 4xx http errors
  BAD_REQUEST: {
    type: ApplicationError.type.NETWORK,
    code: "BAD_REQUEST",
    message: "Bad request",
    statusCode: 400,
  },
  UNAUTHORIZED: {
    type: ApplicationError.type.NETWORK,
    code: "UNAUTHORIZED",
    message: "Unauthorized",
    statusCode: 401,
  },
  FORBIDDEN: {
    type: ApplicationError.type.NETWORK,
    code: "FORBIDDEN",
    message: "Forbidden",
    statusCode: 403,
  },
  RESOURCE_NOT_FOUND: {
    type: ApplicationError.type.NETWORK,
    code: "RESOURCE_NOT_FOUND",
    message: "Resource not found",
    statusCode: 404,
  },
  UNPROCESSABLE_ENTITY: {
    type: ApplicationError.type.NETWORK,
    code: "HTTP_UNPROCESSABLE_ENTITY",
    message: "UNPROCESSABLE ENTITY",
    statusCode: 422,
  },
  UNSUPPORTED_MEDIA_TYPE: {
    type: ApplicationError.type.NETWORK,
    code: "HTTP_UNPROCESSABLE_ENTITY",
    message: "Content Type not supported",
    statusCode: 422,
  },
  // Predefined 5xx http errors
  INTERNAL_SERVER_ERROR: {
    type: ApplicationError.type.INTERNAL,
    code: "INTERNAL_SERVER_ERROR",
    message: "Something went wrong, Please try again later.",
    statusCode: 500, 
  },
  SERVICE_UNAVAILABLE: {
    type: ApplicationError.type.INTERNAL,
    code: "SERVICE_UNAVAILABLE",
    message: "Service unavailable",
    statusCode: 503,
  }

};

module.exports = HTTPError;