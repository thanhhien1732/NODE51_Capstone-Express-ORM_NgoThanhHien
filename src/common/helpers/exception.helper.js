import { statusCodes } from "./status-code.helper"

// Custom Error
export class BadRequestException extends Error {
    constructor(message = "BadRequestException") {
        super(message)
        this.code = statusCodes.BAD_REQUEST
    }
}

// 403 => refresh-token
export class ForbiddenException extends Error {
    constructor(message = "ForbiddenException") {
        super(message)
        this.code = statusCodes.FORBIDDEN
    }
}

// 404 => not-found
export class NotFoundException extends Error {
    constructor(message = "NotFoundException") {
        super(message)
        this.code = statusCodes.NOT_FOUND
    }
}

// 401 => logout
export class UnauthorizedException extends Error {
    constructor(message = "UnauthorizedException") {
        super(message)
        this.code = statusCodes.UNAUTHORIZED
    }
}

new BadRequestException("")