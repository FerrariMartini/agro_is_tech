import { IsString, IsOptional } from 'class-validator';

// TODO: ESTOU USANDO UM PUT, ENTÂO TODOS OS DADOS DEVEM SER ENVIADS

export class UpdateProducerDto {
  readonly id: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  email?: string;
}
