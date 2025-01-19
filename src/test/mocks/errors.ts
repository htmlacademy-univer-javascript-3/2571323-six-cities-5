import { APIErrorResponse } from '@/api';

export const mockUnexpectedError: APIErrorResponse = {
  errorType: 'UNEXPECTED_ERROR',
  message: 'Unexpected error occurred',
};

export const mockUnknownError: APIErrorResponse = {
  errorType: 'UNKNOWN_ERROR',
  message: 'An unknown error occurred',
};

export const mockOfferNotFoundError: APIErrorResponse = {
  errorType: 'COMMON_ERROR',
  message: 'Offer with id 6af6f711-c28d-4121-82cd-e0b462a27f00 not found.',
};

export const mockAccessDeniedError: APIErrorResponse = {
  errorType: 'COMMON_ERROR',
  message: 'Access denied',
};

export const mockValidationError: APIErrorResponse = {
  errorType: 'VALIDATION_ERROR',
  message: 'Validation error: /six-cities/login',
  details: [
    {
      property: 'password',
      value: 'p',
      messages: ['password must be longer than or equal to 3 characters'],
    },
  ],
};
