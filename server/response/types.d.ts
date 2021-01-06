import { ValidationError, ValidationErrorItem } from '@hapi/joi';

export type ErrorResponseBody = {
    message: string;
    validationErrors?: ValidationErrorItem[];
};

export type SuccessResponseBody = {
    success: true;
};
