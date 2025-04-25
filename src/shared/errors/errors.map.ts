export const errorsMap = {
  TAX_ID_CONFLICT: {
    key: 'producer.taxId.conflict',
    defaultMessage: 'Producer with this tax ID already exists',
  },
  PRODUCER_NOT_FOUND: {
    key: 'producer.notFound',
    defaultMessage: 'Producer not found',
  },
  PROPERTY_NOT_FOUND: {
    key: 'property.notFound',
    defaultMessage: 'Property not found',
  },
  UNAUTHORIZED_PROPERTY_UPDATE: {
    key: 'property.unauthorized.issue',
    defaultMessage: 'You are not authorized to update this property',
  },
  PROPERTY_AREA_ISSUE: {
    key: 'property.area.issue',
    defaultMessage:
      'The sum of arableArea and vegetationArea must be equal to totalArea',
  },
  INVALID_TAX_ID: {
    key: 'validation.taxId.invalid',
    defaultMessage: 'taxId must be a valid CNPJ or CPF',
  },
  GENERIC_VALIDATION: {
    key: 'validation.generic',
    defaultMessage: 'Invalid input provided',
  },
  GENERIC_ERROR: {
    key: 'error.generic',
    defaultMessage: 'Unexpected error',
  },
  INVALID_CREDENTIAL: {
    key: 'validation.invalid.credentials',
    defaultMessage: 'Invalid credentials',
  },
};
