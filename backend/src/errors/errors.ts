import logger from "../utils/logger/logger";

export enum HttpStatusCode {
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_SERVER = 500,
}

export class AppError extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
        logger.error(`AppError: ${message}\nStackTrace:\n${this.stack}`);
    }
}


export class GetDeFiMetricsError extends AppError {
    constructor(message = "Failed to retrieve DeFi metrics") {
        super(message, HttpStatusCode.INTERNAL_SERVER);
    }
}

export class TVLOverTimeError extends AppError {
    constructor(message = "Failed to retrieve TVL over time data") {
        super(message, HttpStatusCode.INTERNAL_SERVER);
    }
}

export class DailyVolumeByProtocolError extends AppError {
    constructor(message = "Failed to retrieve daily volume by protocol") {
        super(message, HttpStatusCode.INTERNAL_SERVER);
    }
}

export class ActiveUsersByChainError extends AppError {
    constructor(message = "Failed to retrieve active users by chain") {
        super(message, HttpStatusCode.INTERNAL_SERVER);
    }
}

export const customErrorFormat = (error: any) => {
    const code = error.extensions?.code || 'INTERNAL_SERVER_ERROR';
    const status = error.extensions?.status || error.statusCode || 500;
    const message = error.message || 'INTERNAL_SERVER_ERROR';
    const stack = error.extensions?.stacktrace?.join('\n');

    logger.error(`GraphQL Error: ${message}\nCode: ${code}\nStatus: ${status}\nStack:\n${stack || 'N/A'}`);

    return {
        message,
        code,
        status,
    };
};