import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ValidationError } from 'class-validator';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        let errorResponse = {
            error: exception.name,
            message: exception.message,
            details: null
        };

        if (Array.isArray(exception.getResponse()['message']) &&
            exception.getResponse()['message'][0] instanceof ValidationError) {
            errorResponse.error = 'ValidationError';
            errorResponse.message = 'Validation failed';
            errorResponse.details = this.formatValidationErrors(exception.getResponse()['message']);
        }

        response.status(status).json(errorResponse);
    }

    private formatValidationErrors(errors: ValidationError[]) {
        const result = [];
        for (const error of errors) {
            for (const constraint in error.constraints) {
                result.push({
                    field: error.property,
                    message: error.constraints[constraint],
                    value: error.value
                });
            }
        }
        return result;
    }
}