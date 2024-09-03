const { ststusCode } = require('http-status-codes')
const CustomAPIError = require

class  NotFoundError extends CustomAPIErrors {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}
module.exports = NotFoundError;