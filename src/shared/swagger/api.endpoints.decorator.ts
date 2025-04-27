import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiBody,
  ApiResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';
import { StandardExceptionResponseDto } from '../errors/dto/standard.error.response.dto';
import { PaginatedResponseDto } from '../dto/paginated.response.dto';

interface ApiEndpointOptions {
  body?: Type<unknown>; // Body só para POST/PUT
  response: Type<unknown>; // Response para qualquer método
  conflict?: boolean; // Se inclui 409 Conflict
}

export function ApiCreateEndpoint(options: ApiEndpointOptions) {
  return applyDecorators(
    ApiBody({ type: options.body }),
    ApiResponse({
      status: 201,
      description: 'Resource created successfully.',
      type: options.response,
    }),
    ApiBadRequestResponse({
      description: 'Bad Request',
      type: StandardExceptionResponseDto,
    }),
    ...(options.conflict
      ? [
          ApiConflictResponse({
            description: 'Conflict',
            type: StandardExceptionResponseDto,
          }),
        ]
      : []),
  );
}

export function ApiUpdateEndpoint(options: ApiEndpointOptions) {
  return applyDecorators(
    ApiBody({ type: options.body }),
    ApiOkResponse({
      description: 'Resource updated successfully.',
      type: options.response,
    }),
    ApiBadRequestResponse({
      description: 'Bad Request',
      type: StandardExceptionResponseDto,
    }),
    ApiNotFoundResponse({
      description: 'Resource not found.',
      type: StandardExceptionResponseDto,
    }),
  );
}

export function ApiFindAllEndpoint(options: ApiEndpointOptions) {
  return applyDecorators(
    ApiExtraModels(PaginatedResponseDto, options.response),
    ApiOkResponse({
      description: 'Resources listed successfully.',
      schema: {
        allOf: [{ $ref: getSchemaPath(PaginatedResponseDto) }],
        properties: {
          data: {
            type: 'array',
            items: { $ref: getSchemaPath(options.response) },
          },
        },
      },
    }),
  );
}

export function ApiFindOneEndpoint(options: ApiEndpointOptions) {
  return applyDecorators(
    ApiOkResponse({
      description: 'Resource found successfully.',
      type: options.response,
    }),
    ApiBadRequestResponse({
      description: 'Bad Request',
      type: StandardExceptionResponseDto,
    }),
    ApiNotFoundResponse({
      description: 'Resource not found.',
      type: StandardExceptionResponseDto,
    }),
  );
}

export function ApiDeleteEndpoint() {
  return applyDecorators(
    ApiOkResponse({
      description: 'Resource deleted successfully.',
    }),
    ApiBadRequestResponse({
      description: 'Bad Request',
      type: StandardExceptionResponseDto,
    }),
    ApiNotFoundResponse({
      description: 'Resource not found.',
      type: StandardExceptionResponseDto,
    }),
  );
}
