import { ApiProperty } from '@nestjs/swagger';

export class StandardExceptionMessageDto {
  @ApiProperty({ example: 'validation.taxId.required' })
  key: string;

  @ApiProperty({ example: 'taxId is required' })
  defaultMessage: string;
}

export class StandardExceptionResponseDto {
  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ type: [StandardExceptionMessageDto] })
  messages: StandardExceptionMessageDto[];
}
