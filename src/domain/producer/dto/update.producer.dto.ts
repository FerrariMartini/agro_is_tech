import { IsString, IsOptional } from 'class-validator';

export class UpdateProducerDto {
  readonly id: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  email?: string;
}
