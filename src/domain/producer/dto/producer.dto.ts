import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { cnpj, cpf } from 'cpf-cnpj-validator';

@ValidatorConstraint({ name: 'IsValidTaxId', async: false })
export class IsValidTaxIdConstraint implements ValidatorConstraintInterface {
  validate(taxId: string): boolean {
    return cnpj.isValid(taxId) || cpf.isValid(taxId);
  }

  defaultMessage(): string {
    return 'INVALID_TAX_ID';
  }
}

export class ProducerDto {
  @ApiProperty({
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    description: 'Unique identifier of the producer',
    format: 'uuid',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    example: '123.456.789-00',
    description: 'Producer CPF or CNPJ',
  })
  @IsString()
  @IsNotEmpty()
  @Validate(IsValidTaxIdConstraint)
  taxId: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Producer full name',
    minLength: 5,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @Length(5, 50)
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Producer email address',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '2025-04-26T12:34:56.789Z',
    description: 'Timestamp when the producer was created',
    type: String,
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2025-04-27T15:45:12.123Z',
    description: 'Timestamp when the property was last updated',
    type: String,
    format: 'date-time',
  })
  updatedAt: Date;
}
