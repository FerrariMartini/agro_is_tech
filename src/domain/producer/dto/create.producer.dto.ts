import {
  IsString,
  IsNotEmpty,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  Validate,
  Length,
  IsEmail,
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

export class CreateProducerDto {
  @IsString()
  @IsNotEmpty()
  @Validate(IsValidTaxIdConstraint)
  taxId: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 50)
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
