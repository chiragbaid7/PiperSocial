// This class contains implementation of Application Error class to provide common error schema structure to clients and application.

class ApplicationError extends Error {
    // Types of errors.
    static type = {
        APP_NAME: "APP_NAME",
        INTERNAL: "INTERNAL",
        NETWORK: "NETWORK",
        UNKOWN: "UNKNOWN",
    }

    constructor(options, overrides) {
        // super() invokes parent's class contructor.
        super();
        // merge all exisitng properties from source to target. 
        Object.assign(options, overrides);
        if(!ApplicationError.type.hasOwnProperty(options.type)){
            throw new Error('Invalid Application error type')
        } 
        if(!options.code){
            throw new Error('Error code required');
        }
        if(!options.message){
            throw new Error('Error message required');
        }
        this.name = options.name || 'AppError';
        this.type = options.type;
        this.code = options.code;
        this.message = options.message;
        this.errors = options.errors;
        this.statusCode = options.statusCode;
    }
}

module.exports = ApplicationError;